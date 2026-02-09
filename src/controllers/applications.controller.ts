import type { NextFunction, Request, Response } from 'express'
import { prisma } from '../db/prisma'
import { AppError } from '../utils/AppError'
import { logger } from '../config/logger'

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0
}

function isNumber(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v)
}

function isBoolean(v: unknown): v is boolean {
  return typeof v === 'boolean'
}

export function validateSmePayload(req: Request, _res: Response, next: NextFunction) {
  const b = req.body ?? {}
  if (!isNonEmptyString(b.businessName)) return next(new AppError('businessName is required', 400))
  if (b.registrationNo != null && !isNonEmptyString(b.registrationNo)) return next(new AppError('registrationNo must be string', 400))
  if (!isNonEmptyString(b.businessType)) return next(new AppError('businessType is required', 400))
  if (!isNumber(b.yearsInOperation)) return next(new AppError('yearsInOperation must be number', 400))
  if (!isNonEmptyString(b.loanProduct)) return next(new AppError('loanProduct is required', 400))
  if (!isNumber(b.loanAmount)) return next(new AppError('loanAmount must be number', 400))
  if (!isNumber(b.paybackPeriodMonths)) return next(new AppError('paybackPeriodMonths must be number', 400))
  if (!isNonEmptyString(b.purposeOfLoan)) return next(new AppError('purposeOfLoan is required', 400))
  if (!isNonEmptyString(b.repaymentMethod)) return next(new AppError('repaymentMethod is required', 400))
  if (b.estimatedMonthlyTurnover != null && !isNumber(b.estimatedMonthlyTurnover)) return next(new AppError('estimatedMonthlyTurnover must be number', 400))
  if (b.estimatedMonthlyProfit != null && !isNumber(b.estimatedMonthlyProfit)) return next(new AppError('estimatedMonthlyProfit must be number', 400))
  if (b.groupName != null && !isNonEmptyString(b.groupName)) return next(new AppError('groupName must be string', 400))
  if (b.groupMemberCount != null && !isNumber(b.groupMemberCount)) return next(new AppError('groupMemberCount must be number', 400))
  if (!isBoolean(b.hasOutstandingLoans)) return next(new AppError('hasOutstandingLoans must be boolean', 400))
  if (b.outstandingLoanDetails != null && !isNonEmptyString(b.outstandingLoanDetails)) return next(new AppError('outstandingLoanDetails must be string', 400))
  if (!isBoolean(b.hasDefaulted)) return next(new AppError('hasDefaulted must be boolean', 400))
  if (b.defaultExplanation != null && !isNonEmptyString(b.defaultExplanation)) return next(new AppError('defaultExplanation must be string', 400))
  next()
}

export function validatePayrollPayload(req: Request, _res: Response, next: NextFunction) {
  const b = req.body ?? {}
  if (!isNonEmptyString(b.gender)) return next(new AppError('gender is required', 400))
  if (!isNonEmptyString(b.maritalStatus)) return next(new AppError('maritalStatus is required', 400))
  if (!isNonEmptyString(b.nextOfKinName)) return next(new AppError('nextOfKinName is required', 400))
  if (!isNonEmptyString(b.nextOfKinRelationship)) return next(new AppError('nextOfKinRelationship is required', 400))
  if (!isNonEmptyString(b.nextOfKinPhone)) return next(new AppError('nextOfKinPhone is required', 400))
  if (!isNumber(b.loanAmount)) return next(new AppError('loanAmount must be number', 400))
  if (!isNumber(b.paybackPeriodMonths)) return next(new AppError('paybackPeriodMonths must be number', 400))
  if (!isNonEmptyString(b.employerName)) return next(new AppError('employerName is required', 400))
  if (!isNonEmptyString(b.employerAddress)) return next(new AppError('employerAddress is required', 400))
  if (!isNonEmptyString(b.jobTitle)) return next(new AppError('jobTitle is required', 400))
  if (!isNonEmptyString(b.employeeNumber)) return next(new AppError('employeeNumber is required', 400))
  if (!isNonEmptyString(b.dateOfBirth)) return next(new AppError('dateOfBirth is required (ISO string)', 400))
  if (!isNonEmptyString(b.dateOfEmployment)) return next(new AppError('dateOfEmployment is required (ISO string)', 400))
  if (!isNumber(b.grossMonthlySalary)) return next(new AppError('grossMonthlySalary must be number', 400))
  if (!isNumber(b.netMonthlySalary)) return next(new AppError('netMonthlySalary must be number', 400))
  if (!isBoolean(b.payrollDeductionConfirmed)) return next(new AppError('payrollDeductionConfirmed must be boolean', 400))
  if (!isBoolean(b.hasOutstandingLoans)) return next(new AppError('hasOutstandingLoans must be boolean', 400))
  if (b.outstandingLoanDetails != null && !isNonEmptyString(b.outstandingLoanDetails)) return next(new AppError('outstandingLoanDetails must be string', 400))
  if (!isBoolean(b.hasDefaulted)) return next(new AppError('hasDefaulted must be boolean', 400))
  if (b.defaultExplanation != null && !isNonEmptyString(b.defaultExplanation)) return next(new AppError('defaultExplanation must be string', 400))
  next()
}

