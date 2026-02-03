"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSecurityMiddleware = void 0;
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const setupSecurityMiddleware = (app) => {
    // Security headers
    app.use((0, helmet_1.default)());
    // CORS (adjust origin for production)
    app.use((0, cors_1.default)({
        origin: process.env.NODE_ENV === 'production'
            ? ['https://vaultstring.com']
            : '*',
        credentials: true,
    }));
};
exports.setupSecurityMiddleware = setupSecurityMiddleware;
//# sourceMappingURL=security.js.map