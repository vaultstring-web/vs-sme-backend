import type { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import type { Role } from '../generated/prisma'
import { logger } from '../config/logger'
import { prisma } from '../db/prisma'
import { AppError } from '../utils/AppError'
import { signAccessToken, signRefreshToken } from '../services/jwt.service'
import { generatePasswordResetToken, hashPasswordResetToken } from '../services/passwordReset.service'
import fs from 'fs'
import path from 'path'


interface UploadedFiles {
  [fieldname: string]: Express.Multer.File[]
}


function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

function getJwtExpiresAt(token: string): Date {
  const decoded = jwt.decode(token)
  if (!decoded || typeof decoded === 'string' || typeof decoded !== 'object' || typeof (decoded as any).exp !== 'number') {
    throw new AppError('Invalid token', 401)
  }
  return new Date((decoded as any).exp * 1000)
}

function parsePhones(body: any): { primaryPhone: string; secondaryPhone?: string } {
  if (body?.phones && typeof body.phones === 'object') {
    const primary = body.phones.primary ?? body.phones.primaryPhone
    const secondary = body.phones.secondary ?? body.phones.secondaryPhone
    if (!isNonEmptyString(primary)) {
      logger.warn('Registration attempt without phones.primary')
      throw new AppError('phones.primary is required', 400)
    }
    return { primaryPhone: primary.trim(), secondaryPhone: isNonEmptyString(secondary) ? secondary.trim() : undefined }
  }

  const primaryPhone = body?.primaryPhone
  const secondaryPhone = body?.secondaryPhone
  if (!isNonEmptyString(primaryPhone)) {
    logger.warn('Registration attempt without primaryPhone')
    throw new AppError('primaryPhone is required', 400)
  }
  return {
    primaryPhone: primaryPhone.trim(),
    secondaryPhone: isNonEmptyString(secondaryPhone) ? secondaryPhone.trim() : undefined,
  }
}

function parseAddresses(body: any): { physicalAddress: string; postalAddress?: string } {
  if (body?.addresses && typeof body.addresses === 'object') {
    const physical = body.addresses.physical ?? body.addresses.physicalAddress
    const postal = body.addresses.postal ?? body.addresses.postalAddress
    if (!isNonEmptyString(physical)) {
      logger.warn('Registration attempt without addresses.physical')
      throw new AppError('addresses.physical is required', 400)
    }
    return { physicalAddress: physical.trim(), postalAddress: isNonEmptyString(postal) ? postal.trim() : undefined }
  }

  const physicalAddress = body?.physicalAddress
  const postalAddress = body?.postalAddress
  if (!isNonEmptyString(physicalAddress)) {
    logger.warn('Registration attempt without physicalAddress')
    throw new AppError('physicalAddress is required', 400)
  }
  return {
    physicalAddress: physicalAddress.trim(),
    postalAddress: isNonEmptyString(postalAddress) ? postalAddress.trim() : undefined,
  }
}

function parseNationalId(body: any): string {
  const nationalId = body?.nationalId ?? body?.nationalIdOrPassport
  if (!isNonEmptyString(nationalId)) {
    logger.warn('Registration attempt without nationalId')
    throw new AppError('nationalId is required', 400)
  }
  return nationalId.trim()
}

function prismaErrorCode(err: unknown): string | undefined {
  if (!err || typeof err !== 'object') return undefined
  return typeof (err as any).code === 'string' ? (err as any).code : undefined
}

// ========== PUBLIC ENDPOINTS ==========


async function processUserDocuments(
  userId: string, 
  files: UploadedFiles, 
  documentTypes: Record<string, string>
): Promise<void> {
  const documentPromises = []

  for (const [fieldName, fileArray] of Object.entries(files)) {
    for (const file of fileArray) {
      const documentType = documentTypes[fieldName] || fieldName
      
      // Generate file URL (in production, upload to cloud storage)
      const fileUrl = `/uploads/${userId}/${file.filename}`
      
      documentPromises.push(
        (prisma as any).userDocument.create({
          data: {
            userId,
            fileName: file.originalname,
            fileUrl,
            documentType,
          },
        })
      )
    }
  }

  await Promise.all(documentPromises)
}

export async function register(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now()
  
  try {
    const emailRaw = req.body?.email
    const password = req.body?.password
    const fullName = req.body?.fullName

    logger.info(`Registration attempt: ${emailRaw ? emailRaw : 'No email provided'}`)

    if (!isNonEmptyString(emailRaw)) {
      logger.warn('Registration attempt without email')
      throw new AppError('email is required', 400)
    }
    if (!isNonEmptyString(password)) {
      logger.warn('Registration attempt without password')
      throw new AppError('password is required', 400)
    }
    if (password.trim().length < 8) {
      logger.warn('Registration attempt with password less than 8 characters')
      throw new AppError('password must be at least 8 characters', 400)
    }
    if (!isNonEmptyString(fullName)) {
      logger.warn('Registration attempt without fullName')
      throw new AppError('fullName is required', 400)
    }

    const { primaryPhone, secondaryPhone } = parsePhones(req.body)
    const { physicalAddress, postalAddress } = parseAddresses(req.body)
    const nationalIdOrPassport = parseNationalId(req.body)

    const email = normalizeEmail(emailRaw)
    const passwordHash = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        fullName: fullName.trim(),
        nationalIdOrPassport,
        primaryPhone,
        secondaryPhone,
        physicalAddress,
        postalAddress,
        role: 'APPLICANT',
      },
      select: { 
        id: true, 
        email: true, 
        fullName: true, 
        role: true 
      },
    })

    // 🔥 Documents are no longer accepted during registration
    // The entire base64 document upload logic has been removed.

    // Generate authentication tokens for the new user
    const { token: accessToken, jti: accessJti } = signAccessToken({ 
      id: user.id, 
      email: user.email, 
      role: user.role 
    })
    
    const { token: refreshToken, jti: refreshJti } = signRefreshToken(user.id)

    logger.info(`User registered successfully: ${user.id} - ${user.email}`, {
      userId: user.id,
      email: user.email,
      role: user.role,
      accessJti,
      refreshJti,
      duration: Date.now() - startTime
    })

    res.status(201).json({ 
      accessToken,
      refreshToken,
      profile: user,
      message: 'Registration successful.'
    })
  } catch (err) {
    const duration = Date.now() - startTime
    if (prismaErrorCode(err) === 'P2002') {
      logger.warn(`Email already in use during registration`, { 
        email: req.body?.email,
        duration 
      })
      return next(new AppError('Email already in use', 409))
    }
    logger.error(`Registration failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
      error: err,
      email: req.body?.email,
      duration
    })
    next(err)
  }
}


async function processBase64Documents(userId: string, documents: any[]): Promise<void> {
  const documentPromises = documents.map(async (doc: any) => {
    if (!doc.base64 || !doc.fileName || !doc.documentType) {
      throw new AppError('Invalid document format. Each document needs base64, fileName, and documentType.', 400)
    }

    const userDir = path.join('uploads', userId)
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true })
    }

    // Decode base64
    const base64Data = doc.base64.replace(/^data:([A-Za-z-+/]+);base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')
    
    // Determine file extension
    const ext = doc.fileName.split('.').pop() || 'bin'
    const uniqueFileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`
    const filePath = path.join(userDir, uniqueFileName)

    // Save file
    fs.writeFileSync(filePath, buffer)

    // Create database record
    return (prisma as any).userDocument.create({
      data: {
        userId,
        fileName: doc.fileName,
        fileUrl: `/uploads/${userId}/${uniqueFileName}`,
        documentType: doc.documentType,
      },
    })
  })

  await Promise.all(documentPromises)
}

