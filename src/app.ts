import express, { Express } from 'express';
import './types/express'; // Type definitions
import './events/registerNotificationHandlers'
import { setupSecurityMiddleware } from './middleware/security';
import { successLogger, errorLogger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';
import path from 'path';
import { correlationId } from './middleware/correlationId';

// Import rate limiting
import rateLimit from 'express-rate-limit';
import { env } from './config/env'; // ← Import env config

const app: Express = express();

// Logging
app.use(successLogger);
app.use(errorLogger);

// Security
setupSecurityMiddleware(app);

// Body parsing
app.use(correlationId);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ➕ Only apply rate limiting in non-test environments
if (env.NODE_ENV !== 'test') {
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many attempts, please try again after 15 minutes',
    standardHeaders: true,
  });

  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
  });

  // Auth endpoints
  app.use('/api/auth/login', authLimiter);
  app.use('/api/auth/register', authLimiter);
  app.use('/api/auth/password-reset/request', authLimiter);
  app.use('/api/auth/password-reset/confirm', authLimiter);

  // General API
  app.use('/api', apiLimiter);
}
app.use('/uploads', express.static(path.resolve('uploads')));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'VaultString SME Backend - OK' });
});

app.get('/api/_ping', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api', routes);

// Error handler (must be last)
app.use(errorHandler);

export default app;
