// src/middleware/role.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const restrictTo = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
      return next(new AppError('Authentication required for this route', 401));
    }

    if (!allowedRoles.includes(req.currentUser.role)) {
      return next(
        new AppError(
          `Insufficient permissions. Required role: ${allowedRoles.join(' or ')}`,
          403,
        ),
      );
    }

    next();
  };
};