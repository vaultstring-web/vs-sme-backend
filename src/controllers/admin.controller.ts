import type { Request, Response, NextFunction } from 'express'
import { prisma } from '../db/prisma'
import { AppError } from '../utils/AppError'
import { logger } from '../config/logger'

function parseNumber(v: unknown, def: number): number {
  const n = Number(v)
  return Number.isFinite(n) && n > 0 ? n : def
}

function parseString(v: unknown): string | undefined {
  if (typeof v !== 'string') return undefined
  const s = v.trim()
  return s.length ? s : undefined
}

function parseDate(v: unknown): Date | undefined {
  if (typeof v !== 'string') return undefined
  const d = new Date(v)
  return isNaN(d.getTime()) ? undefined : d
}

function buildApplicationWhere(req: Request) {
  const type = parseString(req.query.type)
  const statusStr = parseString(req.query.status)
  const createdFrom = parseDate(req.query.createdFrom)
  const createdTo = parseDate(req.query.createdTo)
  const submittedFrom = parseDate(req.query.submittedFrom)
  const submittedTo = parseDate(req.query.submittedTo)
  const userId = parseString(req.query.userId)
  const userName = parseString(req.query.userName)
  const q = parseString(req.query.q)

  const statusList = statusStr ? statusStr.split(',').map(s => s.trim()).filter(Boolean) : undefined

  const where: any = {}
  if (type) where.type = type
  if (statusList && statusList.length) where.status = { in: statusList }
  if (createdFrom || createdTo) {
    where.createdAt = {}
    if (createdFrom) where.createdAt.gte = createdFrom
    if (createdTo) where.createdAt.lte = createdTo
  }
  if (submittedFrom || submittedTo) {
    where.submittedAt = {}
    if (submittedFrom) where.submittedAt.gte = submittedFrom
    if (submittedTo) where.submittedAt.lte = submittedTo
  }
  if (userId) where.userId = userId
  if (userName) {
    where.user = {
      is: {
        OR: [
          { fullName: { contains: userName } },
          { email: { contains: userName } },
          { primaryPhone: { contains: userName } },
        ],
      },
    }
  }
  if (q) {
    const smeSearch = {
      smeData: {
        is: {
          OR: [
            { businessName: { contains: q } },
            { registrationNo: { contains: q } },
            { loanProduct: { contains: q } },
            { purposeOfLoan: { contains: q } },
          ],
        },
      },
    }
    const payrollSearch = {
      payrollData: {
        is: {
          OR: [
            { employerName: { contains: q } },
            { jobTitle: { contains: q } },
            { employeeNumber: { contains: q } },
          ],
        },
      },
    }
    const appSearch = {
      OR: [
        { id: { contains: q } },
        smeSearch,
        payrollSearch,
        {
          user: {
            is: {
              OR: [
                { fullName: { contains: q } },
                { email: { contains: q } },
                { primaryPhone: { contains: q } },
              ],
            },
          },
        },
      ],
    }
    Object.assign(where, appSearch)
  }
  return where
}

export async function listApplications(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) throw new AppError('Unauthorized', 401)
    const page = parseNumber(req.query.page, 1)
    const sizeRaw = parseNumber(req.query.pageSize, 20)
    const pageSize = Math.min(sizeRaw, 100)
    const sortByRaw = parseString(req.query.sortBy) || 'createdAt'
    const allowedSort = new Set(['createdAt', 'submittedAt', 'status', 'type'])
    const sortBy = allowedSort.has(sortByRaw) ? sortByRaw : 'createdAt'
    const sortOrder = parseString(req.query.sortOrder) === 'asc' ? 'asc' : 'desc'

    const where = buildApplicationWhere(req)

    const total = await prisma.application.count({ where })
    const data = await prisma.application.findMany({
      where,
      include: {
        user: {
          select: { id: true, fullName: true, email: true, primaryPhone: true, role: true },
        },
      },
      orderBy: { [sortBy]: sortOrder as any },
      skip: (page - 1) * pageSize,
      take: pageSize,
    })

    logger.info('admin list applications', {
      actor: req.user.id,
      total,
      page,
      pageSize,
    })

    res.json({
      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
      },
      data,
    })
  } catch (err) {
    next(err)
  }
}

export async function listUsers(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) throw new AppError('Unauthorized', 401)
    const page = parseNumber(req.query.page, 1)
    const sizeRaw = parseNumber(req.query.pageSize, 20)
    const pageSize = Math.min(sizeRaw, 100)
    const role = parseString(req.query.role)
    const q = parseString(req.query.q)
    const createdFrom = parseDate(req.query.createdFrom)
    const createdTo = parseDate(req.query.createdTo)

    const where: any = {}
    if (role) where.role = role
    if (createdFrom || createdTo) {
      where.createdAt = {}
      if (createdFrom) where.createdAt.gte = createdFrom
      if (createdTo) where.createdAt.lte = createdTo
    }
    if (q) {
      where.OR = [
        { fullName: { contains: q } },
        { email: { contains: q } },
        { primaryPhone: { contains: q } },
        { nationalIdOrPassport: { contains: q } },
      ]
    }

    const total = await prisma.user.count({ where })
    const data = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        primaryPhone: true,
        secondaryPhone: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    })

    logger.info('admin list users', { actor: req.user.id, total, page, pageSize })

    res.json({
      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
      },
      data,
    })
  } catch (err) {
    next(err)
  }
}

export async function getAdminStats(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) throw new AppError('Unauthorized', 401)
    const createdFrom = parseDate(req.query.createdFrom)
    const createdTo = parseDate(req.query.createdTo)
    const where: any = {}
    if (createdFrom || createdTo) {
      where.createdAt = {}
      if (createdFrom) where.createdAt.gte = createdFrom
      if (createdTo) where.createdAt.lte = createdTo
    }
    const total = await prisma.application.count({ where })
    const approved = await prisma.application.count({ where: { ...where, status: 'APPROVED' } })
    const byType = await prisma.application.groupBy({
      by: ['type'],
      where,
      _count: { _all: true },
    })
    const byStatus = await prisma.application.groupBy({
      by: ['status'],
      where,
      _count: { _all: true },
    })
    const approvalRate = total ? approved / total : 0
    logger.info('admin stats viewed', { actor: req.user.id })
    res.json({
      total,
      approved,
      approvalRate,
      byType,
      byStatus,
    })
  } catch (err) {
    next(err)
  }
}

export async function exportApplications(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) throw new AppError('Unauthorized', 401)
    const where = buildApplicationWhere(req)
    const items = await prisma.application.findMany({
      where,
      include: {
        user: { select: { id: true, fullName: true, email: true, primaryPhone: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', 'attachment; filename="applications.csv"')
    const header = [
      'id',
      'type',
      'status',
      'createdAt',
      'submittedAt',
      'userId',
      'fullName',
      'email',
      'primaryPhone',
    ].join(',')
    res.write(`${header}\n`)
    for (const a of items) {
      const row = [
        a.id,
        a.type,
        a.status,
        a.createdAt.toISOString(),
        a.submittedAt ? a.submittedAt.toISOString() : '',
        a.user.id,
        a.user.fullName.replace(/"/g, '""'),
        a.user.email,
        a.user.primaryPhone,
      ]
        .map(v => `"${String(v ?? '').replace(/"/g, '""')}"`)
        .join(',')
      res.write(`${row}\n`)
    }
    logger.info('admin export applications', { actor: req.user.id, count: items.length })
    res.end()
  } catch (err) {
    next(err)
  }
}