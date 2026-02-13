// middleware/timeout.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';   // <-- import your custom error

export const timeout = (ms: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.setTimeout(ms, () => {
      next(new AppError('Request timeout', 408));
    });
    next();
  };
};