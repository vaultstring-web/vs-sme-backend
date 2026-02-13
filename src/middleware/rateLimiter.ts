import rateLimit, { ipKeyGenerator } from 'express-rate-limit';

/**
 * Extract the real client IP from the request, respecting X-Forwarded-For.
 * Falls back to express-rate-limit's official ipKeyGenerator helper.
 */
const getClientIp = (req: any): string => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    const ips = forwarded.split(',');
    return ips[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0].split(',')[0].trim();
  }
  // Use the library's helper for correct IPv6 handling
  return ipKeyGenerator(req);
};

/**
 * Strict limiter for authentication endpoints (login, register, password reset).
 * Prevents brute‑force attacks. Successful attempts are not counted.
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                  // increased from 5 to 10
  message: {
    error: 'Too many authentication attempts, please try again after 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  keyGenerator: getClientIp,
});

/**
 * General API limiter – apply to non‑sensitive endpoints in their own route files.
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,                 // increased from 100 to 200
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getClientIp,
});

/**
 * Very strict limiter for highly sensitive operations (e.g. admin actions).
 */
export const strictLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: {
    error: 'Too many requests from this IP, please try again after an hour',
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getClientIp,
});