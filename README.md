VaultString SME Loan Platform – Backend

Project Name: vs-sme-backend
Purpose: REST API for managing SME and Payroll loan applications, user authentication, and admin workflows.
Built with Node.js, Express, TypeScript, PostgreSQL, and Prisma ORM.

Prerequisites

Before you begin, ensure you have the following installed:
- Node.js v18+ (LTS recommended)
- pnpm (package manager) — install via: npm install -g pnpm
- PostgreSQL v12+ running locally or accessible remotely
- (Optional but recommended) Docker – if using containerized DB

Database Setup

You need to create a dedicated PostgreSQL user and database for this project.

1. Connect to PostgreSQL as a superuser:
   psql -U postgres -h localhost -p 5432

2. Run the following SQL commands

   CREATE USER vaultstring_user WITH PASSWORD 'vaultstring2026';
   CREATE DATABASE vs_sme_db OWNER vaultstring_user;
   GRANT ALL PRIVILEGES ON DATABASE vs_sme_db TO vaultstring_user;

3. Exit PostgreSQL:
   \q

Local Setup

1. Clone the repository
   git clone https://github.com/vaultstring-web/vs-sme-backend.git

2. Install dependencies
   pnpm install
   or
   npm install

3. Set up environment variables
   A .env file is required. Create one by copying the example:
   cp .env.example .env

   Then edit .env with your local configuration:

   PORT=3000
   NODE_ENV=development
   DATABASE_URL="postgresql://vaultstring_user:vaultstring2026@localhost:5432/vs_sme_db?schema=public"


4. Initialize the database schema
   Push the Prisma schema to your database:
   pnpm run db:push
   or
   npm run db:push

   This creates all tables (User, Application, etc.) based on prisma/schema.prisma.

5. Generate Prisma Client (optional – done automatically on push)
   pnpm run db:generate
   or
   npm run db:generate

6. Adding default Admin User
   pnpm run create-admin

7. Start the development server
   pnpm run dev
   or
   npm run dev

   You should see:
   Server running on port 3000 in development mode

   The API is now available at:
   http://localhost:3000

   Test the health check:
   curl http://localhost:3000
   Returns: { "message": "VaultString SME Backend - OK" }

Available Scripts

The project uses pnpm by default, but these commands also work with npm or yarn:

| Command             | pnpm                     | npm                      |
|---------------------|--------------------------|--------------------------|
| Development server  | pnpm run dev             | npm run dev              |
| Build production    | pnpm run build           | npm run build            |
| Start production    | pnpm run start           | npm run start            |
| Push DB schema      | pnpm run db:push         | npm run db:push          |
| Regenerate Prisma   | pnpm run db:generate     | npm run db:generate      |
| Open Prisma Studio  | pnpm run db:studio       | npm run db:studio        |

Note: Never commit .env – it's already in .gitignore.

Project Structure

src/
├── config/          # Environment, logger setup
├── controllers/     # Route handlers
├── middleware/      # Security, logging, error handling
├── routes/          # API route definitions
├── services/        # Business logic
├── utils/           # Helpers, custom errors
├── app.ts           # Express app factory
└── server.ts        # Server entry point

Testing (Coming Soon)

Unit and integration tests will be added in Stage 9. For now, manual testing via Postman or curl is recommended.

API Documentation

Swagger/OpenAPI docs will be published once core endpoints (auth, applications) are implemented.

Troubleshooting

Error: connect ECONNREFUSED ...
- Ensure PostgreSQL is running.
- Verify DATABASE_URL in .env has correct username, password, host, port, and DB name.

PrismaClientInitializationError
- Run pnpm run db:generate/npm run db:generate after changing the schema.
- Make sure the database exists.

TypeScript compilation errors
- Run pnpm install/npm install to ensure all @types/* packages are present.
- Check Node.js version (v18+ required).

Team Conventions

- Branching: Feature branches → PR to develop
- Commit messages: Use conventional commits (feat:, fix:, chore:, etc.)
- Environment: All devs use .env with local DB; staging/prod configs are managed separately
- Database changes: Always update prisma/schema.prisma and run db:push (dev only) or create migrations later in production

Support

Contact the tech lead or open an issue in the repository for setup problems.

Tip: Run pnpm run db:studio/npm run db:studio to visually explore your database during development!

You’re all set! Happy coding!