// Add this new endpoint for document upload after registration
export async function uploadUserDocumentsEndpoint(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now()
  
  try {
    if (!req.user) {
      throw new AppError('Unauthorized', 401)
    }

    const files = req.files as UploadedFiles
    
    if (!files || Object.keys(files).length === 0) {
      throw new AppError('No files uploaded', 400)
    }

    // Define document type mapping
    const documentTypes: Record<string, string> = {
      nationalIdFront: 'NATIONAL_ID_FRONT',
      nationalIdBack: 'NATIONAL_ID_BACK',
      profilePicture: 'PROFILE_PICTURE',
      proofOfAddress: 'PROOF_OF_ADDRESS',
      additionalDocuments: 'ADDITIONAL_DOCUMENT',
    };

    await processUserDocuments(req.user.id, files, documentTypes)

    logger.info(`User documents uploaded successfully for user: ${req.user.id}`, {
      userId: req.user.id,
      fileCount: Object.values(files).flat().length,
      duration: Date.now() - startTime
    })

    res.json({
      success: true,
      message: 'Documents uploaded successfully',
      uploadedFiles: Object.keys(files)
    })
  } catch (err) {
    logger.error(`Document upload failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
      error: err,
      userId: req.user?.id,
      duration: Date.now() - startTime
    })
    next(err)
  }
}

// Add this endpoint to get user documents
export async function getUserDocuments(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now()
  
  try {
    // Get userId from params or authenticated user
    let userId: string | undefined
    
    if (req.params.id) {
      // Handle case where id might be string or array
      if (Array.isArray(req.params.id)) {
        userId = req.params.id[0] // Take first element if it's an array
      } else {
        userId = req.params.id as string
      }
    } else {
      userId = req.user?.id
    }
    
    if (!userId) {
      throw new AppError('User ID required', 400)
    }

    // Validate userId is a valid UUID format (optional but good practice)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(userId)) {
      throw new AppError('Invalid user ID format', 400)
    }

    const documents = await (prisma as any).userDocument.findMany({
      where: { 
        userId: userId // TypeScript now knows this is a string
      },
      select: {
        id: true,
        fileName: true,
        fileUrl: true,
        documentType: true,
        uploadedAt: true,
        isVerified: true,
        verifiedAt: true,
      },
      orderBy: { uploadedAt: 'desc' }
    })

    logger.info(`Retrieved documents for user: ${userId}`, {
      userId,
      documentCount: documents.length,
      duration: Date.now() - startTime
    })

    res.json({ documents })
  } catch (err) {
    logger.error(`Get user documents failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
      error: err,
      userId: req.params.id || req.user?.id,
      duration: Date.now() - startTime
    })
    next(err)
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now()
  try {
    const emailRaw = req.body?.email
    const password = req.body?.password

    logger.http(`Login attempt: ${emailRaw || 'No email provided'}`)

    if (!isNonEmptyString(emailRaw)) {
      logger.warn('Login attempt without email')
      throw new AppError('email is required', 400)
    }
    if (!isNonEmptyString(password)) {
      logger.warn('Login attempt without password')
      throw new AppError('password is required', 400)
    }

    const email = normalizeEmail(emailRaw)

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, fullName: true, role: true, passwordHash: true },
    })

    if (!user) {
      logger.warn(`Login failed: User not found for email ${email}`)
      throw new AppError('Invalid credentials', 401)
    }

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) {
      logger.warn(`Login failed: Invalid password for user ${user.id} (${email})`)
      throw new AppError('Invalid credentials', 401)
    }

    const { token: accessToken, jti: accessJti } = signAccessToken({ 
      id: user.id, 
      email: user.email, 
      role: user.role 
    })

    const { token: refreshToken, jti: refreshJti } = signRefreshToken(user.id)


    logger.info(`User logged in successfully: ${user.id} - ${user.email}`, {
      userId: user.id,
      email: user.email,
      role: user.role,
      accessJti,
      refreshJti,
      duration: Date.now() - startTime
    })

    res.json({
      accessToken,
      refreshToken,
      profile: { 
        id: user.id, 
        email: user.email, 
        fullName: user.fullName, 
        role: user.role 
      },
    })
  } catch (err) {
    logger.error(`Login failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
      error: err,
      email: req.body?.email,
      duration: Date.now() - startTime
    })
    next(err)
  }
}

export async function refreshToken(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now()
  try {
    const refreshToken = req.body?.refreshToken
    
    logger.http('Refresh token attempt')

    if (!isNonEmptyString(refreshToken)) {
      logger.warn('Refresh token attempt without token')
      throw new AppError('refreshToken is required', 400)
    }

    const { verifyRefreshToken } = await import('../services/jwt.service')
    const payload = verifyRefreshToken(refreshToken)

    const denylisted = await prisma.denylistedToken.findUnique({
      where: { jti: payload.jti },
    })

    if (denylisted) {
      logger.warn(`Refresh token revoked: ${payload.jti}`)
      throw new AppError('Refresh token revoked', 401)
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, role: true },
    })

    if (!user) {
      logger.warn(`Refresh token failed: User not found ${payload.sub}`)
      throw new AppError('User not found', 401)
    }

    const { token: newAccessToken, jti: newAccessJti } = signAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    })

    logger.info(`Token refreshed successfully for user: ${user.id}`, {
      userId: user.id,
      oldJti: payload.jti,
      newAccessJti,
      duration: Date.now() - startTime
    })

    res.json({
      accessToken: newAccessToken,
      profile: { id: user.id, email: user.email, role: user.role },
    })
  } catch (err) {
    logger.error(`Token refresh failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
      error: err,
      duration: Date.now() - startTime
    })
    next(err)
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now()
  try {
    if (!req.user) {
      logger.warn('Logout attempt without authentication')
      throw new AppError('Unauthorized', 401)
    }

    // Revoke refresh token if provided
    const refreshToken = req.body?.refreshToken
    if (refreshToken && isNonEmptyString(refreshToken)) {
      try {
        const { verifyRefreshToken } = await import('../services/jwt.service')
        const payload = verifyRefreshToken(refreshToken)
        
        // Add refresh token to denylist
        await prisma.denylistedToken.create({
          data: {
            jti: payload.jti,
            userId: req.user.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        })
        
        logger.info(`Refresh token revoked during logout: ${payload.jti}`)
      } catch (err) {
        // If refresh token is invalid, just log and continue
        logger.warn('Invalid refresh token provided during logout, continuing with access token revocation')
      }
    }

    // Revoke access token
    const expiresAt = getJwtExpiresAt(req.user.token)
    await prisma.denylistedToken.upsert({
      where: { jti: req.user.jti },
      create: { jti: req.user.jti, userId: req.user.id, expiresAt },
      update: { expiresAt },
    })

    logger.info(`User logged out: ${req.user.id}`, {
      userId: req.user.id,
      email: req.user.email,
      jti: req.user.jti,
      duration: Date.now() - startTime
    })

    res.json({ success: true })
  } catch (err) {
    logger.error(`Logout failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
      error: err,
      userId: req.user?.id,
      duration: Date.now() - startTime
    })
    next(err)
  }
}

export async function requestPasswordReset(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now()
  try {
    const emailRaw = req.body?.email
    
    logger.http(`Password reset request for: ${emailRaw || 'No email provided'}`)

    if (!isNonEmptyString(emailRaw)) {
      logger.warn('Password reset request without email')
      throw new AppError('email is required', 400)
    }

    const email = normalizeEmail(emailRaw)
    const user = await prisma.user.findUnique({ where: { email }, select: { id: true } })

    let resetToken: string | undefined

    if (user) {
      const { token, tokenHash, expiresAt } = generatePasswordResetToken()
      await prisma.passwordResetToken.create({
        data: { userId: user.id, tokenHash, expiresAt },
      })
      
      if (process.env.NODE_ENV !== 'production') resetToken = token
      
      logger.info(`Password reset token generated for user: ${user.id}`, {
        userId: user.id,
        email,
        expiresAt,
        duration: Date.now() - startTime
      })
    } else {
      logger.warn(`Password reset request for non-existent email: ${email}`)
    }

    res.json({
      success: true,
      message: 'If an account exists for that email, a password reset token has been issued.',
      ...(resetToken ? { token: resetToken } : {}),
    })
  } catch (err) {
    logger.error(`Password reset request failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
      error: err,
      email: req.body?.email,
      duration: Date.now() - startTime
    })
    next(err)
  }
}

