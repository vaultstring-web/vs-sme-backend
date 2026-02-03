"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const AppError_1 = require("../utils/AppError");
const prisma_1 = require("../db/prisma");
const jwt_service_1 = require("../services/jwt.service");
async function authenticate(req, _res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer '))
            throw new AppError_1.AppError('Unauthorized', 401);
        const token = authHeader.slice('Bearer '.length).trim();
        if (!token)
            throw new AppError_1.AppError('Unauthorized', 401);
        const payload = (0, jwt_service_1.verifyAccessToken)(token);
        const denylisted = await prisma_1.prisma.denylistedToken.findUnique({
            where: { jti: payload.jti },
            select: { expiresAt: true },
        });
        if (denylisted && denylisted.expiresAt.getTime() > Date.now())
            throw new AppError_1.AppError('Unauthorized', 401);
        req.user = {
            id: payload.sub,
            email: payload.email,
            role: payload.role,
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