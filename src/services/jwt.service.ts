import * as jwt from 'jsonwebtoken'
import crypto from 'node:crypto'

import { env } from '../config/env'
import { AppError } from '../utils/AppError'

export type AccessTokenUser = {
  id: string
  email: string
  role: string
}

export type AccessTokenPayload = {
  sub: string
  email: string
  role: string
  jti: string
}

export function signAccessToken(user: AccessTokenUser): { token: string; jti: string; expiresAt: Date } {
  const jti = crypto.randomUUID()
  const expiresIn: jwt.SignOptions['expiresIn'] = (process.env.JWT_EXPIRES_IN as any) ?? '1h'

  const token = jwt.sign({ email: user.email, role: user.role }, env.JWT_SECRET as jwt.Secret, {
    subject: user.id,
    jwtid: jti,
    expiresIn,
  })

  const decoded = jwt.decode(token)
  if (!decoded || typeof decoded === 'string' || typeof (decoded as jwt.JwtPayload).exp !== 'number') {
    throw new AppError('Failed to generate access token', 500)
  }

  return { token, jti, expiresAt: new Date((decoded as jwt.JwtPayload).exp! * 1000) }
}

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

  const sub = typeof decoded.sub === 'string' ? decoded.sub : undefined
  const email = typeof (decoded as any).email === 'string' ? (decoded as any).email : undefined
  const role = typeof (decoded as any).role === 'string' ? (decoded as any).role : undefined
  const jti = typeof decoded.jti === 'string' ? decoded.jti : undefined

  if (!sub || !email || !role || !jti) throw new AppError('Invalid token', 401)

  return { sub, email, role, jti }
}