export async function confirmPasswordReset(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now()
  try {
    const token = req.body?.token
    const newPassword = req.body?.newPassword

    logger.http('Password reset confirmation attempt')

    if (!isNonEmptyString(token)) {
      logger.warn('Password reset confirmation without token')
      throw new AppError('token is required', 400)
    }
    if (!isNonEmptyString(newPassword)) {
      logger.warn('Password reset confirmation without newPassword')
      throw new AppError('newPassword is required', 400)
    }
    if (newPassword.trim().length < 8) {
      logger.warn('Password reset confirmation with password less than 8 characters')
      throw new AppError('newPassword must be at least 8 characters', 400)
    }

    const tokenHash = hashPasswordResetToken(token.trim())

    const record = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
      select: { id: true, userId: true, expiresAt: true, usedAt: true },
    })

    if (!record || record.usedAt || record.expiresAt.getTime() <= Date.now()) {
      logger.warn(`Invalid or expired password reset token attempted`)
      throw new AppError('Invalid or expired token', 400)
    }

    const passwordHash = await bcrypt.hash(newPassword, 12)

    await prisma.$transaction([
      prisma.user.update({ where: { id: record.userId }, data: { passwordHash } }),
      prisma.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
    ])

    logger.info(`Password reset completed for user: ${record.userId}`, {
      userId: record.userId,
      resetTokenId: record.id,
      duration: Date.now() - startTime
    })

    res.json({ success: true })
  } catch (err) {
    logger.error(`Password reset confirmation failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
      error: err,
      duration: Date.now() - startTime
    })
    next(err)
  }
}

// ========== ADMIN-ONLY ENDPOINTS ==========

export async function adminRegister(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now()
  try {
    const emailRaw = req.body?.email
    const password = req.body?.password
    const fullName = req.body?.fullName
    const role = req.body?.role as Role

    logger.info(`Admin registration attempt by ${req.user?.id} for email: ${emailRaw}`)

    if (!isNonEmptyString(emailRaw)) {
      logger.warn('Admin registration attempt without email')
      throw new AppError('email is required', 400)
    }
    if (!isNonEmptyString(password)) {
      logger.warn('Admin registration attempt without password')
      throw new AppError('password is required', 400)
    }
    if (password.trim().length < 8) {
      logger.warn('Admin registration attempt with password less than 8 characters')
      throw new AppError('password must be at least 8 characters', 400)
    }
    if (!isNonEmptyString(fullName)) {
      logger.warn('Admin registration attempt without fullName')
      throw new AppError('fullName is required', 400)
    }
    
    if (!role || !['ADMIN_TIER1', 'ADMIN_TIER2', 'APPLICANT'].includes(role)) {
      logger.warn(`Admin registration attempt with invalid role: ${role}`)
      throw new AppError('Invalid role. Must be ADMIN_TIER1, ADMIN_TIER2, or APPLICANT', 400)
    }

    const { primaryPhone, secondaryPhone } = parsePhones(req.body)
    const { physicalAddress, postalAddress } = parseAddresses(req.body)
    const nationalIdOrPassport = parseNationalId(req.body)

    const email = normalizeEmail(emailRaw)
    const passwordHash = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        fullName: fullName.trim(),
        nationalIdOrPassport,
        primaryPhone,
        secondaryPhone,
        physicalAddress,
        postalAddress,
        role,
      },
      select: { id: true, email: true, fullName: true, role: true, createdAt: true },
    })

    logger.info(`Admin created user successfully: ${user.id} - ${user.email}`, {
      createdBy: req.user?.id,
      newUserId: user.id,
      newUserEmail: user.email,
      newUserRole: user.role,
      duration: Date.now() - startTime
    })

    res.status(201).json({ 
      message: 'User created successfully',
      user 
    })
  } catch (err) {
    const duration = Date.now() - startTime
    if (prismaErrorCode(err) === 'P2002') {
      logger.warn(`Admin registration failed: Email already in use`, { 
        email: req.body?.email,
        createdBy: req.user?.id,
        duration 
      })
      return next(new AppError('Email already in use', 409))
    }
    logger.error(`Admin registration failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
      error: err,
      email: req.body?.email,
      createdBy: req.user?.id,
      duration
    })
    next(err)
  }
}

