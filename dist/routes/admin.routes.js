"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../middleware/authenticate");
const requireRole_1 = require("../middleware/requireRole");
const router = (0, express_1.Router)();
// Protect all routes with authentication
router.use(authenticate_1.authenticate);
// Admin-only dashboard or check
router.get('/dashboard', (0, requireRole_1.requireRole)(['ADMIN_TIER1', 'ADMIN_TIER2']), (req, res) => {
    res.json({
        message: 'Welcome to the admin dashboard',
        user: req.user,
    });
});
exports.default = router;
//# sourceMappingURL=admin.routes.js.map