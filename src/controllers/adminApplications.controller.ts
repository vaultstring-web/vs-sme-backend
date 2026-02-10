import type { NextFunction, Request, Response } from 'express'
import { prisma } from '../db/prisma'
import { AppError } from '../utils/AppError'
import { applicationEvents } from '../events/applicationEvents'

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0
}

const allowedStatuses = new Set([
  'DRAFT',
  'SUBMITTED',
  'UNDER_REVIEW',
  'APPROVED',
  'REJECTED',
  'DISBURSED',
  'REPAYED',
  'DEFAULTED',
])

type AppStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'DISBURSED'
  | 'REPAYED'
  | 'DEFAULTED'

const allowedTransitions: Record<AppStatus, Set<AppStatus>> = {
  DRAFT: new Set([]),
  SUBMITTED: new Set(['UNDER_REVIEW', 'APPROVED', 'REJECTED']),
  UNDER_REVIEW: new Set(['APPROVED', 'REJECTED']),
  APPROVED: new Set(['DISBURSED']),
  REJECTED: new Set([]),
  DISBURSED: new Set(['REPAYED', 'DEFAULTED']),
  REPAYED: new Set([]),
  DEFAULTED: new Set([]),
}

function parseStatus(v: unknown): AppStatus {
  if (!isNonEmptyString(v)) throw new AppError('status is required', 400)
  const s = v.trim().toUpperCase()
  if (!allowedStatuses.has(s)) throw new AppError('Invalid status', 400)
  return s as AppStatus
}

function parseComment(v: unknown): string {
  if (!isNonEmptyString(v)) throw new AppError('comment is required', 400)
  return v.trim()
}

function validateTransition(from: AppStatus, to: AppStatus) {
  if (from === to) throw new AppError('Status is unchanged', 400)
  const allowed = allowedTransitions[from]
  if (!allowed || !allowed.has(to)) throw new AppError(`Invalid status transition ${from} -> ${to}`, 400)
}

function parseDateFromIso(v: unknown, fieldName: string): Date {
  if (!isNonEmptyString(v)) throw new AppError(`${fieldName} must be ISO string`, 400)
  const d = new Date(v)
  if (isNaN(d.getTime())) throw new AppError(`${fieldName} must be ISO date`, 400)
  return d
}

function buildSmeUpdateData(patch: any): { data: any; changed: string[] } {
  if (!patch || typeof patch !== 'object') throw new AppError('smeData must be an object', 400)
  const data: any = {}
  const changed: string[] = []

  const setString = (k: string, optional = false) => {
    if (!(k in patch)) return
    const v = patch[k]
    if (v == null) {
      if (!optional) throw new AppError(`${k} must be string`, 400)
      data[k] = null
      changed.push(k)
      return
    }
    if (!isNonEmptyString(v)) throw new AppError(`${k} must be string`, 400)
    data[k] = v
    changed.push(k)
  }
  const setNumber = (k: string, optional = false) => {
    if (!(k in patch)) return
    const v = patch[k]
    if (v == null) {
      if (!optional) throw new AppError(`${k} must be number`, 400)
      data[k] = null
      changed.push(k)
      return
    }
    if (typeof v !== 'number' || !Number.isFinite(v)) throw new AppError(`${k} must be number`, 400)
    data[k] = v
    changed.push(k)
  }
  const setBoolean = (k: string) => {
    if (!(k in patch)) return
    const v = patch[k]
    if (typeof v !== 'boolean') throw new AppError(`${k} must be boolean`, 400)
    data[k] = v
    changed.push(k)
  }

  setString('businessName')
  setString('registrationNo', true)
  setString('businessType')
  setNumber('yearsInOperation')
  setString('loanProduct')
  setNumber('loanAmount')
  setNumber('paybackPeriodMonths')
  setString('purposeOfLoan')
  setString('repaymentMethod')
  setNumber('estimatedMonthlyTurnover', true)
  setNumber('estimatedMonthlyProfit', true)
  setString('groupName', true)
  setNumber('groupMemberCount', true)
  setBoolean('hasOutstandingLoans')
  setString('outstandingLoanDetails', true)
  setBoolean('hasDefaulted')
  setString('defaultExplanation', true)

  if (!changed.length) throw new AppError('No valid fields to update', 400)
  return { data, changed }
}

