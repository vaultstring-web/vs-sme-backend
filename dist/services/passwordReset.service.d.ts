export declare const PASSWORD_RESET_TTL_MS: number;
export declare function generatePasswordResetToken(): {
    token: string;
    tokenHash: string;
    expiresAt: Date;
};
export declare function hashPasswordResetToken(token: string): string;
