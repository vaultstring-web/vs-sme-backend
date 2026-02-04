// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError'; // ← create this if missing

interface JwtPayload {
  sub: string;          // user id
  role?: string;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: {
        id: string;
        role: string;
        // add more fields later if needed
      };
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Get token
    let token: string | undefined;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('Not authenticated – token missing', 401));
    }

    // 2. Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'change-this-in-production-very-unsafe',
    ) as JwtPayload;

    // 3. Attach minimal user info to request
    req.currentUser = {
      id: decoded.sub,
      role: decoded.role || 'user',
    };

    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return next(new AppError('Session expired – please sign in again', 401));
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return next(new AppError('Invalid authentication token', 401));
    }
    next(new AppError('Authentication failed', 401));
  }
};