export function validateDocumentPayload(req: Request, _res: Response, next: NextFunction) {
  const b = req.body ?? {}
  if (!isNonEmptyString(b.fileName)) return next(new AppError('fileName is required', 400))
  if (!isNonEmptyString(b.fileUrl)) return next(new AppError('fileUrl is required', 400))
  if (!isNonEmptyString(b.documentType)) return next(new AppError('documentType is required', 400))
  next()
}

export function validateDocumentTypeBody(req: Request, _res: Response, next: NextFunction) {
  const b = req.body ?? {}
  if (!isNonEmptyString(b.documentType)) return next(new AppError('documentType is required', 400))
  next()
}

export function validateDraftPayload(req: Request, _res: Response, next: NextFunction) {
  next()
}

function ensureOwner(app: { userId: string }, userId: string) {
  if (app.userId !== userId) throw new AppError('Forbidden', 403)
}

function parsePagination(query: any): { skip: number; take: number } {
  const page = Math.max(1, parseInt(query.page as string, 10) || 1)
  const limit = Math.min(100, Math.max(1, parseInt(query.limit as string, 10) || 10))
  return {
    skip: (page - 1) * limit,
    take: limit,
  }
}

function parseFilters(query: any) {
  const filters: any = {}

  // Status filter
  if (query.status && ['DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'DISBURSED', 'REPAYED', 'DEFAULTED'].includes(query.status)) {
    filters.status = query.status
  }

  // Type filter
  if (query.type && ['SME', 'PAYROLL'].includes(query.type)) {
    filters.type = query.type
  }

  // Date range: submittedAt or createdAt
  const startDate = query.startDate ? new Date(query.startDate) : null
  const endDate = query.endDate ? new Date(query.endDate) : null

  if (startDate || endDate) {
    filters.createdAt = {}
    if (startDate) filters.createdAt.gte = startDate
    if (endDate) filters.createdAt.lte = endDate
  }

  return filters
}


export async function createSmeApplication(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) throw new AppError('Unauthorized', 401)
    const userId = req.user.id
    const app = await prisma.$transaction(async tx => {
      const created = await tx.application.create({
        data: { userId, type: 'SME', status: 'DRAFT' },
        select: { id: true, userId: true, type: true, status: true, createdAt: true },
      })
      await tx.smeApplicationData.create({
        data: {
          applicationId: created.id,
          businessName: req.body.businessName,
          registrationNo: req.body.registrationNo ?? null,
          businessType: req.body.businessType,
          yearsInOperation: req.body.yearsInOperation,
          loanProduct: req.body.loanProduct,
          loanAmount: req.body.loanAmount,
          paybackPeriodMonths: req.body.paybackPeriodMonths,
          purposeOfLoan: req.body.purposeOfLoan,
          repaymentMethod: req.body.repaymentMethod,
          estimatedMonthlyTurnover: req.body.estimatedMonthlyTurnover ?? null,
          estimatedMonthlyProfit: req.body.estimatedMonthlyProfit ?? null,
          groupName: req.body.groupName ?? null,
          groupMemberCount: req.body.groupMemberCount ?? null,
          hasOutstandingLoans: req.body.hasOutstandingLoans,
          outstandingLoanDetails: req.body.outstandingLoanDetails ?? null,
          hasDefaulted: req.body.hasDefaulted,
          defaultExplanation: req.body.defaultExplanation ?? null,
        },
      })
      return created
    })
    logger.info(`application created ${app.id} SME by ${userId}`)
    res.status(201).json({ success: true, data: app })
  } catch (err) {
    next(err)
  }
}

