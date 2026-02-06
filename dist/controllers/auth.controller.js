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
exports.register = register;
exports.uploadUserDocumentsEndpoint = uploadUserDocumentsEndpoint;
exports.getUserDocuments = getUserDocuments;
exports.login = login;
exports.refreshToken = refreshToken;
exports.logout = logout;
exports.requestPasswordReset = requestPasswordReset;
exports.confirmPasswordReset = confirmPasswordReset;
exports.adminRegister = adminRegister;
exports.listUsers = listUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = require("../config/logger");
const prisma_1 = require("../db/prisma");
const AppError_1 = require("../utils/AppError");
const jwt_service_1 = require("../services/jwt.service");
const passwordReset_service_1 = require("../services/passwordReset.service");
const multer_1 = require("../config/multer");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
        if (!isNonEmptyString(primary)) {
            logger_1.logger.warn('Registration attempt without phones.primary');
            throw new AppError_1.AppError('phones.primary is required', 400);
        }
        return { primaryPhone: primary.trim(), secondaryPhone: isNonEmptyString(secondary) ? secondary.trim() : undefined };
    }
    const primaryPhone = body?.primaryPhone;
    const secondaryPhone = body?.secondaryPhone;
    if (!isNonEmptyString(primaryPhone)) {
        logger_1.logger.warn('Registration attempt without primaryPhone');
        throw new AppError_1.AppError('primaryPhone is required', 400);
    }
    return {
        primaryPhone: primaryPhone.trim(),
        secondaryPhone: isNonEmptyString(secondaryPhone) ? secondaryPhone.trim() : undefined,
    };
}
function parseAddresses(body) {
    if (body?.addresses && typeof body.addresses === 'object') {
        const physical = body.addresses.physical ?? body.addresses.physicalAddress;
        const postal = body.addresses.postal ?? body.addresses.postalAddress;
        if (!isNonEmptyString(physical)) {
            logger_1.logger.warn('Registration attempt without addresses.physical');
            throw new AppError_1.AppError('addresses.physical is required', 400);
        }
        return { physicalAddress: physical.trim(), postalAddress: isNonEmptyString(postal) ? postal.trim() : undefined };
    }
    const physicalAddress = body?.physicalAddress;
    const postalAddress = body?.postalAddress;
    if (!isNonEmptyString(physicalAddress)) {
        logger_1.logger.warn('Registration attempt without physicalAddress');
        throw new AppError_1.AppError('physicalAddress is required', 400);
    }
    return {
        physicalAddress: physicalAddress.trim(),
        postalAddress: isNonEmptyString(postalAddress) ? postalAddress.trim() : undefined,
    };
}
function parseNationalId(body) {
    const nationalId = body?.nationalId ?? body?.nationalIdOrPassport;
    if (!isNonEmptyString(nationalId)) {
        logger_1.logger.warn('Registration attempt without nationalId');
        throw new AppError_1.AppError('nationalId is required', 400);
    }
    return nationalId.trim();
}
function prismaErrorCode(err) {
    if (!err || typeof err !== 'object')
        return undefined;
    return typeof err.code === 'string' ? err.code : undefined;
}
// ========== PUBLIC ENDPOINTS ==========
async function processUserDocuments(userId, files, documentTypes) {
    const documentPromises = [];
    for (const [fieldName, fileArray] of Object.entries(files)) {
        for (const file of fileArray) {
            const documentType = documentTypes[fieldName] || fieldName;
            // Generate file URL (in production, upload to cloud storage)
            const fileUrl = `/uploads/${userId}/${file.filename}`;
            documentPromises.push(prisma_1.prisma.userDocument.create({
                data: {
                    userId,
                    fileName: file.originalname,
                    fileUrl,
                    documentType,
                },
            }));
        }
    }
    await Promise.all(documentPromises);
}
async function register(req, res, next) {
    const startTime = Date.now();
    // First, handle file upload using multer middleware
    // We'll use a wrapper since multer is middleware
    const uploadMiddleware = multer_1.uploadUserDocuments;
    // Since we can't use middleware directly in controller, 
    // we'll create a separate endpoint for file uploads or modify the route
    // For now, let's assume files come in as base64 or separate endpoint
    // Alternative approach: Handle files in a separate step
    try {
        const emailRaw = req.body?.email;
        const password = req.body?.password;
        const fullName = req.body?.fullName;
        logger_1.logger.info(`Registration attempt: ${emailRaw ? emailRaw : 'No email provided'}`);
        if (!isNonEmptyString(emailRaw)) {
            logger_1.logger.warn('Registration attempt without email');
            throw new AppError_1.AppError('email is required', 400);
        }
        if (!isNonEmptyString(password)) {
            logger_1.logger.warn('Registration attempt without password');
            throw new AppError_1.AppError('password is required', 400);
        }
        if (password.trim().length < 8) {
            logger_1.logger.warn('Registration attempt with password less than 8 characters');
            throw new AppError_1.AppError('password must be at least 8 characters', 400);
        }
        if (!isNonEmptyString(fullName)) {
            logger_1.logger.warn('Registration attempt without fullName');
            throw new AppError_1.AppError('fullName is required', 400);
        }
        const { primaryPhone, secondaryPhone } = parsePhones(req.body);
        const { physicalAddress, postalAddress } = parseAddresses(req.body);
        const nationalIdOrPassport = parseNationalId(req.body);
        const email = normalizeEmail(emailRaw);
        const passwordHash = await bcrypt_1.default.hash(password, 12);
        // Create user first
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
                role: 'APPLICANT',
            },
            select: {
                id: true,
                email: true,
                fullName: true,
                role: true
            },
        });
        // Process documents if any base64 files were provided
        if (req.body.documents && Array.isArray(req.body.documents)) {
            await processBase64Documents(user.id, req.body.documents);
        }
        logger_1.logger.info(`User registered successfully: ${user.id} - ${user.email}`, {
            userId: user.id,
            email: user.email,
            role: user.role,
            duration: Date.now() - startTime
        });
        res.status(201).json({
            profile: user,
            message: 'Registration successful. Please upload required documents.'
        });
    }
    catch (err) {
        const duration = Date.now() - startTime;
        if (prismaErrorCode(err) === 'P2002') {
            logger_1.logger.warn(`Email already in use during registration`, {
                email: req.body?.email,
                duration
            });
            return next(new AppError_1.AppError('Email already in use', 409));
        }
        logger_1.logger.error(`Registration failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
            error: err,
            email: req.body?.email,
            duration
        });
        next(err);
    }
}
async function processBase64Documents(userId, documents) {
    const documentPromises = documents.map(async (doc) => {
        if (!doc.base64 || !doc.fileName || !doc.documentType) {
            throw new AppError_1.AppError('Invalid document format. Each document needs base64, fileName, and documentType.', 400);
        }
        const userDir = path_1.default.join('uploads', userId);
        if (!fs_1.default.existsSync(userDir)) {
            fs_1.default.mkdirSync(userDir, { recursive: true });
        }
        // Decode base64
        const base64Data = doc.base64.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        // Determine file extension
        const ext = doc.fileName.split('.').pop() || 'bin';
        const uniqueFileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
        const filePath = path_1.default.join(userDir, uniqueFileName);
        // Save file
        fs_1.default.writeFileSync(filePath, buffer);
        // Create database record
        return prisma_1.prisma.userDocument.create({
            data: {
                userId,
                fileName: doc.fileName,
                fileUrl: `/uploads/${userId}/${uniqueFileName}`,
                documentType: doc.documentType,
            },
        });
    });
    await Promise.all(documentPromises);
}
// Add this new endpoint for document upload after registration
async function uploadUserDocumentsEndpoint(req, res, next) {
    const startTime = Date.now();
    try {
        if (!req.user) {
            throw new AppError_1.AppError('Unauthorized', 401);
        }
        const files = req.files;
        if (!files || Object.keys(files).length === 0) {
            throw new AppError_1.AppError('No files uploaded', 400);
        }
        // Define document type mapping
        const documentTypes = {
            nationalIdFront: 'NATIONAL_ID_FRONT',
            nationalIdBack: 'NATIONAL_ID_BACK',
            profilePicture: 'PROFILE_PICTURE',
            proofOfAddress: 'PROOF_OF_ADDRESS',
            additionalDocuments: 'ADDITIONAL_DOCUMENT',
        };
        await processUserDocuments(req.user.id, files, documentTypes);
        logger_1.logger.info(`User documents uploaded successfully for user: ${req.user.id}`, {
            userId: req.user.id,
            fileCount: Object.values(files).flat().length,
            duration: Date.now() - startTime
        });
        res.json({
            success: true,
            message: 'Documents uploaded successfully',
            uploadedFiles: Object.keys(files)
        });
    }
    catch (err) {
        logger_1.logger.error(`Document upload failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
            error: err,
            userId: req.user?.id,
            duration: Date.now() - startTime
        });
        next(err);
    }
}
// Add this endpoint to get user documents
async function getUserDocuments(req, res, next) {
    const startTime = Date.now();
    try {
        // Get userId from params or authenticated user
        let userId;
        if (req.params.id) {
            // Handle case where id might be string or array
            if (Array.isArray(req.params.id)) {
                userId = req.params.id[0]; // Take first element if it's an array
            }
            else {
                userId = req.params.id;
            }
        }
        else {
            userId = req.user?.id;
        }
        if (!userId) {
            throw new AppError_1.AppError('User ID required', 400);
        }
        // Validate userId is a valid UUID format (optional but good practice)
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(userId)) {
            throw new AppError_1.AppError('Invalid user ID format', 400);
        }
        const documents = await prisma_1.prisma.userDocument.findMany({
            where: {
                userId: userId // TypeScript now knows this is a string
            },
            select: {
                id: true,
                fileName: true,
                fileUrl: true,
                documentType: true,
                uploadedAt: true,
                isVerified: true,
                verifiedAt: true,
            },
            orderBy: { uploadedAt: 'desc' }
        });
        logger_1.logger.info(`Retrieved documents for user: ${userId}`, {
            userId,
            documentCount: documents.length,
            duration: Date.now() - startTime
        });
        res.json({ documents });
    }
    catch (err) {
        logger_1.logger.error(`Get user documents failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
            error: err,
            userId: req.params.id || req.user?.id,
            duration: Date.now() - startTime
        });
        next(err);
    }
}
async function login(req, res, next) {
    const startTime = Date.now();
    try {
        const emailRaw = req.body?.email;
        const password = req.body?.password;
        logger_1.logger.http(`Login attempt: ${emailRaw || 'No email provided'}`);
        if (!isNonEmptyString(emailRaw)) {
            logger_1.logger.warn('Login attempt without email');
            throw new AppError_1.AppError('email is required', 400);
        }
        if (!isNonEmptyString(password)) {
            logger_1.logger.warn('Login attempt without password');
            throw new AppError_1.AppError('password is required', 400);
        }
        const email = normalizeEmail(emailRaw);
        const user = await prisma_1.prisma.user.findUnique({
            where: { email },
            select: { id: true, email: true, fullName: true, role: true, passwordHash: true },
        });
        if (!user) {
            logger_1.logger.warn(`Login failed: User not found for email ${email}`);
            throw new AppError_1.AppError('Invalid credentials', 401);
        }
        const ok = await bcrypt_1.default.compare(password, user.passwordHash);
        if (!ok) {
            logger_1.logger.warn(`Login failed: Invalid password for user ${user.id} (${email})`);
            throw new AppError_1.AppError('Invalid credentials', 401);
        }
        const { token: accessToken, jti: accessJti } = (0, jwt_service_1.signAccessToken)({
            id: user.id,
            email: user.email,
            role: user.role
        });
        const { token: refreshToken, jti: refreshJti } = (0, jwt_service_1.signRefreshToken)(user.id);
        logger_1.logger.info(`User logged in successfully: ${user.id} - ${user.email}`, {
            userId: user.id,
            email: user.email,
            role: user.role,
            accessJti,
            refreshJti,
            duration: Date.now() - startTime
        });
        res.json({
            accessToken,
            refreshToken,
            profile: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                role: user.role
            },
        });
    }
    catch (err) {
        logger_1.logger.error(`Login failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
            error: err,
            email: req.body?.email,
            duration: Date.now() - startTime
        });
        next(err);
    }
}
async function refreshToken(req, res, next) {
    const startTime = Date.now();
    try {
        const refreshToken = req.body?.refreshToken;
        logger_1.logger.http('Refresh token attempt');
        if (!isNonEmptyString(refreshToken)) {
            logger_1.logger.warn('Refresh token attempt without token');
            throw new AppError_1.AppError('refreshToken is required', 400);
        }
        const { verifyRefreshToken } = await Promise.resolve().then(() => __importStar(require('../services/jwt.service')));
        const payload = verifyRefreshToken(refreshToken);
        const denylisted = await prisma_1.prisma.denylistedToken.findUnique({
            where: { jti: payload.jti },
        });
        if (denylisted) {
            logger_1.logger.warn(`Refresh token revoked: ${payload.jti}`);
            throw new AppError_1.AppError('Refresh token revoked', 401);
        }
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: payload.sub },
            select: { id: true, email: true, role: true },
        });
        if (!user) {
            logger_1.logger.warn(`Refresh token failed: User not found ${payload.sub}`);
            throw new AppError_1.AppError('User not found', 401);
        }
        const { token: newAccessToken, jti: newAccessJti } = (0, jwt_service_1.signAccessToken)({
            id: user.id,
            email: user.email,
            role: user.role,
        });
        logger_1.logger.info(`Token refreshed successfully for user: ${user.id}`, {
            userId: user.id,
            oldJti: payload.jti,
            newAccessJti,
            duration: Date.now() - startTime
        });
        res.json({
            accessToken: newAccessToken,
            profile: { id: user.id, email: user.email, role: user.role },
        });
    }
    catch (err) {
        logger_1.logger.error(`Token refresh failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
            error: err,
            duration: Date.now() - startTime
        });
        next(err);
    }
}
async function logout(req, res, next) {
    const startTime = Date.now();
    try {
        if (!req.user) {
            logger_1.logger.warn('Logout attempt without authentication');
            throw new AppError_1.AppError('Unauthorized', 401);
        }
        // Revoke refresh token if provided
        const refreshToken = req.body?.refreshToken;
        if (refreshToken && isNonEmptyString(refreshToken)) {
            try {
                const { verifyRefreshToken } = await Promise.resolve().then(() => __importStar(require('../services/jwt.service')));
                const payload = verifyRefreshToken(refreshToken);
                // Add refresh token to denylist
                await prisma_1.prisma.denylistedToken.create({
                    data: {
                        jti: payload.jti,
                        userId: req.user.id,
                        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    },
                });
                logger_1.logger.info(`Refresh token revoked during logout: ${payload.jti}`);
            }
            catch (err) {
                // If refresh token is invalid, just log and continue
                logger_1.logger.warn('Invalid refresh token provided during logout, continuing with access token revocation');
            }
        }
        // Revoke access token
        const expiresAt = getJwtExpiresAt(req.user.token);
        await prisma_1.prisma.denylistedToken.upsert({
            where: { jti: req.user.jti },
            create: { jti: req.user.jti, userId: req.user.id, expiresAt },
            update: { expiresAt },
        });
        logger_1.logger.info(`User logged out: ${req.user.id}`, {
            userId: req.user.id,
            email: req.user.email,
            jti: req.user.jti,
            duration: Date.now() - startTime
        });
        res.json({ success: true });
    }
    catch (err) {
        logger_1.logger.error(`Logout failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
            error: err,
            userId: req.user?.id,
            duration: Date.now() - startTime
        });
        next(err);
    }
}
async function requestPasswordReset(req, res, next) {
    const startTime = Date.now();
    try {
        const emailRaw = req.body?.email;
        logger_1.logger.http(`Password reset request for: ${emailRaw || 'No email provided'}`);
        if (!isNonEmptyString(emailRaw)) {
            logger_1.logger.warn('Password reset request without email');
            throw new AppError_1.AppError('email is required', 400);
        }
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
            logger_1.logger.info(`Password reset token generated for user: ${user.id}`, {
                userId: user.id,
                email,
                expiresAt,
                duration: Date.now() - startTime
            });
        }
        else {
            logger_1.logger.warn(`Password reset request for non-existent email: ${email}`);
        }
        res.json({
            success: true,
            message: 'If an account exists for that email, a password reset token has been issued.',
            ...(resetToken ? { token: resetToken } : {}),
        });
    }
    catch (err) {
        logger_1.logger.error(`Password reset request failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
            error: err,
            email: req.body?.email,
            duration: Date.now() - startTime
        });
        next(err);
    }
}
async function confirmPasswordReset(req, res, next) {
    const startTime = Date.now();
    try {
        const token = req.body?.token;
        const newPassword = req.body?.newPassword;
        logger_1.logger.http('Password reset confirmation attempt');
        if (!isNonEmptyString(token)) {
            logger_1.logger.warn('Password reset confirmation without token');
            throw new AppError_1.AppError('token is required', 400);
        }
        if (!isNonEmptyString(newPassword)) {
            logger_1.logger.warn('Password reset confirmation without newPassword');
            throw new AppError_1.AppError('newPassword is required', 400);
        }
        if (newPassword.trim().length < 8) {
            logger_1.logger.warn('Password reset confirmation with password less than 8 characters');
            throw new AppError_1.AppError('newPassword must be at least 8 characters', 400);
        }
        const tokenHash = (0, passwordReset_service_1.hashPasswordResetToken)(token.trim());
        const record = await prisma_1.prisma.passwordResetToken.findUnique({
            where: { tokenHash },
            select: { id: true, userId: true, expiresAt: true, usedAt: true },
        });
        if (!record || record.usedAt || record.expiresAt.getTime() <= Date.now()) {
            logger_1.logger.warn(`Invalid or expired password reset token attempted`);
            throw new AppError_1.AppError('Invalid or expired token', 400);
        }
        const passwordHash = await bcrypt_1.default.hash(newPassword, 12);
        await prisma_1.prisma.$transaction([
            prisma_1.prisma.user.update({ where: { id: record.userId }, data: { passwordHash } }),
            prisma_1.prisma.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
        ]);
        logger_1.logger.info(`Password reset completed for user: ${record.userId}`, {
            userId: record.userId,
            resetTokenId: record.id,
            duration: Date.now() - startTime
        });
        res.json({ success: true });
    }
    catch (err) {
        logger_1.logger.error(`Password reset confirmation failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
            error: err,
            duration: Date.now() - startTime
        });
        next(err);
    }
}
// ========== ADMIN-ONLY ENDPOINTS ==========
async function adminRegister(req, res, next) {
    const startTime = Date.now();
    try {
        const emailRaw = req.body?.email;
        const password = req.body?.password;
        const fullName = req.body?.fullName;
        const role = req.body?.role;
        logger_1.logger.info(`Admin registration attempt by ${req.user?.id} for email: ${emailRaw}`);
        if (!isNonEmptyString(emailRaw)) {
            logger_1.logger.warn('Admin registration attempt without email');
            throw new AppError_1.AppError('email is required', 400);
        }
        if (!isNonEmptyString(password)) {
            logger_1.logger.warn('Admin registration attempt without password');
            throw new AppError_1.AppError('password is required', 400);
        }
        if (password.trim().length < 8) {
            logger_1.logger.warn('Admin registration attempt with password less than 8 characters');
            throw new AppError_1.AppError('password must be at least 8 characters', 400);
        }
        if (!isNonEmptyString(fullName)) {
            logger_1.logger.warn('Admin registration attempt without fullName');
            throw new AppError_1.AppError('fullName is required', 400);
        }
        if (!role || !['ADMIN_TIER1', 'ADMIN_TIER2', 'APPLICANT'].includes(role)) {
            logger_1.logger.warn(`Admin registration attempt with invalid role: ${role}`);
            throw new AppError_1.AppError('Invalid role. Must be ADMIN_TIER1, ADMIN_TIER2, or APPLICANT', 400);
        }
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
                role,
            },
            select: { id: true, email: true, fullName: true, role: true, createdAt: true },
        });
        logger_1.logger.info(`Admin created user successfully: ${user.id} - ${user.email}`, {
            createdBy: req.user?.id,
            newUserId: user.id,
            newUserEmail: user.email,
            newUserRole: user.role,
            duration: Date.now() - startTime
        });
        res.status(201).json({
            message: 'User created successfully',
            user
        });
    }
    catch (err) {
        const duration = Date.now() - startTime;
        if (prismaErrorCode(err) === 'P2002') {
            logger_1.logger.warn(`Admin registration failed: Email already in use`, {
                email: req.body?.email,
                createdBy: req.user?.id,
                duration
            });
            return next(new AppError_1.AppError('Email already in use', 409));
        }
        logger_1.logger.error(`Admin registration failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
            error: err,
            email: req.body?.email,
            createdBy: req.user?.id,
            duration
        });
        next(err);
    }
}
async function listUsers(req, res, next) {
    const startTime = Date.now();
    try {
        const { page = '1', limit = '10', role, search } = req.query;
        logger_1.logger.http(`List users request by ${req.user?.id}`, {
            page, limit, role, search
        });
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 10;
        const skip = (pageNum - 1) * limitNum;
        const where = {};
        if (role && ['APPLICANT', 'ADMIN_TIER1', 'ADMIN_TIER2'].includes(role)) {
            where.role = role;
        }
        if (search && typeof search === 'string') {
            where.OR = [
                { email: { contains: search, mode: 'insensitive' } },
                { fullName: { contains: search, mode: 'insensitive' } },
                { nationalIdOrPassport: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [users, total] = await Promise.all([
            prisma_1.prisma.user.findMany({
                where,
                select: {
                    id: true,
                    email: true,
                    fullName: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limitNum,
            }),
            prisma_1.prisma.user.count({ where }),
        ]);
        logger_1.logger.info(`Users listed successfully`, {
            requestedBy: req.user?.id,
            page: pageNum,
            limit: limitNum,
            totalUsers: total,
            filteredCount: users.length,
            duration: Date.now() - startTime
        });
        res.json({
            users,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                pages: Math.ceil(total / limitNum),
            },
        });
    }
    catch (err) {
        logger_1.logger.error(`List users failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
            error: err,
            requestedBy: req.user?.id,
            duration: Date.now() - startTime
        });
        next(err);
    }
}
async function getUser(req, res, next) {
    const startTime = Date.now();
    try {
        const { id } = req.params;
        logger_1.logger.http(`Get user request by ${req.user?.id} for user ${id}`);
        if (typeof id !== 'string') {
            logger_1.logger.warn(`Invalid ID parameter: ${id}`);
            throw new AppError_1.AppError('Invalid ID parameter', 400);
        }
        const user = await prisma_1.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                fullName: true,
                nationalIdOrPassport: true,
                primaryPhone: true,
                secondaryPhone: true,
                physicalAddress: true,
                postalAddress: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                applications: {
                    select: {
                        id: true,
                        type: true,
                        status: true,
                        createdAt: true,
                    },
                },
            },
        });
        if (!user) {
            logger_1.logger.warn(`User not found: ${id} requested by ${req.user?.id}`);
            throw new AppError_1.AppError('User not found', 404);
        }
        logger_1.logger.info(`User details retrieved: ${id}`, {
            requestedBy: req.user?.id,
            targetUser: id,
            duration: Date.now() - startTime
        });
        res.json({ user });
    }
    catch (err) {
        logger_1.logger.error(`Get user failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
            error: err,
            requestedBy: req.user?.id,
            targetUser: req.params.id,
            duration: Date.now() - startTime
        });
        next(err);
    }
}
async function updateUser(req, res, next) {
    const startTime = Date.now();
    try {
        const { id } = req.params;
        logger_1.logger.info(`Update user request by ${req.user?.id} for user ${id}`, {
            updates: req.body
        });
        if (typeof id !== 'string') {
            logger_1.logger.warn(`Invalid ID parameter: ${id}`);
            throw new AppError_1.AppError('Invalid ID parameter', 400);
        }
        const updates = {};
        if (req.body.fullName && isNonEmptyString(req.body.fullName)) {
            updates.fullName = req.body.fullName.trim();
        }
        if (req.body.primaryPhone && isNonEmptyString(req.body.primaryPhone)) {
            updates.primaryPhone = req.body.primaryPhone.trim();
        }
        if (req.body.secondaryPhone !== undefined) {
            updates.secondaryPhone = isNonEmptyString(req.body.secondaryPhone)
                ? req.body.secondaryPhone.trim()
                : null;
        }
        if (req.body.physicalAddress && isNonEmptyString(req.body.physicalAddress)) {
            updates.physicalAddress = req.body.physicalAddress.trim();
        }
        if (req.body.postalAddress !== undefined) {
            updates.postalAddress = isNonEmptyString(req.body.postalAddress)
                ? req.body.postalAddress.trim()
                : null;
        }
        if (req.body.role && req.user?.role === 'ADMIN_TIER2') {
            if (['ADMIN_TIER1', 'APPLICANT'].includes(req.body.role)) {
                updates.role = req.body.role;
                logger_1.logger.info(`Role update attempted by ADMIN_TIER2 ${req.user.id} for user ${id}: ${req.body.role}`);
            }
        }
        const user = await prisma_1.prisma.user.update({
            where: { id },
            data: updates,
            select: {
                id: true,
                email: true,
                fullName: true,
                role: true,
                updatedAt: true,
            },
        });
        logger_1.logger.info(`User updated successfully: ${id}`, {
            updatedBy: req.user?.id,
            targetUser: id,
            updates,
            duration: Date.now() - startTime
        });
        res.json({
            message: 'User updated successfully',
            user
        });
    }
    catch (err) {
        if (prismaErrorCode(err) === 'P2025') {
            logger_1.logger.warn(`Update user failed: User not found ${req.params.id}`, {
                updatedBy: req.user?.id,
                duration: Date.now() - startTime
            });
            return next(new AppError_1.AppError('User not found', 404));
        }
        logger_1.logger.error(`Update user failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
            error: err,
            updatedBy: req.user?.id,
            targetUser: req.params.id,
            duration: Date.now() - startTime
        });
        next(err);
    }
}
async function deleteUser(req, res, next) {
    const startTime = Date.now();
    try {
        const { id } = req.params;
        logger_1.logger.warn(`Delete user request by ${req.user?.id} for user ${id}`);
        if (typeof id !== 'string') {
            logger_1.logger.warn(`Invalid ID parameter: ${id}`);
            throw new AppError_1.AppError('Invalid ID parameter', 400);
        }
        if (req.user?.id === id) {
            logger_1.logger.warn(`Self-deletion attempt prevented: ${req.user.id}`);
            throw new AppError_1.AppError('Cannot delete your own account', 400);
        }
        await prisma_1.prisma.user.delete({
            where: { id },
        });
        logger_1.logger.warn(`User deleted: ${id}`, {
            deletedBy: req.user?.id,
            targetUser: id,
            duration: Date.now() - startTime
        });
        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    }
    catch (err) {
        if (prismaErrorCode(err) === 'P2025') {
            logger_1.logger.warn(`Delete user failed: User not found ${req.params.id}`, {
                deletedBy: req.user?.id,
                duration: Date.now() - startTime
            });
            return next(new AppError_1.AppError('User not found', 404));
        }
        logger_1.logger.error(`Delete user failed: ${err instanceof Error ? err.message : 'Unknown error'}`, {
            error: err,
            deletedBy: req.user?.id,
            targetUser: req.params.id,
            duration: Date.now() - startTime
        });
        next(err);
    }
}
//# sourceMappingURL=auth.controller.js.map