import type { NextFunction, Request, Response } from 'express'

import { AppError } from '../utils/AppError'

function normalizeRole(role: string): string {
  return role.trim().replace(/-/g, '_').toUpperCase()
}

export function requireRole(allowedRoles: string[]) {
  const allowed = new Set(allowedRoles.map(normalizeRole))

  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new AppError('Unauthorized', 401)

      const role = normalizeRole(req.user.role)
      if (!allowed.has(role)) throw new AppError('Forbidden', 403)

      next()
    } catch (err) {
      next(err)
    }
  }
}

