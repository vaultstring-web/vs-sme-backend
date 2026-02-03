"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signAccessToken = signAccessToken;
exports.verifyAccessToken = verifyAccessToken;
const jwt = __importStar(require("jsonwebtoken"));
const node_crypto_1 = __importDefault(require("node:crypto"));
const env_1 = require("../config/env");
const AppError_1 = require("../utils/AppError");
function signAccessToken(user) {
    const jti = node_crypto_1.default.randomUUID();
    const expiresIn = process.env.JWT_EXPIRES_IN ?? '1h';
    const token = jwt.sign({ email: user.email, role: user.role }, env_1.env.JWT_SECRET, {
        subject: user.id,
        jwtid: jti,
        expiresIn,
    });
    const decoded = jwt.decode(token);
    if (!decoded || typeof decoded === 'string' || typeof decoded.exp !== 'number') {
        throw new AppError_1.AppError('Failed to generate access token', 500);
    }
    return { token, jti, expiresAt: new Date(decoded.exp * 1000) };
}
function verifyAccessToken(token) {
    const decoded = jwt.verify(token, env_1.env.JWT_SECRET);
    if (!decoded || typeof decoded === 'string' || typeof decoded !== 'object') {
        throw new AppError_1.AppError('Invalid token', 401);
    }
    const sub = typeof decoded.sub === 'string' ? decoded.sub : undefined;
    const email = typeof decoded.email === 'string' ? decoded.email : undefined;
    const role = typeof decoded.role === 'string' ? decoded.role : undefined;
    const jti = typeof decoded.jti === 'string' ? decoded.jti : undefined;
    if (!sub || !email || !role || !jti)
        throw new AppError_1.AppError('Invalid token', 401);
    return { sub, email, role, jti };
}
//# sourceMappingURL=jwt.service.js.map