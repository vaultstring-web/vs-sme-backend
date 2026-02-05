"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../middleware/authenticate");
const authorize_1 = require("../middleware/authorize");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
// ========== PUBLIC ROUTES ==========
router.post('/register', auth_controller_1.register);
router.post('/login', auth_controller_1.login);
router.post('/refresh-token', auth_controller_1.refreshToken);
router.post('/password-reset/request', auth_controller_1.requestPasswordReset);
router.post('/password-reset/confirm', auth_controller_1.confirmPasswordReset);
// ========== PROTECTED ROUTES (Require Authentication) ==========
router.post('/logout', authenticate_1.authenticate, auth_controller_1.logout);
// ========== ADMIN ROUTES ==========
// User management (Admin Tier 1+)
router.post('/admin/register', authenticate_1.authenticate, authorize_1.requireAdminTier1, auth_controller_1.adminRegister);
router.get('/admin/users', authenticate_1.authenticate, authorize_1.requireAdmin, auth_controller_1.listUsers);
router.get('/admin/users/:id', authenticate_1.authenticate, authorize_1.requireAdmin, auth_controller_1.getUser);
// User updates (Admin Tier 1+ for basic updates, Tier 2 for role changes)
router.patch('/admin/users/:id', authenticate_1.authenticate, authorize_1.requireAdminTier1, auth_controller_1.updateUser);
// User deletion (Admin Tier 2 only - more sensitive)
router.delete('/admin/users/:id', authenticate_1.authenticate, authorize_1.requireAdminTier2, auth_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map