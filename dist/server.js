"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./config/env");
const logger_1 = require("./config/logger");
const app_1 = __importDefault(require("./app"));
const startServer = async () => {
    try {
        const server = app_1.default.listen(env_1.env.PORT, () => {
            logger_1.logger.info(`🚀 Server running on port ${env_1.env.PORT} in ${env_1.env.NODE_ENV} mode`);
        });
        // Handle graceful shutdown
        const signals = ['SIGINT', 'SIGTERM'];
        signals.forEach((signal) => {
            process.on(signal, () => {
                logger_1.logger.info(`Received ${signal}, shutting down gracefully...`);
                server.close(() => {
                    logger_1.logger.info('Server closed');
                    process.exit(0);
                });
            });
        });
    }
    catch (error) {
        logger_1.logger.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map