export async function createPayrollApplication(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) throw new AppError('Unauthorized', 401)
    const userId = req.user.id
    const app = await prisma.$transaction(async tx => {
      const created = await tx.application.create({
        data: { userId, type: 'PAYROLL', status: 'DRAFT' },
        select: { id: true, userId: true, type: true, status: true, createdAt: true },
      })
      await tx.payrollApplicationData.create({
        data: {
          applicationId: created.id,
          dateOfBirth: new Date(req.body.dateOfBirth),
          gender: req.body.gender,
          maritalStatus: req.body.maritalStatus,
          nextOfKinName: req.body.nextOfKinName,
          nextOfKinRelationship: req.body.nextOfKinRelationship,
          nextOfKinPhone: req.body.nextOfKinPhone,
          loanAmount: req.body.loanAmount,
          paybackPeriodMonths: req.body.paybackPeriodMonths,
          employerName: req.body.employerName,
          employerAddress: req.body.employerAddress,
          jobTitle: req.body.jobTitle,
          employeeNumber: req.body.employeeNumber,
          dateOfEmployment: new Date(req.body.dateOfEmployment),
          grossMonthlySalary: req.body.grossMonthlySalary,
          netMonthlySalary: req.body.netMonthlySalary,
          payrollDeductionConfirmed: req.body.payrollDeductionConfirmed,
          hasOutstandingLoans: req.body.hasOutstandingLoans,
          outstandingLoanDetails: req.body.outstandingLoanDetails ?? null,
          hasDefaulted: req.body.hasDefaulted,
          defaultExplanation: req.body.defaultExplanation ?? null,
        },
      })
      return created
    })
    logger.info(`application created ${app.id} PAYROLL by ${userId}`)
    res.status(201).json({ success: true, data: app })
  } catch (err) {
    next(err)
  }
}

export async function saveDraftApplication(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) throw new AppError('Unauthorized', 401)
    const userId = req.user.id
    const id = String(req.params.id)
    if (!isNonEmptyString(id)) throw new AppError('Invalid id', 400)
    const app = await prisma.application.findUnique({ where: { id }, select: { id: true, userId: true, type: true, status: true } })
    if (!app) throw new AppError('Not found', 404)
    ensureOwner(app, userId)
    if (app.status !== 'DRAFT') throw new AppError('Only DRAFT applications can be updated', 400)
    if (app.type === 'SME') {
      await prisma.smeApplicationData.update({
        where: { applicationId: app.id },
        data: {
          businessName: req.body.businessName ?? undefined,
          registrationNo: req.body.registrationNo ?? undefined,
          businessType: req.body.businessType ?? undefined,
          yearsInOperation: req.body.yearsInOperation ?? undefined,
          loanProduct: req.body.loanProduct ?? undefined,
          loanAmount: req.body.loanAmount ?? undefined,
          paybackPeriodMonths: req.body.paybackPeriodMonths ?? undefined,
          purposeOfLoan: req.body.purposeOfLoan ?? undefined,
          repaymentMethod: req.body.repaymentMethod ?? undefined,
          estimatedMonthlyTurnover: req.body.estimatedMonthlyTurnover ?? undefined,
          estimatedMonthlyProfit: req.body.estimatedMonthlyProfit ?? undefined,
          groupName: req.body.groupName ?? undefined,
          groupMemberCount: req.body.groupMemberCount ?? undefined,
          hasOutstandingLoans: req.body.hasOutstandingLoans ?? undefined,
          outstandingLoanDetails: req.body.outstandingLoanDetails ?? undefined,
          hasDefaulted: req.body.hasDefaulted ?? undefined,
          defaultExplanation: req.body.defaultExplanation ?? undefined,
        },
      })
    } else {
      await prisma.payrollApplicationData.update({
        where: { applicationId: app.id },
        data: {
          dateOfBirth: req.body.dateOfBirth ? new Date(req.body.dateOfBirth) : undefined,
          gender: req.body.gender ?? undefined,
          maritalStatus: req.body.maritalStatus ?? undefined,
          nextOfKinName: req.body.nextOfKinName ?? undefined,
          nextOfKinRelationship: req.body.nextOfKinRelationship ?? undefined,
          nextOfKinPhone: req.body.nextOfKinPhone ?? undefined,
          loanAmount: req.body.loanAmount ?? undefined,
          paybackPeriodMonths: req.body.paybackPeriodMonths ?? undefined,
          employerName: req.body.employerName ?? undefined,
          employerAddress: req.body.employerAddress ?? undefined,
          jobTitle: req.body.jobTitle ?? undefined,
          employeeNumber: req.body.employeeNumber ?? undefined,
          dateOfEmployment: req.body.dateOfEmployment ? new Date(req.body.dateOfEmployment) : undefined,
          grossMonthlySalary: req.body.grossMonthlySalary ?? undefined,
          netMonthlySalary: req.body.netMonthlySalary ?? undefined,
          payrollDeductionConfirmed: req.body.payrollDeductionConfirmed ?? undefined,
          hasOutstandingLoans: req.body.hasOutstandingLoans ?? undefined,
          outstandingLoanDetails: req.body.outstandingLoanDetails ?? undefined,
          hasDefaulted: req.body.hasDefaulted ?? undefined,
          defaultExplanation: req.body.defaultExplanation ?? undefined,
        },
      })
    }
    const keys = Object.keys(req.body || {})
    logger.info(`application draft saved ${app.id} by ${userId} keys=${keys.join(',')}`)
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
}

