"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSmePayload = validateSmePayload;
exports.validatePayrollPayload = validatePayrollPayload;
exports.validateDocumentPayload = validateDocumentPayload;
exports.validateDraftPayload = validateDraftPayload;
exports.createSmeApplication = createSmeApplication;
exports.createPayrollApplication = createPayrollApplication;
exports.saveDraftApplication = saveDraftApplication;
exports.uploadDocument = uploadDocument;
exports.submitApplication = submitApplication;
const prisma_1 = require("../db/prisma");
const AppError_1 = require("../utils/AppError");
function isNonEmptyString(v) {
    return typeof v === 'string' && v.trim().length > 0;
}
function isNumber(v) {
    return typeof v === 'number' && Number.isFinite(v);
}
function isBoolean(v) {
    return typeof v === 'boolean';
}
function validateSmePayload(req, _res, next) {
    const b = req.body ?? {};
    if (!isNonEmptyString(b.businessName))
        return next(new AppError_1.AppError('businessName is required', 400));
    if (b.registrationNo != null && !isNonEmptyString(b.registrationNo))
        return next(new AppError_1.AppError('registrationNo must be string', 400));
    if (!isNonEmptyString(b.businessType))
        return next(new AppError_1.AppError('businessType is required', 400));
    if (!isNumber(b.yearsInOperation))
        return next(new AppError_1.AppError('yearsInOperation must be number', 400));
    if (!isNonEmptyString(b.loanProduct))
        return next(new AppError_1.AppError('loanProduct is required', 400));
    if (!isNumber(b.loanAmount))
        return next(new AppError_1.AppError('loanAmount must be number', 400));
    if (!isNumber(b.paybackPeriodMonths))
        return next(new AppError_1.AppError('paybackPeriodMonths must be number', 400));
    if (!isNonEmptyString(b.purposeOfLoan))
        return next(new AppError_1.AppError('purposeOfLoan is required', 400));
    if (!isNonEmptyString(b.repaymentMethod))
        return next(new AppError_1.AppError('repaymentMethod is required', 400));
    if (b.estimatedMonthlyTurnover != null && !isNumber(b.estimatedMonthlyTurnover))
        return next(new AppError_1.AppError('estimatedMonthlyTurnover must be number', 400));
    if (b.estimatedMonthlyProfit != null && !isNumber(b.estimatedMonthlyProfit))
        return next(new AppError_1.AppError('estimatedMonthlyProfit must be number', 400));
    if (b.groupName != null && !isNonEmptyString(b.groupName))
        return next(new AppError_1.AppError('groupName must be string', 400));
    if (b.groupMemberCount != null && !isNumber(b.groupMemberCount))
        return next(new AppError_1.AppError('groupMemberCount must be number', 400));
    if (!isBoolean(b.hasOutstandingLoans))
        return next(new AppError_1.AppError('hasOutstandingLoans must be boolean', 400));
    if (b.outstandingLoanDetails != null && !isNonEmptyString(b.outstandingLoanDetails))
        return next(new AppError_1.AppError('outstandingLoanDetails must be string', 400));
    if (!isBoolean(b.hasDefaulted))
        return next(new AppError_1.AppError('hasDefaulted must be boolean', 400));
    if (b.defaultExplanation != null && !isNonEmptyString(b.defaultExplanation))
        return next(new AppError_1.AppError('defaultExplanation must be string', 400));
    next();
}
function validatePayrollPayload(req, _res, next) {
    const b = req.body ?? {};
    if (!isNonEmptyString(b.gender))
        return next(new AppError_1.AppError('gender is required', 400));
    if (!isNonEmptyString(b.maritalStatus))
        return next(new AppError_1.AppError('maritalStatus is required', 400));
    if (!isNonEmptyString(b.nextOfKinName))
        return next(new AppError_1.AppError('nextOfKinName is required', 400));
    if (!isNonEmptyString(b.nextOfKinRelationship))
        return next(new AppError_1.AppError('nextOfKinRelationship is required', 400));
    if (!isNonEmptyString(b.nextOfKinPhone))
        return next(new AppError_1.AppError('nextOfKinPhone is required', 400));
    if (!isNumber(b.loanAmount))
        return next(new AppError_1.AppError('loanAmount must be number', 400));
    if (!isNumber(b.paybackPeriodMonths))
        return next(new AppError_1.AppError('paybackPeriodMonths must be number', 400));
    if (!isNonEmptyString(b.employerName))
        return next(new AppError_1.AppError('employerName is required', 400));
    if (!isNonEmptyString(b.employerAddress))
        return next(new AppError_1.AppError('employerAddress is required', 400));
    if (!isNonEmptyString(b.jobTitle))
        return next(new AppError_1.AppError('jobTitle is required', 400));
    if (!isNonEmptyString(b.employeeNumber))
        return next(new AppError_1.AppError('employeeNumber is required', 400));
    if (!isNonEmptyString(b.dateOfBirth))
        return next(new AppError_1.AppError('dateOfBirth is required (ISO string)', 400));
    if (!isNonEmptyString(b.dateOfEmployment))
        return next(new AppError_1.AppError('dateOfEmployment is required (ISO string)', 400));
    if (!isNumber(b.grossMonthlySalary))
        return next(new AppError_1.AppError('grossMonthlySalary must be number', 400));
    if (!isNumber(b.netMonthlySalary))
        return next(new AppError_1.AppError('netMonthlySalary must be number', 400));
    if (!isBoolean(b.payrollDeductionConfirmed))
        return next(new AppError_1.AppError('payrollDeductionConfirmed must be boolean', 400));
    if (!isBoolean(b.hasOutstandingLoans))
        return next(new AppError_1.AppError('hasOutstandingLoans must be boolean', 400));
    if (b.outstandingLoanDetails != null && !isNonEmptyString(b.outstandingLoanDetails))
        return next(new AppError_1.AppError('outstandingLoanDetails must be string', 400));
    if (!isBoolean(b.hasDefaulted))
        return next(new AppError_1.AppError('hasDefaulted must be boolean', 400));
    if (b.defaultExplanation != null && !isNonEmptyString(b.defaultExplanation))
        return next(new AppError_1.AppError('defaultExplanation must be string', 400));
    next();
}
function validateDocumentPayload(req, _res, next) {
    const b = req.body ?? {};
    if (!isNonEmptyString(b.fileName))
        return next(new AppError_1.AppError('fileName is required', 400));
    if (!isNonEmptyString(b.fileUrl))
        return next(new AppError_1.AppError('fileUrl is required', 400));
    if (!isNonEmptyString(b.documentType))
        return next(new AppError_1.AppError('documentType is required', 400));
    next();
}
function validateDraftPayload(req, _res, next) {
    next();
}
function ensureOwner(app, userId) {
    if (app.userId !== userId)
        throw new AppError_1.AppError('Forbidden', 403);
}
async function createSmeApplication(req, res, next) {
    try {
        if (!req.user)
            throw new AppError_1.AppError('Unauthorized', 401);
        const userId = req.user.id;
        const app = await prisma_1.prisma.$transaction(async (tx) => {
            const created = await tx.application.create({
                data: { userId, type: 'SME', status: 'DRAFT' },
                select: { id: true, userId: true, type: true, status: true, createdAt: true },
            });
            await tx.smeApplicationData.create({
                data: {
                    applicationId: created.id,
                    businessName: req.body.businessName,
                    registrationNo: req.body.registrationNo ?? null,
                    businessType: req.body.businessType,
                    yearsInOperation: req.body.yearsInOperation,
                    loanProduct: req.body.loanProduct,
                    loanAmount: req.body.loanAmount,
                    paybackPeriodMonths: req.body.paybackPeriodMonths,
                    purposeOfLoan: req.body.purposeOfLoan,
                    repaymentMethod: req.body.repaymentMethod,
                    estimatedMonthlyTurnover: req.body.estimatedMonthlyTurnover ?? null,
                    estimatedMonthlyProfit: req.body.estimatedMonthlyProfit ?? null,
                    groupName: req.body.groupName ?? null,
                    groupMemberCount: req.body.groupMemberCount ?? null,
                    hasOutstandingLoans: req.body.hasOutstandingLoans,
                    outstandingLoanDetails: req.body.outstandingLoanDetails ?? null,
                    hasDefaulted: req.body.hasDefaulted,
                    defaultExplanation: req.body.defaultExplanation ?? null,
                },
            });
            return created;
        });
        res.status(201).json({ success: true, data: app });
    }
    catch (err) {
        next(err);
    }
}
async function createPayrollApplication(req, res, next) {
    try {
        if (!req.user)
            throw new AppError_1.AppError('Unauthorized', 401);
        const userId = req.user.id;
        const app = await prisma_1.prisma.$transaction(async (tx) => {
            const created = await tx.application.create({
                data: { userId, type: 'PAYROLL', status: 'DRAFT' },
                select: { id: true, userId: true, type: true, status: true, createdAt: true },
            });
            await tx.payrollApplicationData.create({
                data: {
                    applicationId: created.id,
                    dateOfBirth: new Date(req.body.dateOfBirth),
                    gender: req.body.gender,
                    maritalStatus: req.body.maritalStatus,
                    nextOfKinName: req.body.nextOfKinName,
                    nextOfKinRelationship: req.body.nextOfKinRelationship,
                    nextOfKinPhone: req.body.nextOfKinPhone,
                    loanAmount: req.body.loanAmount,
                    paybackPeriodMonths: req.body.paybackPeriodMonths,
                    employerName: req.body.employerName,
                    employerAddress: req.body.employerAddress,
                    jobTitle: req.body.jobTitle,
                    employeeNumber: req.body.employeeNumber,
                    dateOfEmployment: new Date(req.body.dateOfEmployment),
                    grossMonthlySalary: req.body.grossMonthlySalary,
                    netMonthlySalary: req.body.netMonthlySalary,
                    payrollDeductionConfirmed: req.body.payrollDeductionConfirmed,
                    hasOutstandingLoans: req.body.hasOutstandingLoans,
                    outstandingLoanDetails: req.body.outstandingLoanDetails ?? null,
                    hasDefaulted: req.body.hasDefaulted,
                    defaultExplanation: req.body.defaultExplanation ?? null,
                },
            });
            return created;
        });
        res.status(201).json({ success: true, data: app });
    }
    catch (err) {
        next(err);
    }
}
async function saveDraftApplication(req, res, next) {
    try {
        if (!req.user)
            throw new AppError_1.AppError('Unauthorized', 401);
        const userId = req.user.id;
        const id = String(req.params.id);
        if (!isNonEmptyString(id))
            throw new AppError_1.AppError('Invalid id', 400);
        const app = await prisma_1.prisma.application.findUnique({ where: { id }, select: { id: true, userId: true, type: true, status: true } });
        if (!app)
            throw new AppError_1.AppError('Not found', 404);
        ensureOwner(app, userId);
        if (app.status !== 'DRAFT')
            throw new AppError_1.AppError('Only DRAFT applications can be updated', 400);
        if (app.type === 'SME') {
            await prisma_1.prisma.smeApplicationData.update({
                where: { applicationId: app.id },
                data: {
                    businessName: req.body.businessName ?? undefined,
                    registrationNo: req.body.registrationNo ?? undefined,
                    businessType: req.body.businessType ?? undefined,
                    yearsInOperation: req.body.yearsInOperation ?? undefined,
                    loanProduct: req.body.loanProduct ?? undefined,
                    loanAmount: req.body.loanAmount ?? undefined,
                    paybackPeriodMonths: req.body.paybackPeriodMonths ?? undefined,
                    purposeOfLoan: req.body.purposeOfLoan ?? undefined,
                    repaymentMethod: req.body.repaymentMethod ?? undefined,
                    estimatedMonthlyTurnover: req.body.estimatedMonthlyTurnover ?? undefined,
                    estimatedMonthlyProfit: req.body.estimatedMonthlyProfit ?? undefined,
                    groupName: req.body.groupName ?? undefined,
                    groupMemberCount: req.body.groupMemberCount ?? undefined,
                    hasOutstandingLoans: req.body.hasOutstandingLoans ?? undefined,
                    outstandingLoanDetails: req.body.outstandingLoanDetails ?? undefined,
                    hasDefaulted: req.body.hasDefaulted ?? undefined,
                    defaultExplanation: req.body.defaultExplanation ?? undefined,
                },
            });
        }
        else {
            await prisma_1.prisma.payrollApplicationData.update({
                where: { applicationId: app.id },
                data: {
                    dateOfBirth: req.body.dateOfBirth ? new Date(req.body.dateOfBirth) : undefined,
                    gender: req.body.gender ?? undefined,
                    maritalStatus: req.body.maritalStatus ?? undefined,
                    nextOfKinName: req.body.nextOfKinName ?? undefined,
                    nextOfKinRelationship: req.body.nextOfKinRelationship ?? undefined,
                    nextOfKinPhone: req.body.nextOfKinPhone ?? undefined,
                    loanAmount: req.body.loanAmount ?? undefined,
                    paybackPeriodMonths: req.body.paybackPeriodMonths ?? undefined,
                    employerName: req.body.employerName ?? undefined,
                    employerAddress: req.body.employerAddress ?? undefined,
                    jobTitle: req.body.jobTitle ?? undefined,
                    employeeNumber: req.body.employeeNumber ?? undefined,
                    dateOfEmployment: req.body.dateOfEmployment ? new Date(req.body.dateOfEmployment) : undefined,
                    grossMonthlySalary: req.body.grossMonthlySalary ?? undefined,
                    netMonthlySalary: req.body.netMonthlySalary ?? undefined,
                    payrollDeductionConfirmed: req.body.payrollDeductionConfirmed ?? undefined,
                    hasOutstandingLoans: req.body.hasOutstandingLoans ?? undefined,
                    outstandingLoanDetails: req.body.outstandingLoanDetails ?? undefined,
                    hasDefaulted: req.body.hasDefaulted ?? undefined,
                    defaultExplanation: req.body.defaultExplanation ?? undefined,
                },
            });
        }
        res.json({ success: true });
    }
    catch (err) {
        next(err);
    }
}
async function uploadDocument(req, res, next) {
    try {
        if (!req.user)
            throw new AppError_1.AppError('Unauthorized', 401);
        const userId = req.user.id;
        const id = String(req.params.id);
        if (!isNonEmptyString(id))
            throw new AppError_1.AppError('Invalid id', 400);
        const app = await prisma_1.prisma.application.findUnique({ where: { id }, select: { id: true, userId: true } });
        if (!app)
            throw new AppError_1.AppError('Not found', 404);
        ensureOwner(app, userId);
        const doc = await prisma_1.prisma.document.create({
            data: {
                applicationId: id,
                fileName: req.body.fileName,
                fileUrl: req.body.fileUrl,
                documentType: req.body.documentType,
            },
            select: { id: true, fileName: true, fileUrl: true, documentType: true, uploadedAt: true },
        });
        res.status(201).json({ success: true, data: doc });
    }
    catch (err) {
        next(err);
    }
}
async function submitApplication(req, res, next) {
    try {
        if (!req.user)
            throw new AppError_1.AppError('Unauthorized', 401);
        const userId = req.user.id;
        const id = String(req.params.id);
        if (!isNonEmptyString(id))
            throw new AppError_1.AppError('Invalid id', 400);
        const app = await prisma_1.prisma.application.findUnique({ where: { id }, select: { id: true, userId: true, status: true } });
        if (!app)
            throw new AppError_1.AppError('Not found', 404);
        ensureOwner(app, userId);
        if (app.status !== 'DRAFT')
            throw new AppError_1.AppError('Application already submitted or invalid status', 400);
        const now = new Date();
        await prisma_1.prisma.$transaction([
            prisma_1.prisma.application.update({ where: { id }, data: { status: 'SUBMITTED', submittedAt: now } }),
            prisma_1.prisma.auditLog.create({ data: { applicationId: id, actorId: userId, action: 'SUBMITTED' } }),
        ]);
        res.json({ success: true });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=applications.controller.js.map