function buildPayrollUpdateData(patch: any): { data: any; changed: string[] } {
  if (!patch || typeof patch !== 'object') throw new AppError('payrollData must be an object', 400)
  const data: any = {}
  const changed: string[] = []

  const setString = (k: string, optional = false) => {
    if (!(k in patch)) return
    const v = patch[k]
    if (v == null) {
      if (!optional) throw new AppError(`${k} must be string`, 400)
      data[k] = null
      changed.push(k)
      return
    }
    if (!isNonEmptyString(v)) throw new AppError(`${k} must be string`, 400)
    data[k] = v
    changed.push(k)
  }
  const setNumber = (k: string) => {
    if (!(k in patch)) return
    const v = patch[k]
    if (typeof v !== 'number' || !Number.isFinite(v)) throw new AppError(`${k} must be number`, 400)
    data[k] = v
    changed.push(k)
  }
  const setBoolean = (k: string) => {
    if (!(k in patch)) return
    const v = patch[k]
    if (typeof v !== 'boolean') throw new AppError(`${k} must be boolean`, 400)
    data[k] = v
    changed.push(k)
  }
  const setDate = (k: string) => {
    if (!(k in patch)) return
    data[k] = parseDateFromIso(patch[k], k)
    changed.push(k)
  }

  setDate('dateOfBirth')
  setString('gender')
  setString('maritalStatus')
  setString('nextOfKinName')
  setString('nextOfKinRelationship')
  setString('nextOfKinPhone')
  setNumber('loanAmount')
  setNumber('paybackPeriodMonths')
  setString('employerName')
  setString('employerAddress')
  setString('jobTitle')
  setString('employeeNumber')
  setDate('dateOfEmployment')
  setNumber('grossMonthlySalary')
  setNumber('netMonthlySalary')
  setBoolean('payrollDeductionConfirmed')
  setBoolean('hasOutstandingLoans')
  setString('outstandingLoanDetails', true)
  setBoolean('hasDefaulted')
  setString('defaultExplanation', true)

  if (!changed.length) throw new AppError('No valid fields to update', 400)
  return { data, changed }
}

export async function updateApplicationStatus(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) throw new AppError('Unauthorized', 401)
    const actorId = req.user.id
    const id = String(req.params.id)
    if (!isNonEmptyString(id)) throw new AppError('Invalid id', 400)

    const status = parseStatus(req.body?.status)
    const comment = parseComment(req.body?.comment)

    const app = await prisma.application.findUnique({
      where: { id },
      select: { id: true, userId: true, status: true },
    })
    if (!app) throw new AppError('Not found', 404)
    validateTransition(app.status as AppStatus, status)

    const updated = await prisma.$transaction(async tx => {
      const a = await tx.application.update({
        where: { id },
        data: { status },
        select: { id: true, userId: true, status: true, updatedAt: true },
      })
      await tx.auditLog.create({
        data: {
          applicationId: id,
          actorId,
          action: status,
          notes: comment,
        },
      })
      return a
    })

    applicationEvents.emit('application.status.changed', {
      applicationId: id,
      userId: updated.userId,
      actorId,
      fromStatus: app.status,
      toStatus: status,
      comment,
    })

    res.json({ success: true, data: updated })
  } catch (err) {
    next(err)
  }
}

