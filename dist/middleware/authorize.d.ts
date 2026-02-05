import type { NextFunction, Request, Response } from 'express';
import type { Role } from '../generated/prisma';
export declare function requireRole(allowedRoles: Role[]): (req: Request, _res: Response, next: NextFunction) => void;
export declare const requireAdminTier1: (req: Request, _res: Response, next: NextFunction) => void;
export declare const requireAdminTier2: (req: Request, _res: Response, next: NextFunction) => void;
export declare const requireAdmin: (req: Request, _res: Response, next: NextFunction) => void;
export declare const requireApplicant: (req: Request, _res: Response, next: NextFunction) => void;