export async function listUsers(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now()
  try {
    const { page = '1', limit = '10', role, search } = req.query
    
    logger.http(`List users request by ${req.user?.id}`, {
      page, limit, role, search
    })

    const pageNum = parseInt(page as string) || 1
    const limitNum = parseInt(limit as string) || 10
    const skip = (pageNum - 1) * limitNum

    const where: any = {}
    
    if (role && ['APPLICANT', 'ADMIN_TIER1', 'ADMIN_TIER2'].includes(role as string)) {
      where.role = role
    }
    
    if (search && typeof search === 'string') {
      where.OR = [
        { email: { contains: search } },
        { fullName: { contains: search } },
        { nationalIdOrPassport: { contains: search } },
      ]
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          fullName: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
      }),
      prisma.user.count({ where }),
    ])

    logger.info(`Users listed successfully`, {
      requestedBy: req.user?.id,
      page: pageNum,
      limit: limitNum,
      totalUsers: total,
      filteredCount: users.length,
      duration: Date.now() - startTime
    })

    res.json({
      users,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    })
  } catch (err) {
    logger.error(`List users failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
      error: err,
      requestedBy: req.user?.id,
      duration: Date.now() - startTime
    })
    next(err)
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now()
  try {
    const { id } = req.params

    logger.http(`Get user request by ${req.user?.id} for user ${id}`)

    if (typeof id !== 'string') {
      logger.warn(`Invalid ID parameter: ${id}`)
      throw new AppError('Invalid ID parameter', 400)
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        fullName: true,
        nationalIdOrPassport: true,
        primaryPhone: true,
        secondaryPhone: true,
        physicalAddress: true,
        postalAddress: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        applications: {
          select: {
            id: true,
            type: true,
            status: true,
            createdAt: true,
          },
        },
      },
    })

    if (!user) {
      logger.warn(`User not found: ${id} requested by ${req.user?.id}`)
      throw new AppError('User not found', 404)
    }

    logger.info(`User details retrieved: ${id}`, {
      requestedBy: req.user?.id,
      targetUser: id,
      duration: Date.now() - startTime
    })

    res.json({ user })
  } catch (err) {
    logger.error(`Get user failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
      error: err,
      requestedBy: req.user?.id,
      targetUser: req.params.id,
      duration: Date.now() - startTime
    })
    next(err)
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now()
  try {
    const { id } = req.params

    logger.info(`Update user request by ${req.user?.id} for user ${id}`, {
      updates: req.body
    })

    if (typeof id !== 'string') {
      logger.warn(`Invalid ID parameter: ${id}`)
      throw new AppError('Invalid ID parameter', 400)
    }

    const updates: any = {}

    if (req.body.fullName && isNonEmptyString(req.body.fullName)) {
      updates.fullName = req.body.fullName.trim()
    }
    
    if (req.body.primaryPhone && isNonEmptyString(req.body.primaryPhone)) {
      updates.primaryPhone = req.body.primaryPhone.trim()
    }
    
    if (req.body.secondaryPhone !== undefined) {
      updates.secondaryPhone = isNonEmptyString(req.body.secondaryPhone) 
        ? req.body.secondaryPhone.trim() 
        : null
    }
    
    if (req.body.physicalAddress && isNonEmptyString(req.body.physicalAddress)) {
      updates.physicalAddress = req.body.physicalAddress.trim()
    }
    
    if (req.body.postalAddress !== undefined) {
      updates.postalAddress = isNonEmptyString(req.body.postalAddress) 
        ? req.body.postalAddress.trim() 
        : null
    }

    if (req.body.role && req.user?.role === 'ADMIN_TIER2') {
      if (['ADMIN_TIER1', 'APPLICANT'].includes(req.body.role)) {
        updates.role = req.body.role
        logger.info(`Role update attempted by ADMIN_TIER2 ${req.user.id} for user ${id}: ${req.body.role}`)
      }
    }

    const user = await prisma.user.update({
      where: { id },
      data: updates,
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        updatedAt: true,
      },
    })

    logger.info(`User updated successfully: ${id}`, {
      updatedBy: req.user?.id,
      targetUser: id,
      updates,
      duration: Date.now() - startTime
    })

    res.json({ 
      message: 'User updated successfully',
      user 
    })
  } catch (err) {
    if (prismaErrorCode(err) === 'P2025') {
      logger.warn(`Update user failed: User not found ${req.params.id}`, {
        updatedBy: req.user?.id,
        duration: Date.now() - startTime
      })
      return next(new AppError('User not found', 404))
    }
    logger.error(`Update user failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
      error: err,
      updatedBy: req.user?.id,
      targetUser: req.params.id,
      duration: Date.now() - startTime
    })
    next(err)
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now()
  try {
    const { id } = req.params

    logger.warn(`Delete user request by ${req.user?.id} for user ${id}`)

    if (typeof id !== 'string') {
      logger.warn(`Invalid ID parameter: ${id}`)
      throw new AppError('Invalid ID parameter', 400)
    }

    if (req.user?.id === id) {
      logger.warn(`Self-deletion attempt prevented: ${req.user.id}`)
      throw new AppError('Cannot delete your own account', 400)
    }

    await prisma.user.delete({
      where: { id },
    })

    logger.warn(`User deleted: ${id}`, {
      deletedBy: req.user?.id,
      targetUser: id,
      duration: Date.now() - startTime
    })

    res.json({ 
      success: true,
      message: 'User deleted successfully' 
    })
  } catch (err) {
    if (prismaErrorCode(err) === 'P2025') {
      logger.warn(`Delete user failed: User not found ${req.params.id}`, {
        deletedBy: req.user?.id,
        duration: Date.now() - startTime
      })
      return next(new AppError('User not found', 404))
    }
    logger.error(`Delete user failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
      error: err,
      deletedBy: req.user?.id,
      targetUser: req.params.id,
      duration: Date.now() - startTime
    })
    next(err)
  }
}


