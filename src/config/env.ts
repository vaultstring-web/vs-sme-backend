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
};