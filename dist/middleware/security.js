"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSecurityMiddleware = void 0;
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const setupSecurityMiddleware = (app) => {
    // Security headers with specific configurations
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                scriptSrc: ["'self'"],
                imgSrc: ["'self'", "data:", "https:"],
                connectSrc: ["'self'", process.env.NODE_ENV === 'development' ? 'ws://localhost:*' : ''],
            },
        },
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: { policy: "cross-origin" },
    }));
    // CORS configuration
    const corsOptions = {
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps, curl, etc.)
            if (!origin)
                return callback(null, true);
            const allowedOrigins = [
                // Production
                'https://vaultstring.com',
                'https://www.vaultstring.com',
                'https://app.vaultstring.com',
                // Staging/Development
                ...(process.env.NODE_ENV !== 'production' ? [
                    'http://localhost:3000',
                    'http://localhost:3001',
                    'http://127.0.0.1:3001',
                    'http://localhost:5173',
                ] : []),
                // Add other allowed origins from environment variable
                ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [])
            ];
            if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
                return callback(null, true);
            }
            console.warn(`Blocked by CORS: ${origin}`);
            return callback(new Error('Not allowed by CORS'), false);
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'X-Requested-With',
            'Accept',
            'Origin',
            'X-CSRF-Token',
            'X-API-Version',
        ],
        exposedHeaders: ['Content-Range', 'X-Content-Range', 'X-Total-Count'],
        maxAge: 86400,
    };
    // Apply CORS middleware - this handles OPTIONS requests automatically
    app.use((0, cors_1.default)(corsOptions));
    // Alternatively, handle preflight manually for all routes if needed:
    // app.options('*', (req, res) => {
    //   res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    //   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    //   res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || '*');
    //   res.header('Access-Control-Allow-Credentials', 'true');
    //   res.header('Access-Control-Max-Age', '86400');
    //   res.sendStatus(204);
    // });
};
exports.setupSecurityMiddleware = setupSecurityMiddleware;
//# sourceMappingURL=security.js.map