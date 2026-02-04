import * as jwt from 'jsonwebtoken'
import crypto from 'node:crypto'

import { env } from '../config/env'
import { AppError } from '../utils/AppError'
import type { Role } from '../generated/prisma'

export type AccessTokenUser = {
  id: string
  email: string
  role: Role
}

export type AccessTokenPayload = {
  sub: string  // user id
  email: string
  role: Role
  jti: string  // token id for revocation
  type: 'access'
}

export type RefreshTokenPayload = {
  sub: string  // user id
  jti: string  // token id for revocation
  type: 'refresh'
}

export type TokenPair = {
  accessToken: string
  refreshToken: string
  accessJti: string
  refreshJti: string
}

// Token expiration configurations
const JWT_ACCESS_EXPIRY = process.env.JWT_ACCESS_EXPIRY || '15m'
const JWT_REFRESH_EXPIRY = process.env.JWT_REFRESH_EXPIRY || '7d'

/**
 * Sign an access token
 */
export function signAccessToken(user: AccessTokenUser): { token: string; jti: string; expiresAt: Date } {
  const jti = crypto.randomUUID();
  
  const token = jwt.sign(
    {
      email: user.email,
      role: user.role,
      type: 'access'
    },
    env.JWT_SECRET as jwt.Secret,
    {
      subject: user.id,
      jwtid: jti,
      expiresIn: env.JWT_ACCESS_EXPIRY,
    }
  );

  const decoded = jwt.decode(token) as jwt.JwtPayload;
  if (!decoded?.exp) {
    throw new AppError('Failed to generate access token', 500);
  }

  return { token, jti, expiresAt: new Date(decoded.exp * 1000) };
}
/**
 * Sign a refresh token
 */
export function signRefreshToken(userId: string): { token: string; jti: string; expiresAt: Date } {
  const jti = crypto.randomUUID();
  
  const token = jwt.sign(
    { type: 'refresh' },
    env.JWT_SECRET as jwt.Secret,
    {
      subject: userId,
      jwtid: jti,
      expiresIn: env.JWT_REFRESH_EXPIRY, // Clean reference from env
    }
  );

  const decoded = jwt.decode(token) as jwt.JwtPayload;
  if (!decoded?.exp) {
    throw new AppError('Failed to generate refresh token', 500);
  }

  return { token, jti, expiresAt: new Date(decoded.exp * 1000) };
}
/**
 * Sign both access and refresh tokens for a user
 */
export function signTokenPair(user: AccessTokenUser): TokenPair {
  const { token: accessToken, jti: accessJti } = signAccessToken(user)
  const { token: refreshToken, jti: refreshJti } = signRefreshToken(user.id)
  
  return {
    accessToken,
    refreshToken,
    accessJti,
    refreshJti,
  }
}

/**
 * Verify an access token
 */
export function verifyAccessToken(token: string): AccessTokenPayload {
  let decoded: string | jwt.JwtPayload;
  try {
    decoded = jwt.verify(token, env.JWT_SECRET as jwt.Secret)
  } catch (error) {
    throw new AppError('Invalid token', 401)
  }

  if (!decoded || typeof decoded === 'string' || typeof decoded !== 'object') {
    throw new AppError('Invalid token', 401)
  }
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET as jwt.Secret)
    
    if (!decoded || typeof decoded === 'string' || typeof decoded !== 'object') {
      throw new AppError('Invalid token', 401)
    }

    const sub = typeof decoded.sub === 'string' ? decoded.sub : undefined
    const email = typeof (decoded as any).email === 'string' ? (decoded as any).email : undefined
    const role = typeof (decoded as any).role === 'string' ? (decoded as any).role : undefined
    const jti = typeof decoded.jti === 'string' ? decoded.jti : undefined
    const type = typeof (decoded as any).type === 'string' ? (decoded as any).type : undefined

    if (!sub || !email || !role || !jti) {
      throw new AppError('Invalid token', 401)
    }
    
    if (type !== 'access') {
      throw new AppError('Invalid token type', 401)
    }

    // Validate role is a valid Prisma Role enum value
    const validRoles: Role[] = ['APPLICANT', 'ADMIN_TIER1', 'ADMIN_TIER2']
    if (!validRoles.includes(role as Role)) {
      throw new AppError('Invalid role in token', 401)
    }

    return { 
      sub, 
      email, 
      role: role as Role, 
      jti, 
      type: 'access' 
    }
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new AppError('Token expired', 401)
    }
    if (err instanceof jwt.JsonWebTokenError) {
      throw new AppError('Invalid token', 401)
    }
    // Re-throw our AppError or other errors
    throw err
  }
}

/**
 * Verify a refresh token
 */
export function verifyRefreshToken(token: string): RefreshTokenPayload {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET as jwt.Secret)
    
    if (!decoded || typeof decoded === 'string' || typeof decoded !== 'object') {
      throw new AppError('Invalid token', 401)
    }

    const sub = typeof decoded.sub === 'string' ? decoded.sub : undefined
    const jti = typeof decoded.jti === 'string' ? decoded.jti : undefined
    const type = typeof (decoded as any).type === 'string' ? (decoded as any).type : undefined

    if (!sub || !jti) {
      throw new AppError('Invalid token', 401)
    }
    
    if (type !== 'refresh') {
      throw new AppError('Invalid token type', 401)
    }

    return { 
      sub, 
      jti, 
      type: 'refresh' 
    }
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new AppError('Token expired', 401)
    }
    if (err instanceof jwt.JsonWebTokenError) {
      throw new AppError('Invalid token', 401)
    }
    throw err
  }
}

/**
 * Extract expiration date from a JWT token
 */
export function getTokenExpiration(token: string): Date {
  const decoded = jwt.decode(token)
  
  if (!decoded || typeof decoded === 'string' || typeof (decoded as jwt.JwtPayload).exp !== 'number') {
    throw new AppError('Invalid token', 401)
  }

  return new Date((decoded as jwt.JwtPayload).exp! * 1000)
}

/**
 * Extract user ID from token without verification (for logging, etc.)
 */
export function extractUserIdFromToken(token: string): string | null {
  try {
    const decoded = jwt.decode(token)
    
    if (!decoded || typeof decoded === 'string' || typeof decoded !== 'object') {
      return null
    }

    return typeof decoded.sub === 'string' ? decoded.sub : null
  } catch {
    return null
  }
}