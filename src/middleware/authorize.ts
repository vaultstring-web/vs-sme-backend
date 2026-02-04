import type { NextFunction, Request, Response } from 'express'
import { AppError } from '../utils/AppError'
import type { Role } from '../generated/prisma'

export function requireRole(allowedRoles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError('Authentication required', 401)
    }

    if (!allowedRoles.includes(req.user.role as Role)) {
      throw new AppError(
        `Access denied. Required roles: ${allowedRoles.join(', ')}`,
        403
      )
    }

    next()
  }
}

// Convenience middleware for common role checks
export const requireAdminTier1 = requireRole(['ADMIN_TIER1'])
export const requireAdminTier2 = requireRole(['ADMIN_TIER2'])
export const requireAdmin = requireRole(['ADMIN_TIER1', 'ADMIN_TIER2'])
export const requireApplicant = requireRole(['APPLICANT'])