export type AccessTokenUser = {
    id: string;
    email: string;
    role: string;
};
export type AccessTokenPayload = {
    sub: string;
    email: string;
    role: string;
    jti: string;
};
export declare function signAccessToken(user: AccessTokenUser): {
    token: string;
    jti: string;
    expiresAt: Date;
};
export declare function verifyAccessToken(token: string): AccessTokenPayload;
