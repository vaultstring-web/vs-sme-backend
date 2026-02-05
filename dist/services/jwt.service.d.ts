import type { Role } from '../generated/prisma';
export type AccessTokenUser = {
    id: string;
    email: string;
    role: Role;
};
export type AccessTokenPayload = {
    sub: string;
    email: string;
    role: Role;
    jti: string;
    type: 'access';
};
export type RefreshTokenPayload = {
    sub: string;
    jti: string;
    type: 'refresh';
};
export type TokenPair = {
    accessToken: string;
    refreshToken: string;
    accessJti: string;
    refreshJti: string;
};
/**
 * Sign an access token
 */
export declare function signAccessToken(user: AccessTokenUser): {
    token: string;
    jti: string;
    expiresAt: Date;
};
/**
 * Sign a refresh token
 */
export declare function signRefreshToken(userId: string): {
    token: string;
    jti: string;
    expiresAt: Date;
};
/**
 * Sign both access and refresh tokens for a user
 */
export declare function signTokenPair(user: AccessTokenUser): TokenPair;
/**
 * Verify an access token
 */
export declare function verifyAccessToken(token: string): AccessTokenPayload;
/**
 * Verify a refresh token
 */
export declare function verifyRefreshToken(token: string): RefreshTokenPayload;
/**
 * Extract expiration date from a JWT token
 */
export declare function getTokenExpiration(token: string): Date;
/**
 * Extract user ID from token without verification (for logging, etc.)
 */
export declare function extractUserIdFromToken(token: string): string | null;
