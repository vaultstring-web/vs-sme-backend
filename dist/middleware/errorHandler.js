"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("../config/logger");
const errorHandler = (err, req, res, next) => {
    const meta = {
        id: req.id,
        method: req.method,
        url: req.originalUrl || req.url,
        status: err.statusCode || 500,
        userId: req.user?.id,
    };
    logger_1.logger.error(`${meta.id} ${meta.method} ${meta.url} -> ${meta.status} ${err.message}`);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map