export async function uploadDocument(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) throw new AppError('Unauthorized', 401)
    const userId = req.user.id
    const id = String(req.params.id)
    if (!isNonEmptyString(id)) throw new AppError('Invalid id', 400)
    const app = await prisma.application.findUnique({ where: { id }, select: { id: true, userId: true } })
    if (!app) throw new AppError('Not found', 404)
    ensureOwner(app, userId)
    const doc = await prisma.document.create({
      data: {
        applicationId: id,
        fileName: req.body.fileName,
        fileUrl: req.body.fileUrl,
        documentType: req.body.documentType,
      },
      select: { id: true, fileName: true, fileUrl: true, documentType: true, uploadedAt: true },
    })
    logger.info(`document metadata added ${doc.id} app=${id} by ${userId} type=${req.body.documentType}`)
    res.status(201).json({ success: true, data: doc })
  } catch (err) {
    next(err)
  }
}

export async function uploadDocumentFile(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) throw new AppError('Unauthorized', 401)
    const userId = req.user.id
    const id = String(req.params.id)
    if (!isNonEmptyString(id)) throw new AppError('Invalid id', 400)
    const app = await prisma.application.findUnique({ where: { id }, select: { id: true, userId: true } })
    if (!app) throw new AppError('Not found', 404)
    ensureOwner(app, userId)
    if (!req.file) throw new AppError('Invalid file type', 400)
    const maxDocs = Number(process.env.MAX_DOCUMENTS_PER_APPLICATION ?? 20)
    const count = await prisma.document.count({ where: { applicationId: id } })
    if (count >= maxDocs) throw new AppError('Document limit reached', 400)
    const typeMapStr = process.env.DOCUMENT_TYPE_ALLOWED ?? ''
    const map: Record<string, string[]> = {}
    for (const pair of typeMapStr.split(';')) {
      const [k, v] = pair.split('=')
      if (k && v) map[k.trim()] = v.split(',').map(s => s.trim())
    }
    const dt = String(req.body.documentType || '')
    if (!isNonEmptyString(dt)) throw new AppError('documentType is required', 400)
    if (map[dt] && !map[dt].includes(req.file.mimetype)) throw new AppError('Invalid file type for documentType', 400)
    const fileUrl = `/uploads/applications/${id}/${req.file.filename}`
    const doc = await prisma.document.create({
      data: {
        applicationId: id,
        fileName: req.file.originalname,
        fileUrl,
        documentType: dt,
      },
      select: { id: true, fileName: true, fileUrl: true, documentType: true, uploadedAt: true },
    })
    logger.info(`document uploaded ${doc.id} app=${id} by ${userId} name=${req.file.originalname} type=${req.file.mimetype}`)
    res.status(201).json({ success: true, data: doc })
  } catch (err) {
    next(err)
  }
}

