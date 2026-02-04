import type { NextFunction, Request, Response } from 'express'
import { AppError } from '../utils/AppError'
import { prisma } from '../db/prisma'
import { verifyAccessToken } from '../services/jwt.service'


export async function authenticate(req: Request, _res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Unauthorized', 401)
    }

    const token = authHeader.slice('Bearer '.length).trim()
    if (!token) throw new AppError('Unauthorized', 401)

    const payload = verifyAccessToken(token)

    // Check if token is denylisted
    const denylisted = await prisma.denylistedToken.findUnique({
      where: { jti: payload.jti },
      select: { expiresAt: true },
    })

    if (denylisted && denylisted.expiresAt.getTime() > Date.now()) {
      throw new AppError('Token revoked', 401)
    }

    // Check if user still exists and has same role
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, role: true, passwordHash: true },
    })

    if (!user) {
      throw new AppError('User no longer exists', 401)
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      jti: payload.jti,
      token,
    }

    next()
  } catch (err) {
    next(err)
  }
}