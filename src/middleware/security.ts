import cors from 'cors';
import helmet from 'helmet';

export const setupSecurityMiddleware = (app: any) => {
  // Security headers
  app.use(helmet());

  // CORS (adjust origin for production)
  app.use(
    cors({
      origin: process.env.NODE_ENV === 'production' 
        ? ['https://vaultstring.com'] 
        : '*',
      credentials: true,
    })
  );
};