export function sanitize(obj: any): any {
  if (!obj || typeof obj !== 'object') return obj
  const clone: any = Array.isArray(obj) ? [] : {}
  const blocked = new Set(['password', 'refreshToken', 'authorization', 'Authorization', 'nationalIdOrPassport'])
  for (const k of Object.keys(obj)) {
    if (blocked.has(k)) continue
    const v = (obj as any)[k]
    clone[k] = typeof v === 'object' ? sanitize(v) : v
  }
  return clone
}
