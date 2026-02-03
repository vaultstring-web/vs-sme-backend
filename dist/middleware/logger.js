"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.successLogger = void 0;
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = require("../config/logger");
// Morgan token to use Winston
morgan_1.default.token('message', (req, res) => {
    return res.locals.errorMessage || '';
});
const getIpFormat = () => (process.env.NODE_ENV === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;
exports.successLogger = (0, morgan_1.default)(successResponseFormat, {
    skip: (req, res) => res.statusCode >= 400,
    stream: { write: (message) => logger_1.logger.http(message.trim()) },
});
exports.errorLogger = (0, morgan_1.default)(errorResponseFormat, {
    skip: (req, res) => res.statusCode < 400,
    stream: { write: (message) => logger_1.logger.error(message.trim()) },
});
//# sourceMappingURL=logger.js.map