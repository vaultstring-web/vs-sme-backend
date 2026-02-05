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
// Import rate limiting if needed
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
// Create rate limiters inline (no wildcard paths)
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
// Logging
app.use(logger_1.successLogger);
app.use(logger_1.errorLogger);
// Security
(0, security_1.setupSecurityMiddleware)(app);
// Body parsing
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
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
app.use('/api', routes_1.default);
// Error handler (must be last)
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map