export async function submitApplication(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) throw new AppError('Unauthorized', 401)
    const userId = req.user.id
    const id = String(req.params.id)
    if (!isNonEmptyString(id)) throw new AppError('Invalid id', 400)
    const app = await prisma.application.findUnique({ where: { id }, select: { id: true, userId: true, status: true } })
    if (!app) throw new AppError('Not found', 404)
    ensureOwner(app, userId)
    if (app.status !== 'DRAFT') throw new AppError('Application already submitted or invalid status', 400)
    const now = new Date()
    await prisma.$transaction([
      prisma.application.update({ where: { id }, data: { status: 'SUBMITTED', submittedAt: now } }),
      prisma.auditLog.create({ data: { applicationId: id, actorId: userId, action: 'SUBMITTED' } }),
    ])
    logger.info(`application submitted ${id} by ${userId}`)
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
}


export async function listApplications(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) throw new AppError('Unauthorized', 401)
    const userId = req.user.id

    const { skip, take } = parsePagination(req.query)
    const filters = parseFilters(req.query)

    const where = {
      userId,
      ...filters,
    }

    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          type: true,
          status: true,
          createdAt: true,
          submittedAt: true,
          smeData: {
            select: {
              businessName: true,
              loanAmount: true,
              loanProduct: true,
            },
          },
          payrollData: {
            select: {
              employerName: true,
              loanAmount: true,
              jobTitle: true,
            },
          },
        },
      }),
      prisma.application.count({ where }),
    ])

    const page = skip / take + 1
    const totalPages = Math.ceil(total / take)

    res.json({
      success: true,
      data: applications,
      meta: {
        total,
        page,
        totalPages,
        limit: take,
      },
    })
  } catch (err) {
    next(err)
  }
}

export async function getApplicationById(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) throw new AppError('Unauthorized', 401)
    const userId = req.user.id
    const id = String(req.params.id)
    if (!isNonEmptyString(id)) throw new AppError('Invalid id', 400)

    const app = await prisma.application.findUnique({
      where: { id },
      select: {
        id: true,
        type: true,
        status: true,
        createdAt: true,
        submittedAt: true,
        userId: true,
        smeData: true,
        payrollData: true,
        documents: {
          select: {
            id: true,
            fileName: true,
            fileUrl: true,
            documentType: true,
            uploadedAt: true,
          },
        },
      },
    })

    if (!app) throw new AppError('Application not found', 404)
    if (app.userId !== userId) throw new AppError('Forbidden', 403)

    res.json({ success: true, app: app })
  } catch (err) {
    next(err)
  }
}

export async function deleteApplication(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) throw new AppError('Unauthorized', 401)
    const userId = req.user.id
    const id = String(req.params.id)
    if (!isNonEmptyString(id)) throw new AppError('Invalid id', 400)

    const app = await prisma.application.findUnique({
      where: { id },
      select: { userId: true, status: true },
    })

    if (!app) throw new AppError('Not found', 404)
    if (app.userId !== userId) throw new AppError('Forbidden', 403)

    // Only allow deletion if in DRAFT or SUBMITTED (not beyond review)
    if (!['DRAFT', 'SUBMITTED'].includes(app.status)) {
      throw new AppError('Cannot delete application in current status', 400)
    }

    await prisma.$transaction(async (tx) => {
      // Delete related data
      await tx.document.deleteMany({ where: { applicationId: id } })
      await tx.smeApplicationData.deleteMany({ where: { applicationId: id } })
      await tx.payrollApplicationData.deleteMany({ where: { applicationId: id } })
      await tx.auditLog.deleteMany({ where: { applicationId: id } })
      await tx.application.delete({ where: { id } })
    })

    logger.info(`application deleted ${id} by ${userId}`)
    res.json({ success: true, message: 'Application deleted' })
  } catch (err) {
    next(err)
  }
}