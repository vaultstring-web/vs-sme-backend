import { ErrorRequestHandler } from 'express';
import { logger } from '../config/logger';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const meta = {
    id: (req as any).id,
    method: req.method,
    url: req.originalUrl || req.url,
    status: (err as any).statusCode || 500,
    userId: (req as any).user?.id,
  };
  logger.error(`${meta.id} ${meta.method} ${meta.url} -> ${meta.status} ${err.message}`);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
