// src/tests/integration/auth.test.ts
import 'dotenv/config'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createAgent } from '../helpers/testServer'
import { prisma } from '../../db/prisma'
import bcrypt from 'bcrypt'

// ======================
// TEST DATA PREFIXES (isolated per suite)
// ======================
const regTestEmail = `regtest-${Date.now()}@example.com`
const loginTestEmail = `logintest-${Date.now()}@example.com`
const tokenTestEmail = `tokentest-${Date.now()}@example.com`
const resetTestEmail = `resettest-${Date.now()}@example.com`
const adminTier1Email = `admint1-${Date.now()}@example.com`
const adminTier2Email = `admint2-${Date.now()}@example.com`
const applicantEmail = `applicant-${Date.now()}@example.com`
const testPassword = 'SecurePass123!'
const newPassword = 'NewSecurePass456!'

// ======================
// HELPER: Clean tokens before users (FIXES FK CONSTRAINT)
// ======================
async function cleanupUsersWithEmailPrefix(prefix: string) {
  // Delete user documents FIRST to avoid FK constraint
  await prisma.userDocument.deleteMany({
    where: { user: { email: { startsWith: prefix } } }
  })
  
  await prisma.denylistedToken.deleteMany({
    where: { user: { email: { startsWith: prefix } } }
  })
  await prisma.passwordResetToken.deleteMany({
    where: { user: { email: { startsWith: prefix } } }
  })
  await prisma.user.deleteMany({
    where: { email: { startsWith: prefix } }
  })
}

// ======================
// AUTH - REGISTRATION TESTS
// ======================
describe('Auth - Registration', () => {
  afterAll(async () => {
    await prisma.user.deleteMany({
      where: { email: { startsWith: 'regtest-' } },
    })
  })

  it('registers a new user successfully (201)', async () => {
    const agent = createAgent()
    const res = await agent
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send({
        email: regTestEmail,
        password: testPassword,
        fullName: 'Registration Test User',
        primaryPhone: '0991234567',
        physicalAddress: '123 Main St, Lilongwe',
        nationalId: 'NID987654321',
      })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('profile')
    expect(res.body.profile.email).toBe(regTestEmail)
    expect(res.body.profile.role).toBe('APPLICANT')
  })

  it('rejects registration with missing email (400)', async () => {
    const agent = createAgent()
    const res = await agent
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send({
        password: testPassword,
        fullName: 'No Email User',
        primaryPhone: '0991234567',
        physicalAddress: '123 Main St',
        nationalId: 'NID111',
      })
    expect(res.status).toBe(400)
    expect(res.body.message).toContain('email is required')
  })

  it('rejects registration with missing password (400)', async () => {
    const agent = createAgent()
    const res = await agent
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send({
        email: `missingpass-${Date.now()}@example.com`,
        fullName: 'No Pass User',
        primaryPhone: '0991234567',
        physicalAddress: '123 Main St',
        nationalId: 'NID222',
      })
    expect(res.status).toBe(400)
    expect(res.body.message).toContain('password is required')
  })

  it('rejects weak password (<8 chars) (400)', async () => {
    const agent = createAgent()
    const res = await agent
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send({
        email: `weakpass-${Date.now()}@example.com`,
        password: '123',
        fullName: 'Weak Pass User',
        primaryPhone: '0991234567',
        physicalAddress: '123 Main St',
        nationalId: 'NID333',
      })
    expect(res.status).toBe(400)
    expect(res.body.message).toContain('at least 8 characters')
  })

  it('rejects duplicate email (409)', async () => {
    const agent = createAgent()
    const email = `dupe-${Date.now()}@example.com`
    
    let res = await agent
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send({
        email,
        password: testPassword,
        fullName: 'First User',
        primaryPhone: '0991234567',
        physicalAddress: '123 Main St',
        nationalId: 'NID444',
      })
    expect(res.status).toBe(201)

    res = await agent
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send({
        email,
        password: 'AnotherPass123!',
        fullName: 'Second Attempt',
        primaryPhone: '0997654321',
        physicalAddress: '456 Oak Ave',
        nationalId: 'NID555',
      })
    expect(res.status).toBe(409)
    expect(res.body.message).toContain('Email already in use')
  })

  it('accepts optional base64 documents during registration', async () => {
    const agent = createAgent()
    const email = `withdocs-${Date.now()}@example.com`
    const base64Image =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='

    const res = await agent
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send({
        email,
        password: testPassword,
        fullName: 'Doc User',
        primaryPhone: '0991234567',
        physicalAddress: '123 Main St',
        nationalId: 'NID666',
        documents: [
          {
            fileName: 'id_front.png',
            base64: base64Image,
            documentType: 'NATIONAL_ID_FRONT',
          },
        ],
      })

    expect(res.status).toBe(201)
    expect(res.body.message).toContain('upload required documents')

    const user = await prisma.user.findUnique({
      where: { email },
      include: { documents: true },
    })
    expect(user?.documents.length).toBe(1)
    expect(user?.documents[0].documentType).toBe('NATIONAL_ID_FRONT')
  })
})

