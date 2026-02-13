//src/config/env

import dotenv from 'dotenv';
import path from 'path';

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export const env = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-for-dev',
  JWT_ACCESS_EXPIRY: (process.env.JWT_ACCESS_EXPIRY || '15m') as any,
  JWT_REFRESH_EXPIRY: (process.env.JWT_REFRESH_EXPIRY || '7d') as any,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || 
    (process.env.NODE_ENV === 'production' 
      ? 'https://thrive.vaultstring.com,https://vaultstring.com,https://www.vaultstring.com,https://app.vaultstring.com'
      : 'http://localhost:3001,http://localhost:5173'),
  SECURE_COOKIES: process.env.NODE_ENV === 'production',
  SAME_SITE_COOKIE: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',

  EMAIL_ENABLED: String(process.env.EMAIL_ENABLED ?? '').trim().toLowerCase() === 'true',
  EMAIL_FROM: process.env.EMAIL_FROM ?? process.env.FROM_EMAIL,
  EMAIL_TO: process.env.EMAIL_TO ?? process.env.TO_EMAIL,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_SECURE: String(process.env.SMTP_SECURE ?? '').trim().toLowerCase() === 'true',
  SMTP_TLS_SERVERNAME: process.env.SMTP_TLS_SERVERNAME,
  SMTP_TLS_CA_FILE: process.env.SMTP_TLS_CA_FILE,
  SMTP_TLS_REJECT_UNAUTHORIZED:
    String(process.env.SMTP_TLS_REJECT_UNAUTHORIZED ?? '').trim() === ''
      ? true
      : String(process.env.SMTP_TLS_REJECT_UNAUTHORIZED ?? '').trim().toLowerCase() === 'true',
};
