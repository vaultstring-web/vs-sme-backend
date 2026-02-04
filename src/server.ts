import app from './app';
import { env } from './config/env';
import { logger } from './config/logger';


const startServer = async () => {
  try {
    const server = app.listen(env.PORT, () => {
      logger.info(`🚀 Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
    });

    // Handle graceful shutdown
    const signals = ['SIGINT', 'SIGTERM'];
    signals.forEach((signal) => {
      process.on(signal, () => {
        logger.info(`Received ${signal}, shutting down gracefully...`);
        server.close(() => {
          logger.info('Server closed');
          process.exit(0);
        });
      });
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();