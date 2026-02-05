"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../db/prisma");
async function createAdmin() {
    const email = process.argv[2] || 'admin@vaultstring.com';
    const password = process.argv[3] || 'admin123';
    const role = 'ADMIN_TIER1';
    console.log(`Creating admin user: ${email}`);
    try {
        const existingUser = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            console.log('User already exists');
            return;
        }
        const passwordHash = await bcrypt_1.default.hash(password, 12);
        const user = await prisma_1.prisma.user.create({
            data: {
                email,
                passwordHash,
                fullName: 'System Administrator',
                nationalIdOrPassport: 'ADMIN001',
                primaryPhone: '0000000000',
                physicalAddress: 'System',
                role,
            },
        });
        console.log(`Admin user created with ID: ${user.id}`);
    }
    catch (error) {
        console.error('Error creating admin user:', error);
    }
    finally {
        await prisma_1.prisma.$disconnect();
    }
}
createAdmin();
//# sourceMappingURL=createAdmin.js.map