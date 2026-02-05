"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../middleware/authenticate");
const applications_controller_1 = require("../controllers/applications.controller");
const router = (0, express_1.Router)();
router.post('/applications/sme', authenticate_1.authenticate, applications_controller_1.validateSmePayload, applications_controller_1.createSmeApplication);
router.post('/applications/payroll', authenticate_1.authenticate, applications_controller_1.validatePayrollPayload, applications_controller_1.createPayrollApplication);
router.patch('/applications/:id/draft', authenticate_1.authenticate, applications_controller_1.validateDraftPayload, applications_controller_1.saveDraftApplication);
router.post('/applications/:id/documents', authenticate_1.authenticate, applications_controller_1.validateDocumentPayload, applications_controller_1.uploadDocument);
router.patch('/applications/:id/submit', authenticate_1.authenticate, applications_controller_1.submitApplication);
router.get('/applications/_ping', (_req, res) => res.json({ ok: true }));
exports.default = router;
//# sourceMappingURL=applications.routes.js.map