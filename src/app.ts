import express, { Express } from 'express';
import { setupSecurityMiddleware } from './middleware/security';
import { successLogger, errorLogger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';

const app: Express = express();

// Logging
app.use(successLogger);
app.use(errorLogger);

// Security
setupSecurityMiddleware(app);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes (placeholder)
app.get('/', (req, res) => {
  res.json({ message: 'VaultString SME Backend - OK' });
});

// Error handler (must be last)
app.use(errorHandler);

export default app;