// Add this function to your auth.controller.ts file

export async function getCurrentUser(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now()
  
  try {
    if (!req.user) {
      throw new AppError('Unauthorized', 401)
    }

    // Fetch full user profile from database
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        fullName: true,
        nationalIdOrPassport: true,
        primaryPhone: true,
        secondaryPhone: true,
        physicalAddress: true,
        postalAddress: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      logger.warn(`Get current user failed: User not found ${req.user.id}`)
      throw new AppError('User not found', 404)
    }

    logger.info(`Current user retrieved: ${user.id}`, {
      userId: user.id,
      duration: Date.now() - startTime
    })

    res.json({ user })
  } catch (err) {
    logger.error(`Get current user failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
      error: err,
      userId: req.user?.id,
      duration: Date.now() - startTime
    })
    next(err)
  }
}

// Add this function for updating current user profile
export async function updateCurrentUser(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now()
  
  try {
    if (!req.user) {
      throw new AppError('Unauthorized', 401)
    }

    const updates: any = {}

    // Only allow updating these fields
    if (req.body.fullName !== undefined) {
      if (!isNonEmptyString(req.body.fullName)) {
        throw new AppError('fullName is required', 400)
      }
      updates.fullName = req.body.fullName.trim()
    }
    
    if (req.body.primaryPhone !== undefined) {
      if (!isNonEmptyString(req.body.primaryPhone)) {
        throw new AppError('primaryPhone is required', 400)
      }
      updates.primaryPhone = req.body.primaryPhone.trim()
    }
    
    if (req.body.secondaryPhone !== undefined) {
      updates.secondaryPhone = isNonEmptyString(req.body.secondaryPhone) 
        ? req.body.secondaryPhone.trim() 
        : null
    }
    
    if (req.body.physicalAddress !== undefined) {
      if (!isNonEmptyString(req.body.physicalAddress)) {
        throw new AppError('physicalAddress is required', 400)
      }
      updates.physicalAddress = req.body.physicalAddress.trim()
    }
    
    if (req.body.postalAddress !== undefined) {
      updates.postalAddress = isNonEmptyString(req.body.postalAddress) 
        ? req.body.postalAddress.trim() 
        : null
    }

    // Update user in database
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: updates,
      select: {
        id: true,
        email: true,
        fullName: true,
        nationalIdOrPassport: true,
        primaryPhone: true,
        secondaryPhone: true,
        physicalAddress: true,
        postalAddress: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    logger.info(`Current user updated: ${user.id}`, {
      userId: user.id,
      updates,
      duration: Date.now() - startTime
    })

    res.json({ 
      message: 'Profile updated successfully',
      user 
    })
  } catch (err) {
    if (prismaErrorCode(err) === 'P2025') {
      logger.warn(`Update current user failed: User not found ${req.user?.id}`, {
        duration: Date.now() - startTime
      })
      return next(new AppError('User not found', 404))
    }
    logger.error(`Update current user failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
      error: err,
      userId: req.user?.id,
      duration: Date.now() - startTime
    })
    next(err)
  }
}

