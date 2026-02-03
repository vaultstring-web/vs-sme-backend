export declare const Role: {
    readonly APPLICANT: "APPLICANT";
    readonly ADMIN_TIER1: "ADMIN_TIER1";
    readonly ADMIN_TIER2: "ADMIN_TIER2";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const AppType: {
    readonly SME: "SME";
    readonly PAYROLL: "PAYROLL";
};
export type AppType = (typeof AppType)[keyof typeof AppType];
export declare const AppStatus: {
    readonly DRAFT: "DRAFT";
    readonly SUBMITTED: "SUBMITTED";
    readonly UNDER_REVIEW: "UNDER_REVIEW";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
    readonly DISBURSED: "DISBURSED";
    readonly REPAYED: "REPAYED";
    readonly DEFAULTED: "DEFAULTED";
};
export type AppStatus = (typeof AppStatus)[keyof typeof AppStatus];
