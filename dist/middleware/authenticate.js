"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const AppError_1 = require("../utils/AppError");
const prisma_1 = require("../db/prisma");
const jwt_service_1 = require("../services/jwt.service");
async function authenticate(req, _res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError_1.AppError('Unauthorized', 401);
        }
        const token = authHeader.slice('Bearer '.length).trim();
        if (!token)
            throw new AppError_1.AppError('Unauthorized', 401);
        const payload = (0, jwt_service_1.verifyAccessToken)(token);
        // Check if token is denylisted
        const denylisted = await prisma_1.prisma.denylistedToken.findUnique({
            where: { jti: payload.jti },
            select: { expiresAt: true },
        });
        if (denylisted && denylisted.expiresAt.getTime() > Date.now()) {
            throw new AppError_1.AppError('Token revoked', 401);
        }
        // Check if user still exists and has same role
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: payload.sub },
            select: { id: true, email: true, role: true, passwordHash: true },
        });
        if (!user) {
            throw new AppError_1.AppError('User no longer exists', 401);
        }
        req.user = {
            id: user.id,
            email: user.email,
            role: user.role,
            jti: payload.jti,
            token,
        };
        next();
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=authenticate.js.map