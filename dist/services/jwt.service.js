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
exports.signRefreshToken = signRefreshToken;
exports.signTokenPair = signTokenPair;
exports.verifyAccessToken = verifyAccessToken;
exports.verifyRefreshToken = verifyRefreshToken;
exports.getTokenExpiration = getTokenExpiration;
exports.extractUserIdFromToken = extractUserIdFromToken;
const jwt = __importStar(require("jsonwebtoken"));
const node_crypto_1 = __importDefault(require("node:crypto"));
const env_1 = require("../config/env");
const AppError_1 = require("../utils/AppError");
// Token expiration configurations
const JWT_ACCESS_EXPIRY = process.env.JWT_ACCESS_EXPIRY || '15m';
const JWT_REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY || '7d';
/**
 * Sign an access token
 */
function signAccessToken(user) {
    const jti = node_crypto_1.default.randomUUID();
    const token = jwt.sign({
        email: user.email,
        role: user.role,
        type: 'access'
    }, env_1.env.JWT_SECRET, {
        subject: user.id,
        jwtid: jti,
        expiresIn: env_1.env.JWT_ACCESS_EXPIRY,
    });
    const decoded = jwt.decode(token);
    if (!decoded?.exp) {
        throw new AppError_1.AppError('Failed to generate access token', 500);
    }
    return { token, jti, expiresAt: new Date(decoded.exp * 1000) };
}
/**
 * Sign a refresh token
 */
function signRefreshToken(userId) {
    const jti = node_crypto_1.default.randomUUID();
    const token = jwt.sign({ type: 'refresh' }, env_1.env.JWT_SECRET, {
        subject: userId,
        jwtid: jti,
        expiresIn: env_1.env.JWT_REFRESH_EXPIRY, // Clean reference from env
    });
    const decoded = jwt.decode(token);
    if (!decoded?.exp) {
        throw new AppError_1.AppError('Failed to generate refresh token', 500);
    }
    return { token, jti, expiresAt: new Date(decoded.exp * 1000) };
}
/**
 * Sign both access and refresh tokens for a user
 */
function signTokenPair(user) {
    const { token: accessToken, jti: accessJti } = signAccessToken(user);
    const { token: refreshToken, jti: refreshJti } = signRefreshToken(user.id);
    return {
        accessToken,
        refreshToken,
        accessJti,
        refreshJti,
    };
}
/**
 * Verify an access token
 */
function verifyAccessToken(token) {
    let decoded;
    try {
        decoded = jwt.verify(token, env_1.env.JWT_SECRET);
    }
    catch (error) {
        throw new AppError_1.AppError('Invalid token', 401);
    }
    if (!decoded || typeof decoded === 'string' || typeof decoded !== 'object') {
        throw new AppError_1.AppError('Invalid token', 401);
    }
    try {
        const decoded = jwt.verify(token, env_1.env.JWT_SECRET);
        if (!decoded || typeof decoded === 'string' || typeof decoded !== 'object') {
            throw new AppError_1.AppError('Invalid token', 401);
        }
        const sub = typeof decoded.sub === 'string' ? decoded.sub : undefined;
        const email = typeof decoded.email === 'string' ? decoded.email : undefined;
        const role = typeof decoded.role === 'string' ? decoded.role : undefined;
        const jti = typeof decoded.jti === 'string' ? decoded.jti : undefined;
        const type = typeof decoded.type === 'string' ? decoded.type : undefined;
        if (!sub || !email || !role || !jti) {
            throw new AppError_1.AppError('Invalid token', 401);
        }
        if (type !== 'access') {
            throw new AppError_1.AppError('Invalid token type', 401);
        }
        // Validate role is a valid Prisma Role enum value
        const validRoles = ['APPLICANT', 'ADMIN_TIER1', 'ADMIN_TIER2'];
        if (!validRoles.includes(role)) {
            throw new AppError_1.AppError('Invalid role in token', 401);
        }
        return {
            sub,
            email,
            role: role,
            jti,
            type: 'access'
        };
    }
    catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            throw new AppError_1.AppError('Token expired', 401);
        }
        if (err instanceof jwt.JsonWebTokenError) {
            throw new AppError_1.AppError('Invalid token', 401);
        }
        // Re-throw our AppError or other errors
        throw err;
    }
}
/**
 * Verify a refresh token
 */
function verifyRefreshToken(token) {
    try {
        const decoded = jwt.verify(token, env_1.env.JWT_SECRET);
        if (!decoded || typeof decoded === 'string' || typeof decoded !== 'object') {
            throw new AppError_1.AppError('Invalid token', 401);
        }
        const sub = typeof decoded.sub === 'string' ? decoded.sub : undefined;
        const jti = typeof decoded.jti === 'string' ? decoded.jti : undefined;
        const type = typeof decoded.type === 'string' ? decoded.type : undefined;
        if (!sub || !jti) {
            throw new AppError_1.AppError('Invalid token', 401);
        }
        if (type !== 'refresh') {
            throw new AppError_1.AppError('Invalid token type', 401);
        }
        return {
            sub,
            jti,
            type: 'refresh'
        };
    }
    catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            throw new AppError_1.AppError('Token expired', 401);
        }
        if (err instanceof jwt.JsonWebTokenError) {
            throw new AppError_1.AppError('Invalid token', 401);
        }
        throw err;
    }
}
/**
 * Extract expiration date from a JWT token
 */
function getTokenExpiration(token) {
    const decoded = jwt.decode(token);
    if (!decoded || typeof decoded === 'string' || typeof decoded.exp !== 'number') {
        throw new AppError_1.AppError('Invalid token', 401);
    }
    return new Date(decoded.exp * 1000);
}
/**
 * Extract user ID from token without verification (for logging, etc.)
 */
function extractUserIdFromToken(token) {
    try {
        const decoded = jwt.decode(token);
        if (!decoded || typeof decoded === 'string' || typeof decoded !== 'object') {
            return null;
        }
        return typeof decoded.sub === 'string' ? decoded.sub : null;
    }
    catch {
        return null;
    }
}
//# sourceMappingURL=jwt.service.js.map