// ======================
// AUTH - LOGIN TESTS
// ======================
describe('Auth - Login', () => {
  beforeAll(async () => {
    await prisma.user.create({
      data: {
        email: loginTestEmail,
        passwordHash: await bcrypt.hash(testPassword, 12),
        fullName: 'Login Test User',
        nationalIdOrPassport: 'NID_LOGIN_123',
        primaryPhone: '0999876543',
        physicalAddress: '456 Test Ave, Lilongwe',
        role: 'APPLICANT',
      },
    })
  })

  afterAll(async () => {
    await cleanupUsersWithEmailPrefix('logintest-')
  })

  it('logs in successfully with valid credentials (200)', async () => {
    const agent = createAgent()
    const res = await agent
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: loginTestEmail,
        password: testPassword,
      })

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('accessToken')
    expect(res.body).toHaveProperty('refreshToken')
    expect(res.body).toHaveProperty('profile')
    expect(res.body.profile.email).toBe(loginTestEmail)
    expect(res.body.profile.role).toBe('APPLICANT')
    expect(typeof res.body.accessToken).toBe('string')
    expect(typeof res.body.refreshToken).toBe('string')
  })

  it('rejects login with missing email (400)', async () => {
    const agent = createAgent()
    const res = await agent
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({ password: testPassword })
    expect(res.status).toBe(400)
    expect(res.body.message).toContain('email is required')
  })

  it('rejects login with missing password (400)', async () => {
    const agent = createAgent()
    const res = await agent
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({ email: loginTestEmail })
    expect(res.status).toBe(400)
    expect(res.body.message).toContain('password is required')
  })

  it('rejects login with invalid email (401)', async () => {
    const agent = createAgent()
    const res = await agent
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'nonexistent@example.com',
        password: 'SomePassword123!',
      })
    expect(res.status).toBe(401)
    expect(res.body.message).toContain('Invalid credentials')
  })

  it('rejects login with invalid password (401)', async () => {
    const agent = createAgent()
    const res = await agent
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: loginTestEmail,
        password: 'WrongPassword123!',
      })
    expect(res.status).toBe(401)
    expect(res.body.message).toContain('Invalid credentials')
  })

  it('normalizes email to lowercase (case-insensitive)', async () => {
    const agent = createAgent()
    const res = await agent
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: loginTestEmail.toUpperCase(),
        password: testPassword,
      })
    expect(res.status).toBe(200)
    expect(res.body.profile.email).toBe(loginTestEmail)
  })
})

