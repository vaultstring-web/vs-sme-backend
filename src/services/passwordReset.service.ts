import crypto from 'node:crypto'

export const PASSWORD_RESET_TTL_MS = 60 * 60 * 1000

export function generatePasswordResetToken(): { token: string; tokenHash: string; expiresAt: Date } {
  const token = crypto.randomBytes(32).toString('hex')
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
  const expiresAt = new Date(Date.now() + PASSWORD_RESET_TTL_MS)
  return { token, tokenHash, expiresAt }
}

export function hashPasswordResetToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex')
}

