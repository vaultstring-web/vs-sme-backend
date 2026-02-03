import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class";
import * as Prisma from "./internal/prismaNamespace";
export * as $Enums from './enums';
export * from "./enums";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model Application
 *
 */
export type Application = Prisma.ApplicationModel;
/**
 * Model SmeApplicationData
 *
 */
export type SmeApplicationData = Prisma.SmeApplicationDataModel;
/**
 * Model PayrollApplicationData
 *
 */
export type PayrollApplicationData = Prisma.PayrollApplicationDataModel;
/**
 * Model Document
 *
 */
export type Document = Prisma.DocumentModel;
/**
 * Model AuditLog
 *
 */
export type AuditLog = Prisma.AuditLogModel;
/**
 * Model DenylistedToken
 *
 */
export type DenylistedToken = Prisma.DenylistedTokenModel;
/**
 * Model PasswordResetToken
 *
 */
export type PasswordResetToken = Prisma.PasswordResetTokenModel;
