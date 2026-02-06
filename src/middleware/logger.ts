import morgan from 'morgan';
import { Request, Response } from 'express';
import { logger } from '../config/logger';

// Morgan token to use Winston
morgan.token('message', (req: Request, res: Response) => {
  return (res.locals as any).errorMessage || '';
});
morgan.token('correlationId', (req: Request) => (req as any).id || '');
morgan.token('userId', (req: Request) => (req as any).user?.id || '');
morgan.token('resLength', (_req: Request, res: Response) => (res.getHeader('content-length') as string) || '');

const getIpFormat = () => (process.env.NODE_ENV === 'production' ? ':remote-addr - ' : '');
const base = `${getIpFormat()}[id=:correlationId] [user=:userId] :method :url :status - :response-time ms - len=:resLength`;
const successResponseFormat = base;
const errorResponseFormat = `${base} - message: :message`;

export const successLogger = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.http(message.trim()) },
});

export const errorLogger = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});
