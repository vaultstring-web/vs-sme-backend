"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../middleware/authenticate");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post('/register', auth_controller_1.register);
router.post('/login', auth_controller_1.login);
router.post('/logout', authenticate_1.authenticate, auth_controller_1.logout);
router.post('/password-reset/request', auth_controller_1.requestPasswordReset);
router.post('/password-reset/confirm', auth_controller_1.confirmPasswordReset);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map