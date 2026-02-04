import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { 
    error: 'Too many login attempts, please try again after 15 minutes' 
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Optional: skip successful requests
  skipSuccessfulRequests: true,
});

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

export const strictLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { 
    error: 'Too many requests from this IP, please try again after an hour' 
  },
  standardHeaders: true,
  legacyHeaders: false,
});