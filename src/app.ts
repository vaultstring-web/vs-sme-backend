import express, { Express } from 'express';
import './types/express'; // Type definitions
import './events/registerNotificationHandlers';
import { setupSecurityMiddleware } from './middleware/security';
import { successLogger, errorLogger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';
import path from 'path';
import { correlationId } from './middleware/correlationId';

// Import rate limiters from dedicated file
import { authLimiter } from './middleware/rateLimiter';

import { env } from './config/env';

const app: Express = express();

// Trust proxy – necessary for accurate client IP behind a reverse proxy (e.g., nginx, cloudflare)
app.set('trust proxy', 1); // adjust the number or use `true` if behind a single proxy

// Logging
app.use(successLogger);
app.use(errorLogger);

// Security
setupSecurityMiddleware(app);

// Body parsing
app.use(correlationId);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ➕ Only apply rate limiting in non‑test environments
if (env.NODE_ENV !== 'test') {
  // Apply auth rate limiter to authentication endpoints only
  app.use('/api/auth/login', authLimiter);
  app.use('/api/auth/register', authLimiter);
  app.use('/api/auth/password-reset/request', authLimiter);
  app.use('/api/auth/password-reset/confirm', authLimiter);

  // ⚠️  No global `/api` rate limiter is applied here.
  //     Apply specific limiters (e.g., apiLimiter, strictLimiter) inside individual route files
  //     to avoid double counting and to keep limits IP‑based.
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