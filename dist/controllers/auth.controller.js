"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.logout = logout;
exports.requestPasswordReset = requestPasswordReset;
exports.confirmPasswordReset = confirmPasswordReset;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../db/prisma");
const AppError_1 = require("../utils/AppError");
const jwt_service_1 = require("../services/jwt.service");
const passwordReset_service_1 = require("../services/passwordReset.service");
function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
}
function normalizeEmail(email) {
    return email.trim().toLowerCase();
}
function getJwtExpiresAt(token) {
    const decoded = jsonwebtoken_1.default.decode(token);
    if (!decoded || typeof decoded === 'string' || typeof decoded !== 'object' || typeof decoded.exp !== 'number') {
        throw new AppError_1.AppError('Invalid token', 401);
    }
    return new Date(decoded.exp * 1000);
}
function parsePhones(body) {
    if (body?.phones && typeof body.phones === 'object') {
        const primary = body.phones.primary ?? body.phones.primaryPhone;
        const secondary = body.phones.secondary ?? body.phones.secondaryPhone;
        if (!isNonEmptyString(primary))
            throw new AppError_1.AppError('phones.primary is required', 400);
        return { primaryPhone: primary.trim(), secondaryPhone: isNonEmptyString(secondary) ? secondary.trim() : undefined };
    }
    const primaryPhone = body?.primaryPhone;
    const secondaryPhone = body?.secondaryPhone;
    if (!isNonEmptyString(primaryPhone))
        throw new AppError_1.AppError('primaryPhone is required', 400);
    return {
        primaryPhone: primaryPhone.trim(),
        secondaryPhone: isNonEmptyString(secondaryPhone) ? secondaryPhone.trim() : undefined,
    };
}
function parseAddresses(body) {
    if (body?.addresses && typeof body.addresses === 'object') {
        const physical = body.addresses.physical ?? body.addresses.physicalAddress;
        const postal = body.addresses.postal ?? body.addresses.postalAddress;
        if (!isNonEmptyString(physical))
            throw new AppError_1.AppError('addresses.physical is required', 400);
        return { physicalAddress: physical.trim(), postalAddress: isNonEmptyString(postal) ? postal.trim() : undefined };
    }
    const physicalAddress = body?.physicalAddress;
    const postalAddress = body?.postalAddress;
    if (!isNonEmptyString(physicalAddress))
        throw new AppError_1.AppError('physicalAddress is required', 400);
    return {
        physicalAddress: physicalAddress.trim(),
        postalAddress: isNonEmptyString(postalAddress) ? postalAddress.trim() : undefined,
    };
}
function parseNationalId(body) {
    const nationalId = body?.nationalId ?? body?.nationalIdOrPassport;
    if (!isNonEmptyString(nationalId))
        throw new AppError_1.AppError('nationalId is required', 400);
    return nationalId.trim();
}
function prismaErrorCode(err) {
    if (!err || typeof err !== 'object')
        return undefined;
    return typeof err.code === 'string' ? err.code : undefined;
}
async function register(req, res, next) {
    try {
        const emailRaw = req.body?.email;
        const password = req.body?.password;
        const fullName = req.body?.fullName;
        if (!isNonEmptyString(emailRaw))
            throw new AppError_1.AppError('email is required', 400);
        if (!isNonEmptyString(password))
            throw new AppError_1.AppError('password is required', 400);
        if (password.trim().length < 8)
            throw new AppError_1.AppError('password must be at least 8 characters', 400);
        if (!isNonEmptyString(fullName))
            throw new AppError_1.AppError('fullName is required', 400);
        const { primaryPhone, secondaryPhone } = parsePhones(req.body);
        const { physicalAddress, postalAddress } = parseAddresses(req.body);
        const nationalIdOrPassport = parseNationalId(req.body);
        const email = normalizeEmail(emailRaw);
        const passwordHash = await bcrypt_1.default.hash(password, 12);
        const user = await prisma_1.prisma.user.create({
            data: {
                email,
                passwordHash,
                fullName: fullName.trim(),
                nationalIdOrPassport,
                primaryPhone,
                secondaryPhone,
                physicalAddress,
                postalAddress,
            },
            select: { id: true, email: true, fullName: true, role: true },
        });
        res.status(201).json({ profile: user });
    }
    catch (err) {
        if (prismaErrorCode(err) === 'P2002')
            return next(new AppError_1.AppError('Email already in use', 409));
        next(err);
    }
}
async function login(req, res, next) {
    try {
        const emailRaw = req.body?.email;
        const password = req.body?.password;
        if (!isNonEmptyString(emailRaw))
            throw new AppError_1.AppError('email is required', 400);
        if (!isNonEmptyString(password))
            throw new AppError_1.AppError('password is required', 400);
        const email = normalizeEmail(emailRaw);
        const user = await prisma_1.prisma.user.findUnique({
            where: { email },
            select: { id: true, email: true, fullName: true, role: true, passwordHash: true },
        });
        if (!user)
            throw new AppError_1.AppError('Invalid credentials', 401);
        const ok = await bcrypt_1.default.compare(password, user.passwordHash);
        if (!ok)
            throw new AppError_1.AppError('Invalid credentials', 401);
        const { token } = (0, jwt_service_1.signAccessToken)({ id: user.id, email: user.email, role: user.role });
        res.json({
            token,
            profile: { id: user.id, email: user.email, fullName: user.fullName, role: user.role },
        });
    }
    catch (err) {
        next(err);
    }
}
async function logout(req, res, next) {
    try {
        if (!req.user)
            throw new AppError_1.AppError('Unauthorized', 401);
        const expiresAt = getJwtExpiresAt(req.user.token);
        await prisma_1.prisma.denylistedToken.upsert({
            where: { jti: req.user.jti },
            create: { jti: req.user.jti, userId: req.user.id, expiresAt },
            update: { expiresAt },
        });
        res.json({ success: true });
    }
    catch (err) {
        next(err);
    }
}
async function requestPasswordReset(req, res, next) {
    try {
        const emailRaw = req.body?.email;
        if (!isNonEmptyString(emailRaw))
            throw new AppError_1.AppError('email is required', 400);
        const email = normalizeEmail(emailRaw);
        const user = await prisma_1.prisma.user.findUnique({ where: { email }, select: { id: true } });
        let resetToken;
        if (user) {
            const { token, tokenHash, expiresAt } = (0, passwordReset_service_1.generatePasswordResetToken)();
            await prisma_1.prisma.passwordResetToken.create({
                data: { userId: user.id, tokenHash, expiresAt },
            });
            if (process.env.NODE_ENV !== 'production')
                resetToken = token;
        }
        res.json({
            success: true,
            message: 'If an account exists for that email, a password reset token has been issued.',
            ...(resetToken ? { token: resetToken } : {}),
        });
    }
    catch (err) {
        next(err);
    }
}
async function confirmPasswordReset(req, res, next) {
    try {
        const token = req.body?.token;
        const newPassword = req.body?.newPassword;
        if (!isNonEmptyString(token))
            throw new AppError_1.AppError('token is required', 400);
        if (!isNonEmptyString(newPassword))
            throw new AppError_1.AppError('newPassword is required', 400);
        if (newPassword.trim().length < 8)
            throw new AppError_1.AppError('newPassword must be at least 8 characters', 400);
        const tokenHash = (0, passwordReset_service_1.hashPasswordResetToken)(token.trim());
        const record = await prisma_1.prisma.passwordResetToken.findUnique({
            where: { tokenHash },
            select: { id: true, userId: true, expiresAt: true, usedAt: true },
        });
        if (!record || record.usedAt || record.expiresAt.getTime() <= Date.now()) {
            throw new AppError_1.AppError('Invalid or expired token', 400);
        }
        const passwordHash = await bcrypt_1.default.hash(newPassword, 12);
        await prisma_1.prisma.$transaction([
            prisma_1.prisma.user.update({ where: { id: record.userId }, data: { passwordHash } }),
            prisma_1.prisma.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
        ]);
        res.json({ success: true });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=auth.controller.js.map