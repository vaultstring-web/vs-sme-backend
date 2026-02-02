import morgan from 'morgan';
import { Request, Response } from 'express';
import { logger } from '../config/logger';

// Morgan token to use Winston
morgan.token('message', (req: Request, res: Response) => {
  return (res.locals as any).errorMessage || '';
});

const getIpFormat = () => (process.env.NODE_ENV === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

export const successLogger = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.http(message.trim()) },
});

export const errorLogger = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});