// ======================
// AUTH - TOKEN LIFECYCLE TESTS (ISOLATED PER TEST)
// ======================
describe('Auth - Token Lifecycle', () => {
  afterAll(async () => {
    await cleanupUsersWithEmailPrefix('tokentest-')
  })

  it('refreshes token with valid refresh token (200)', async () => {
    const agent = createAgent()
    
    // Create fresh user
    await agent.post('/api/auth/register').send({
      email: tokenTestEmail,
      password: testPassword,
      fullName: 'Token Test User',
      primaryPhone: '0991111111',
      physicalAddress: 'Token St',
      nationalId: 'NID-TOKEN'
    })
    
    // Login to get fresh tokens
    const loginRes = await agent.post('/api/auth/login').send({
      email: tokenTestEmail,
      password: testPassword
    })
    expect(loginRes.status).toBe(200)

    // Refresh with valid token
    const res = await agent
      .post('/api/auth/refresh-token')
      .set('Content-Type', 'application/json')
      .send({ refreshToken: loginRes.body.refreshToken })

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('accessToken')
    expect(res.body).toHaveProperty('profile')
    expect(typeof res.body.accessToken).toBe('string')
  })

  it('rejects refresh with invalid token (401)', async () => {
    const agent = createAgent()
    const res = await agent
      .post('/api/auth/refresh-token')
      .set('Content-Type', 'application/json')
      .send({ refreshToken: 'invalid.token.here' })

    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Invalid token') // FIXED: was 'revoked'
  })

  it('logs out successfully and invalidates refresh token (200)', async () => {
    const agent = createAgent()
    const logoutEmail = `logout-${Date.now()}@example.com`  // Store email in variable
    
    // Create and login user
    await agent.post('/api/auth/register').send({
      email: logoutEmail,  // Use same email
      password: testPassword,
      fullName: 'Logout Test',
      primaryPhone: '0992222222',
      physicalAddress: 'Logout St',
      nationalId: 'NID-LOGOUT'
    })
    
    const loginRes = await agent.post('/api/auth/login').send({
      email: logoutEmail,  // Use same email
      password: testPassword
    })
    expect(loginRes.status).toBe(200)

    // Logout - send refresh token to be revoked
    const logoutRes = await agent
      .post('/api/auth/logout')
      .set('Authorization', `Bearer ${loginRes.body.accessToken}`)
      .send({ refreshToken: loginRes.body.refreshToken })  // Include refresh token
    expect(logoutRes.status).toBe(200)

    // Attempt to refresh invalidated token
    const refreshRes = await agent
      .post('/api/auth/refresh-token')
      .set('Content-Type', 'application/json')
      .send({ refreshToken: loginRes.body.refreshToken })
    expect(refreshRes.status).toBe(401)
  })
})

// ======================
// AUTH - PASSWORD RESET TESTS
// ======================
describe('Auth - Password Reset', () => {
  afterAll(async () => {
    await cleanupUsersWithEmailPrefix('resettest-')
  })

  it('requests reset for existing user (200)', async () => {
    const agent = createAgent()
    
    // Create user
    await agent.post('/api/auth/register').send({
      email: resetTestEmail,
      password: testPassword,
      fullName: 'Reset Test User',
      primaryPhone: '0993333333',
      physicalAddress: 'Reset Ave',
      nationalId: 'NID-RESET'
    })

    // Request reset
    const res = await agent
      .post('/api/auth/password-reset/request')
      .send({ email: resetTestEmail })

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
  })

  it('requests reset for non-existent user (200 - security)', async () => {
    const agent = createAgent()
    const res = await agent
      .post('/api/auth/password-reset/request')
      .send({ email: 'nonexistent@example.com' })

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
  })

  it('confirms reset with valid token and strong password (200)', async () => {
    const agent = createAgent()
    const email = `reset-${Date.now()}@example.com`
    
    // Create user
    await agent.post('/api/auth/register').send({
      email,
      password: testPassword,
      fullName: 'Reset Confirm User',
      primaryPhone: '0994444444',
      physicalAddress: 'Reset Confirm St',
      nationalId: 'NID-RESCONFIRM'
    })

    // Request reset (token returned in test env)
    const requestRes = await agent
      .post('/api/auth/password-reset/request')
      .send({ email })
    
    if (!requestRes.body.token) {
      // Skip in production where token isn't returned
      return
    }

    // Confirm reset
    const confirmRes = await agent
      .post('/api/auth/password-reset/confirm')
      .send({ 
        token: requestRes.body.token, 
        newPassword 
      })

    expect(confirmRes.status).toBe(200)
    expect(confirmRes.body.success).toBe(true)

    // Verify new password works
    const loginRes = await agent.post('/api/auth/login').send({
      email,
      password: newPassword
    })
    expect(loginRes.status).toBe(200)
  })

  it('rejects reset with weak password (400)', async () => {
    const agent = createAgent()
    const email = `weakreset-${Date.now()}@example.com`
    
    // Create user
    await agent.post('/api/auth/register').send({
      email,
      password: testPassword,
      fullName: 'Weak Reset User',
      primaryPhone: '0995555555',
      physicalAddress: 'Weak Reset St',
      nationalId: 'NID-WEAKRESET'
    })

    // Request reset
    const requestRes = await agent
      .post('/api/auth/password-reset/request')
      .send({ email })
    
    if (!requestRes.body.token) return

    // Try weak password
    const res = await agent
      .post('/api/auth/password-reset/confirm')
      .send({ 
        token: requestRes.body.token, 
        newPassword: 'weak' 
      })

    expect(res.status).toBe(400)
    expect(res.body.message).toContain('at least 8 characters')
  })
})