export async function bulkUpdateApplicationStatus(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) throw new AppError('Unauthorized', 401)
    const actorId = req.user.id
    const status = parseStatus(req.body?.status)
    const comment = parseComment(req.body?.comment)
    const idsRaw = req.body?.ids
    if (!Array.isArray(idsRaw) || !idsRaw.length) throw new AppError('ids must be a non-empty array', 400)
    if (idsRaw.length > 100) throw new AppError('Bulk limit exceeded', 400)

    const ids = Array.from(new Set(idsRaw.map((v: any) => String(v)).filter(isNonEmptyString)))
    if (ids.length !== idsRaw.length) throw new AppError('ids must be unique non-empty strings', 400)

    const apps = await prisma.application.findMany({
      where: { id: { in: ids } },
      select: { id: true, userId: true, status: true },
    })
    const byId = new Map(apps.map(a => [a.id, a]))
    const missing = ids.filter(id => !byId.has(id))
    if (missing.length) throw new AppError(`Not found: ${missing.join(', ')}`, 404)

    const invalid: Array<{ id: string; from: string; to: string }> = []
    for (const app of apps) {
      try {
        validateTransition(app.status as AppStatus, status)
      } catch {
        invalid.push({ id: app.id, from: app.status, to: status })
      }
    }
    if (invalid.length) {
      throw new AppError(`Invalid transitions for ids: ${invalid.map(i => i.id).join(', ')}`, 400)
    }

    await prisma.$transaction(
      apps.flatMap(app => [
        prisma.application.update({ where: { id: app.id }, data: { status } }),
        prisma.auditLog.create({
          data: { applicationId: app.id, actorId, action: status, notes: comment },
        }),
      ]),
    )

    for (const app of apps) {
      applicationEvents.emit('application.status.changed', {
        applicationId: app.id,
        userId: app.userId,
        actorId,
        fromStatus: app.status,
        toStatus: status,
        comment,
      })
    }

    res.json({ success: true, updatedCount: apps.length })
  } catch (err) {
    next(err)
  }
}

export async function updateApplicationData(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) throw new AppError('Unauthorized', 401)
    const actorId = req.user.id
    const id = String(req.params.id)
    if (!isNonEmptyString(id)) throw new AppError('Invalid id', 400)

    const comment = parseComment(req.body?.comment)

    const app = await prisma.application.findUnique({
      where: { id },
      select: { id: true, type: true, userId: true, smeData: { select: { id: true } }, payrollData: { select: { id: true } } },
    })
    if (!app) throw new AppError('Not found', 404)

    if (app.type === 'SME') {
      if (!app.smeData) throw new AppError('Application data missing', 409)
      const { data, changed } = buildSmeUpdateData(req.body?.smeData)
      const updated = await prisma.$transaction(async tx => {
        const d = await tx.smeApplicationData.update({
          where: { applicationId: id },
          data,
        })
        await tx.auditLog.create({
          data: {
            applicationId: id,
            actorId,
            action: 'DATA_EDITED',
            notes: `Fields: ${changed.join(', ')}; Comment: ${comment}`,
          },
        })
        return d
      })
      applicationEvents.emit('application.data.edited', {
        applicationId: id,
        userId: app.userId,
        actorId,
        type: 'SME',
        fields: changed,
        comment,
      })
      res.json({ success: true, data: updated })
      return
    }

    if (app.type === 'PAYROLL') {
      if (!app.payrollData) throw new AppError('Application data missing', 409)
      const { data, changed } = buildPayrollUpdateData(req.body?.payrollData)
      const updated = await prisma.$transaction(async tx => {
        const d = await tx.payrollApplicationData.update({
          where: { applicationId: id },
          data,
        })
        await tx.auditLog.create({
          data: {
            applicationId: id,
            actorId,
            action: 'DATA_EDITED',
            notes: `Fields: ${changed.join(', ')}; Comment: ${comment}`,
          },
        })
        return d
      })
      applicationEvents.emit('application.data.edited', {
        applicationId: id,
        userId: app.userId,
        actorId,
        type: 'PAYROLL',
        fields: changed,
        comment,
      })
      res.json({ success: true, data: updated })
      return
    }

    throw new AppError('Unsupported application type', 400)
  } catch (err) {
    next(err)
  }
}

