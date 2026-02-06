import type { NextFunction, Request, Response } from 'express'
import crypto from 'node:crypto'

export function correlationId(req: Request, res: Response, next: NextFunction) {
  const id = (req.headers['x-correlation-id'] as string) || crypto.randomUUID()
  ;(req as any).id = id
  ;(res.locals as any).correlationId = id
  next()
}
