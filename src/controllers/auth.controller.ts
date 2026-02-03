import type { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { prisma } from '../db/prisma'
import { AppError } from '../utils/AppError'
import { signAccessToken } from '../services/jwt.service'
import { generatePasswordResetToken, hashPasswordResetToken } from '../services/passwordReset.service'

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
    if (!isNonEmptyString(primary)) throw new AppError('phones.primary is required', 400)
    return { primaryPhone: primary.trim(), secondaryPhone: isNonEmptyString(secondary) ? secondary.trim() : undefined }
  }

  const primaryPhone = body?.primaryPhone
  const secondaryPhone = body?.secondaryPhone
  if (!isNonEmptyString(primaryPhone)) throw new AppError('primaryPhone is required', 400)
  return {
    primaryPhone: primaryPhone.trim(),
    secondaryPhone: isNonEmptyString(secondaryPhone) ? secondaryPhone.trim() : undefined,
  }
}

function parseAddresses(body: any): { physicalAddress: string; postalAddress?: string } {
  if (body?.addresses && typeof body.addresses === 'object') {
    const physical = body.addresses.physical ?? body.addresses.physicalAddress
    const postal = body.addresses.postal ?? body.addresses.postalAddress
    if (!isNonEmptyString(physical)) throw new AppError('addresses.physical is required', 400)
    return { physicalAddress: physical.trim(), postalAddress: isNonEmptyString(postal) ? postal.trim() : undefined }
  }

  const physicalAddress = body?.physicalAddress
  const postalAddress = body?.postalAddress
  if (!isNonEmptyString(physicalAddress)) throw new AppError('physicalAddress is required', 400)
  return {
    physicalAddress: physicalAddress.trim(),
    postalAddress: isNonEmptyString(postalAddress) ? postalAddress.trim() : undefined,
  }
}

function parseNationalId(body: any): string {
  const nationalId = body?.nationalId ?? body?.nationalIdOrPassport
  if (!isNonEmptyString(nationalId)) throw new AppError('nationalId is required', 400)
  return nationalId.trim()
}

function prismaErrorCode(err: unknown): string | undefined {
  if (!err || typeof err !== 'object') return undefined
  return typeof (err as any).code === 'string' ? (err as any).code : undefined
}

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const emailRaw = req.body?.email
    const password = req.body?.password
    const fullName = req.body?.fullName

    if (!isNonEmptyString(emailRaw)) throw new AppError('email is required', 400)
    if (!isNonEmptyString(password)) throw new AppError('password is required', 400)
    if (password.trim().length < 8) throw new AppError('password must be at least 8 characters', 400)
    if (!isNonEmptyString(fullName)) throw new AppError('fullName is required', 400)

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
      },
      select: { id: true, email: true, fullName: true, role: true },
    })

    res.status(201).json({ profile: user })
  } catch (err) {
    if (prismaErrorCode(err) === 'P2002') return next(new AppError('Email already in use', 409))
    next(err)
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const emailRaw = req.body?.email
    const password = req.body?.password

    if (!isNonEmptyString(emailRaw)) throw new AppError('email is required', 400)
    if (!isNonEmptyString(password)) throw new AppError('password is required', 400)

    const email = normalizeEmail(emailRaw)

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, fullName: true, role: true, passwordHash: true },
    })

    if (!user) throw new AppError('Invalid credentials', 401)

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) throw new AppError('Invalid credentials', 401)

    const { token } = signAccessToken({ id: user.id, email: user.email, role: user.role })

    res.json({
      token,
      profile: { id: user.id, email: user.email, fullName: user.fullName, role: user.role },
    })
  } catch (err) {
    next(err)
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) throw new AppError('Unauthorized', 401)

    const expiresAt = getJwtExpiresAt(req.user.token)

    await prisma.denylistedToken.upsert({
      where: { jti: req.user.jti },
      create: { jti: req.user.jti, userId: req.user.id, expiresAt },
      update: { expiresAt },
    })

    res.json({ success: true })
  } catch (err) {
    next(err)
  }
}

export async function requestPasswordReset(req: Request, res: Response, next: NextFunction) {
  try {
    const emailRaw = req.body?.email
    if (!isNonEmptyString(emailRaw)) throw new AppError('email is required', 400)

    const email = normalizeEmail(emailRaw)
    const user = await prisma.user.findUnique({ where: { email }, select: { id: true } })

    let resetToken: string | undefined

    if (user) {
      const { token, tokenHash, expiresAt } = generatePasswordResetToken()
      await prisma.passwordResetToken.create({
        data: { userId: user.id, tokenHash, expiresAt },
      })
      if (process.env.NODE_ENV !== 'production') resetToken = token
    }

    res.json({
      success: true,
      message: 'If an account exists for that email, a password reset token has been issued.',
      ...(resetToken ? { token: resetToken } : {}),
    })
  } catch (err) {
    next(err)
  }
}

export async function confirmPasswordReset(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.body?.token
    const newPassword = req.body?.newPassword

    if (!isNonEmptyString(token)) throw new AppError('token is required', 400)
    if (!isNonEmptyString(newPassword)) throw new AppError('newPassword is required', 400)
    if (newPassword.trim().length < 8) throw new AppError('newPassword must be at least 8 characters', 400)

    const tokenHash = hashPasswordResetToken(token.trim())

    const record = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
      select: { id: true, userId: true, expiresAt: true, usedAt: true },
    })

    if (!record || record.usedAt || record.expiresAt.getTime() <= Date.now()) {
      throw new AppError('Invalid or expired token', 400)
    }

    const passwordHash = await bcrypt.hash(newPassword, 12)

    await prisma.$transaction([
      prisma.user.update({ where: { id: record.userId }, data: { passwordHash } }),
      prisma.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
    ])

    res.json({ success: true })
  } catch (err) {
    next(err)
  }
}

