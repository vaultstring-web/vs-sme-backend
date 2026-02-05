import express, { Express } from 'express';
import './types/express'; // Type definitions
import { setupSecurityMiddleware } from './middleware/security';
import { successLogger, errorLogger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';

// Import rate limiting if needed
import rateLimit from 'express-rate-limit';

const app: Express = express();

// Create rate limiters inline (no wildcard paths)
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

// Logging
app.use(successLogger);
app.use(errorLogger);

// Security
setupSecurityMiddleware(app);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting - no wildcards
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/auth/password-reset/request', authLimiter);
app.use('/api/auth/password-reset/confirm', authLimiter);
app.use('/api', apiLimiter);

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
