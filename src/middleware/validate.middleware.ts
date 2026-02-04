// src/middleware/validate.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema, ZodError } from 'zod';
import { AppError } from '../utils/AppError';

export const validate = <T>(schema: ZodSchema<T>, source: 'body' | 'query' | 'params' = 'body') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataToValidate =
        source === 'body'  ? req.body :
        source === 'query' ? req.query :
        req.params;

      const validated = await schema.parseAsync(dataToValidate);

      // Attach validated (and typed!) data back to request
      // This is the wizard touch — controllers get clean, typed object
      (req as any)[`${source}Validated`] = validated;

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const formattedErrors = err.errors.map(e => ({
          path: e.path.join('.'),
          message: e.message,
          code: e.code,
          // optionally: received: e.received (very helpful for debugging)
        }));

        return next(
          new AppError('Validation failed', 400, {
            errors: formattedErrors,
            // you can add more context if you want
          })
        );
      }
      next(err);
    }
  };
};

// Optional: helper to get validated data in controllers (type-safe)
export const getValidated = <T>(req: Request, source: 'body' | 'query' | 'params' = 'body'): T => {
  return (req as any)[`${source}Validated`] as T;
};