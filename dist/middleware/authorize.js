"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireApplicant = exports.requireAdmin = exports.requireAdminTier2 = exports.requireAdminTier1 = void 0;
exports.requireRole = requireRole;
const AppError_1 = require("../utils/AppError");
function requireRole(allowedRoles) {
    return (req, _res, next) => {
        if (!req.user) {
            throw new AppError_1.AppError('Authentication required', 401);
        }
        if (!allowedRoles.includes(req.user.role)) {
            throw new AppError_1.AppError(`Access denied. Required roles: ${allowedRoles.join(', ')}`, 403);
        }
        next();
    };
}
// Convenience middleware for common role checks
exports.requireAdminTier1 = requireRole(['ADMIN_TIER1']);
exports.requireAdminTier2 = requireRole(['ADMIN_TIER2']);
exports.requireAdmin = requireRole(['ADMIN_TIER1', 'ADMIN_TIER2']);
exports.requireApplicant = requireRole(['APPLICANT']);
//# sourceMappingURL=authorize.js.map