// ======================
// AUTH - ADMIN ENDPOINTS (RBAC TESTS)
// ======================
describe('Auth - Admin Endpoints', () => {
  let tier1Token = ''
  let tier2Token = ''
  let applicantToken = ''
  let testUserId = ''

  beforeAll(async () => {
    // Create admin users directly via Prisma
    const tier1Hash = await bcrypt.hash(testPassword, 12)
    const tier2Hash = await bcrypt.hash(testPassword, 12)
    const applicantHash = await bcrypt.hash(testPassword, 12)

    await prisma.user.createMany({
      data: [
        { 
          email: adminTier1Email, 
          passwordHash: tier1Hash, 
          fullName: 'Admin Tier1', 
          nationalIdOrPassport: 'NID-ADMIN1',
          primaryPhone: '0996666666',
          physicalAddress: 'Admin St 1',
          role: 'ADMIN_TIER1' 
        },
        { 
          email: adminTier2Email, 
          passwordHash: tier2Hash, 
          fullName: 'Admin Tier2', 
          nationalIdOrPassport: 'NID-ADMIN2',
          primaryPhone: '0997777777',
          physicalAddress: 'Admin St 2',
          role: 'ADMIN_TIER2' 
        },
        { 
          email: applicantEmail, 
          passwordHash: applicantHash, 
          fullName: 'Test Applicant', 
          nationalIdOrPassport: 'NID-APPLICANT',
          primaryPhone: '0998888888',
          physicalAddress: 'Applicant Ave',
          role: 'APPLICANT' 
        }
      ]
    })

    // Get tokens via login
    const agent = createAgent()
    const tier1Login = await agent.post('/api/auth/login').send({ email: adminTier1Email, password: testPassword })
    const tier2Login = await agent.post('/api/auth/login').send({ email: adminTier2Email, password: testPassword })
    const applicantLogin = await agent.post('/api/auth/login').send({ email: applicantEmail, password: testPassword })
    
    tier1Token = tier1Login.body.accessToken
    tier2Token = tier2Login.body.accessToken
    applicantToken = applicantLogin.body.accessToken
    testUserId = applicantLogin.body.profile.id
  })

  afterAll(async () => {
    await cleanupUsersWithEmailPrefix('admint1-')
    await cleanupUsersWithEmailPrefix('admint2-')
    await cleanupUsersWithEmailPrefix('applicant-')
  })

  it('ADMIN_TIER1 can list users (200)', async () => {
    const agent = createAgent()
    const res = await agent
      .get('/api/auth/admin/users?page=1&limit=10')
      .set('Authorization', `Bearer ${tier1Token}`)
    
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('users')
    expect(res.body).toHaveProperty('pagination')
    expect(Array.isArray(res.body.users)).toBe(true)
  })

  it('ADMIN_TIER1 can register new APPLICANT user (201)', async () => {
    const agent = createAgent()
    const email = `admincreated-${Date.now()}@example.com`
    const res = await agent
      .post('/api/auth/admin/register')
      .set('Authorization', `Bearer ${tier1Token}`)
      .send({
        email,
        password: testPassword,
        fullName: 'Admin Created User',
        primaryPhone: '0999999999',
        physicalAddress: 'Created St',
        nationalId: 'NID-CREATED',
        role: 'APPLICANT'
      })
    
    expect(res.status).toBe(201)
    expect(res.body.user.email).toBe(email)
    expect(res.body.user.role).toBe('APPLICANT')
    
    // Cleanup
    await cleanupUsersWithEmailPrefix('admincreated-')
  })

  it('ADMIN_TIER1 cannot delete users (403)', async () => {
    const agent = createAgent()
    const res = await agent
      .delete(`/api/auth/admin/users/${testUserId}`)
      .set('Authorization', `Bearer ${tier1Token}`)
    
    expect(res.status).toBe(403)
  })

  it('ADMIN_TIER2 can delete users (200)', async () => {
    // Create disposable user via Prisma (bypass permission issues)
    const disposableEmail = `delete-${Date.now()}@example.com`
    const user = await prisma.user.create({
      data: {
        email: disposableEmail,
        passwordHash: await bcrypt.hash(testPassword, 12),
        fullName: 'ToDelete',
        nationalIdOrPassport: 'NID-DEL',
        primaryPhone: '0990000000',
        physicalAddress: 'Delete St',
        role: 'APPLICANT'
      }
    })

    // Delete via API using ADMIN_TIER2 token
    const agent = createAgent()
    const deleteRes = await agent
      .delete(`/api/auth/admin/users/${user.id}`)
      .set('Authorization', `Bearer ${tier2Token}`)
    
    expect(deleteRes.status).toBe(200)
    expect(deleteRes.body.success).toBe(true)
  })

  it('APPLICANT cannot access admin endpoints (403)', async () => {
    const agent = createAgent()
    const res = await agent
      .get('/api/auth/admin/users')
      .set('Authorization', `Bearer ${applicantToken}`)
    
    expect(res.status).toBe(403)
  })
})

