"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = requireRole;
const AppError_1 = require("../utils/AppError");
function normalizeRole(role) {
    return role.trim().replace(/-/g, '_').toUpperCase();
}
function requireRole(allowedRoles) {
    const allowed = new Set(allowedRoles.map(normalizeRole));
    return (req, _res, next) => {
        try {
            if (!req.user)
                throw new AppError_1.AppError('Unauthorized', 401);
            const role = normalizeRole(req.user.role);
            if (!allowed.has(role))
                throw new AppError_1.AppError('Forbidden', 403);
            next();
        }
        catch (err) {
            next(err);
        }
    };
}
//# sourceMappingURL=requireRole.js.map