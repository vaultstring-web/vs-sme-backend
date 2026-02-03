"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./types/express");
const security_1 = require("./middleware/security");
const logger_1 = require("./middleware/logger");
const errorHandler_1 = require("./middleware/errorHandler");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
// Logging
app.use(logger_1.successLogger);
app.use(logger_1.errorLogger);
// Security
(0, security_1.setupSecurityMiddleware)(app);
// Body parsing
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// Routes (placeholder)
app.get('/', (req, res) => {
    res.json({ message: 'VaultString SME Backend - OK' });
});
app.use('/api', routes_1.default);
// Error handler (must be last)
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map