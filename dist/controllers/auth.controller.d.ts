import type { NextFunction, Request, Response } from 'express';
export declare function register(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function login(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function logout(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function requestPasswordReset(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function confirmPasswordReset(req: Request, res: Response, next: NextFunction): Promise<void>;