export async function changePassword(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now()
  
  try {
    if (!req.user) {
      throw new AppError('Unauthorized', 401)
    }

    const currentPassword = req.body?.currentPassword
    const newPassword = req.body?.newPassword

    logger.http(`Change password request for user: ${req.user.id}`)

    // Validation
    if (!isNonEmptyString(currentPassword)) {
      logger.warn('Change password attempt without currentPassword')
      throw new AppError('currentPassword is required', 400)
    }
    
    if (!isNonEmptyString(newPassword)) {
      logger.warn('Change password attempt without newPassword')
      throw new AppError('newPassword is required', 400)
    }
    
    if (newPassword.trim().length < 8) {
      logger.warn('Change password attempt with password less than 8 characters')
      throw new AppError('newPassword must be at least 8 characters', 400)
    }

    // Check if new password is different from current
    if (currentPassword === newPassword) {
      logger.warn('Change password attempt with same password')
      throw new AppError('New password must be different from current password', 400)
    }

    // Fetch user with password hash
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, passwordHash: true },
    })

    if (!user) {
      logger.warn(`Change password failed: User not found ${req.user.id}`)
      throw new AppError('User not found', 404)
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash)
    if (!isCurrentPasswordValid) {
      logger.warn(`Change password failed: Invalid current password for user ${user.id}`)
      throw new AppError('Current password is incorrect', 401)
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 12)

    // Update password
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: newPasswordHash },
    })

    logger.info(`Password changed successfully for user: ${user.id}`, {
      userId: user.id,
      email: user.email,
      duration: Date.now() - startTime
    })

    res.json({ 
      success: true,
      message: 'Password changed successfully' 
    })
  } catch (err) {
    logger.error(`Change password failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
      error: err,
      userId: req.user?.id,
      duration: Date.now() - startTime
    })
    next(err)
  }
}