"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PASSWORD_RESET_TTL_MS = void 0;
exports.generatePasswordResetToken = generatePasswordResetToken;
exports.hashPasswordResetToken = hashPasswordResetToken;
const node_crypto_1 = __importDefault(require("node:crypto"));
exports.PASSWORD_RESET_TTL_MS = 60 * 60 * 1000;
function generatePasswordResetToken() {
    const token = node_crypto_1.default.randomBytes(32).toString('hex');
    const tokenHash = node_crypto_1.default.createHash('sha256').update(token).digest('hex');
    const expiresAt = new Date(Date.now() + exports.PASSWORD_RESET_TTL_MS);
    return { token, tokenHash, expiresAt };
}
function hashPasswordResetToken(token) {
    return node_crypto_1.default.createHash('sha256').update(token).digest('hex');
}
//# sourceMappingURL=passwordReset.service.js.map