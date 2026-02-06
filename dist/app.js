"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./types/express"); // Type definitions
const security_1 = require("./middleware/security");
const logger_1 = require("./middleware/logger");
const errorHandler_1 = require("./middleware/errorHandler");
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const correlationId_1 = require("./middleware/correlationId");
// Import rate limiting
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const env_1 = require("./config/env"); // ← Import env config
const app = (0, express_1.default)();
// Logging
app.use(logger_1.successLogger);
app.use(logger_1.errorLogger);
// Security
(0, security_1.setupSecurityMiddleware)(app);
// Body parsing
app.use(correlationId_1.correlationId);
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// ➕ Only apply rate limiting in non-test environments
if (env_1.env.NODE_ENV !== 'test') {
    const authLimiter = (0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        max: 5,
        message: 'Too many attempts, please try again after 15 minutes',
        standardHeaders: true,
    });
    const apiLimiter = (0, express_rate_limit_1.default)({
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
app.use('/uploads', express_1.default.static(path_1.default.resolve('uploads')));
// Routes
app.get('/', (req, res) => {
    res.json({ message: 'VaultString SME Backend - OK' });
});
app.get('/api/_ping', (_req, res) => {
    res.json({ ok: true });
});
app.use('/api', routes_1.default);
// Error handler (must be last)
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map