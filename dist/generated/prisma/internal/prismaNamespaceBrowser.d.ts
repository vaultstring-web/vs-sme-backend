import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client/runtime/client").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client/runtime/client").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client/runtime/client").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Application: "Application";
    readonly SmeApplicationData: "SmeApplicationData";
    readonly PayrollApplicationData: "PayrollApplicationData";
    readonly Document: "Document";
    readonly AuditLog: "AuditLog";
    readonly DenylistedToken: "DenylistedToken";
    readonly PasswordResetToken: "PasswordResetToken";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly fullName: "fullName";
    readonly nationalIdOrPassport: "nationalIdOrPassport";
    readonly primaryPhone: "primaryPhone";
    readonly secondaryPhone: "secondaryPhone";
    readonly physicalAddress: "physicalAddress";
    readonly postalAddress: "postalAddress";
    readonly role: "role";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const ApplicationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly type: "type";
    readonly status: "status";
    readonly submittedAt: "submittedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ApplicationScalarFieldEnum = (typeof ApplicationScalarFieldEnum)[keyof typeof ApplicationScalarFieldEnum];
export declare const SmeApplicationDataScalarFieldEnum: {
    readonly id: "id";
    readonly applicationId: "applicationId";
    readonly businessName: "businessName";
    readonly registrationNo: "registrationNo";
    readonly businessType: "businessType";
    readonly yearsInOperation: "yearsInOperation";
    readonly loanProduct: "loanProduct";
    readonly loanAmount: "loanAmount";
    readonly paybackPeriodMonths: "paybackPeriodMonths";
    readonly purposeOfLoan: "purposeOfLoan";
    readonly repaymentMethod: "repaymentMethod";
    readonly estimatedMonthlyTurnover: "estimatedMonthlyTurnover";
    readonly estimatedMonthlyProfit: "estimatedMonthlyProfit";
    readonly groupName: "groupName";
    readonly groupMemberCount: "groupMemberCount";
    readonly hasOutstandingLoans: "hasOutstandingLoans";
    readonly outstandingLoanDetails: "outstandingLoanDetails";
    readonly hasDefaulted: "hasDefaulted";
    readonly defaultExplanation: "defaultExplanation";
};
export type SmeApplicationDataScalarFieldEnum = (typeof SmeApplicationDataScalarFieldEnum)[keyof typeof SmeApplicationDataScalarFieldEnum];
export declare const PayrollApplicationDataScalarFieldEnum: {
    readonly id: "id";
    readonly applicationId: "applicationId";
    readonly dateOfBirth: "dateOfBirth";
    readonly gender: "gender";
    readonly maritalStatus: "maritalStatus";
    readonly nextOfKinName: "nextOfKinName";
    readonly nextOfKinRelationship: "nextOfKinRelationship";
    readonly nextOfKinPhone: "nextOfKinPhone";
    readonly loanAmount: "loanAmount";
    readonly paybackPeriodMonths: "paybackPeriodMonths";
    readonly employerName: "employerName";
    readonly employerAddress: "employerAddress";
    readonly jobTitle: "jobTitle";
    readonly employeeNumber: "employeeNumber";
    readonly dateOfEmployment: "dateOfEmployment";
    readonly grossMonthlySalary: "grossMonthlySalary";
    readonly netMonthlySalary: "netMonthlySalary";
    readonly payrollDeductionConfirmed: "payrollDeductionConfirmed";
    readonly hasOutstandingLoans: "hasOutstandingLoans";
    readonly outstandingLoanDetails: "outstandingLoanDetails";
    readonly hasDefaulted: "hasDefaulted";
    readonly defaultExplanation: "defaultExplanation";
};
export type PayrollApplicationDataScalarFieldEnum = (typeof PayrollApplicationDataScalarFieldEnum)[keyof typeof PayrollApplicationDataScalarFieldEnum];
export declare const DocumentScalarFieldEnum: {
    readonly id: "id";
    readonly applicationId: "applicationId";
    readonly fileName: "fileName";
    readonly fileUrl: "fileUrl";
    readonly documentType: "documentType";
    readonly uploadedAt: "uploadedAt";
};
export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum];
export declare const AuditLogScalarFieldEnum: {
    readonly id: "id";
    readonly applicationId: "applicationId";
    readonly actorId: "actorId";
    readonly action: "action";
    readonly notes: "notes";
    readonly timestamp: "timestamp";
};
export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum];
export declare const DenylistedTokenScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly jti: "jti";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
};
export type DenylistedTokenScalarFieldEnum = (typeof DenylistedTokenScalarFieldEnum)[keyof typeof DenylistedTokenScalarFieldEnum];
export declare const PasswordResetTokenScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly tokenHash: "tokenHash";
    readonly expiresAt: "expiresAt";
    readonly usedAt: "usedAt";
    readonly createdAt: "createdAt";
};
export type PasswordResetTokenScalarFieldEnum = (typeof PasswordResetTokenScalarFieldEnum)[keyof typeof PasswordResetTokenScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