// ======================
// AUTH - USER DOCUMENTS TESTS
// ======================
describe('Auth - User Documents', () => {
  let userToken = ''
  let adminToken = ''
  let userId = ''
  
  // Store emails explicitly to avoid timestamp mismatch
  const docUserEmail = `docuser-${Date.now()}@example.com`
  const adminEmail = `docadmin-${Date.now()}@example.com`

  beforeAll(async () => {
    const agent = createAgent()
    
    // Create regular user with document
    const regRes = await agent.post('/api/auth/register').send({
      email: docUserEmail,
      password: testPassword,
      fullName: 'Doc User',
      primaryPhone: '0991111111',
      physicalAddress: 'Doc St',
      nationalId: 'NID-DOC',
      documents: [{
        fileName: 'id.png',
        base64: 'image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
        documentType: 'NATIONAL_ID_FRONT'
      }]
    })
    expect(regRes.status).toBe(201)
    userId = regRes.body.profile.id

    // Login as user
    const userLogin = await agent.post('/api/auth/login').send({
      email: docUserEmail,
      password: testPassword
    })
    userToken = userLogin.body.accessToken

    // Create admin user
    const adminHash = await bcrypt.hash(testPassword, 12)
    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash: adminHash,
        fullName: 'Doc Admin',
        nationalIdOrPassport: 'NID-DOCADMIN',
        primaryPhone: '0992222222',
        physicalAddress: 'Admin Doc St',
        role: 'ADMIN_TIER1'
      }
    })
    
    // Login as admin (REUSE adminEmail)
    const adminLogin = await agent.post('/api/auth/login').send({
      email: adminEmail, // ← FIXED: Reuse stored email
      password: testPassword
    })
    adminToken = adminLogin.body.accessToken
  })

  afterAll(async () => {
    await cleanupUsersWithEmailPrefix('docuser-')
    await cleanupUsersWithEmailPrefix('docadmin-')
  })

  it('user can retrieve own documents (200)', async () => {
    const agent = createAgent()
    const res = await agent
      .get('/api/auth/users/me/documents')
      .set('Authorization', `Bearer ${userToken}`)
    
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('documents')
    expect(Array.isArray(res.body.documents)).toBe(true)
    expect(res.body.documents.length).toBeGreaterThan(0)
    expect(res.body.documents[0].documentType).toBe('NATIONAL_ID_FRONT')
  })

  it('admin can retrieve another user\'s documents (200)', async () => {
    const agent = createAgent()
    const res = await agent
      .get(`/api/auth/users/${userId}/documents`)
      .set('Authorization', `Bearer ${adminToken}`)
    
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('documents')
    expect(Array.isArray(res.body.documents)).toBe(true)
    expect(res.body.documents.length).toBeGreaterThan(0)
  })

  it('non-admin cannot access another user\'s documents (403)', async () => {
    const agent = createAgent()
    
    // Create second regular user
    const otherEmail = `otheruser-${Date.now()}@example.com`
    await agent.post('/api/auth/register').send({
      email: otherEmail,
      password: testPassword,
      fullName: 'Other User',
      primaryPhone: '0993333333',
      physicalAddress: 'Other St',
      nationalId: 'NID-OTHER'
    })
    
    const otherLogin = await agent.post('/api/auth/login').send({
      email: otherEmail,
      password: testPassword
    })
    const otherToken = otherLogin.body.accessToken

    // Attempt to access first user's documents
    const res = await agent
      .get(`/api/auth/users/${userId}/documents`)
      .set('Authorization', `Bearer ${otherToken}`)
    
    expect(res.status).toBe(403)
    
    // Cleanup
    await cleanupUsersWithEmailPrefix('otheruser-')
  })
})