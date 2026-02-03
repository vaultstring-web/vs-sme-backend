import type { NextFunction, Request, Response } from 'express'

import { AppError } from '../utils/AppError'
import { prisma } from '../db/prisma'
import { verifyAccessToken } from '../services/jwt.service'

export async function authenticate(req: Request, _res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) throw new AppError('Unauthorized', 401)

    const token = authHeader.slice('Bearer '.length).trim()
    if (!token) throw new AppError('Unauthorized', 401)

    const payload = verifyAccessToken(token)

    const denylisted = await prisma.denylistedToken.findUnique({
      where: { jti: payload.jti },
      select: { expiresAt: true },
    })

    if (denylisted && denylisted.expiresAt.getTime() > Date.now()) throw new AppError('Unauthorized', 401)

    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      jti: payload.jti,
      token,
    }

    next()
  } catch (err) {
    next(err)
  }
}

