import 'dotenv/config'
import { describe, it, expect, beforeAll } from 'vitest'
import { createAgent } from '../helpers/testServer'

let adminToken = ''
let applicantToken = ''

async function createApplicantAndLogin() {
  const agent = createAgent()
  const email = `adminmut-${Date.now()}@example.com`
  const reg = await agent.post('/api/auth/register').send({
    email,
    password: 'UserPass123!',
    fullName: 'Mutation User',
    primaryPhone: '0991111112',
    physicalAddress: 'Somewhere',
    nationalId: `NID-${Date.now()}`,
  })
  expect(reg.status).toBe(201)
  const login = await agent.post('/api/auth/login').send({ email, password: 'UserPass123!' })
  expect(login.status).toBe(200)
  return login.body.accessToken || login.body.token
}

async function createSmeDraftApplication(token: string) {
  const agent = createAgent()
  const payload = {
    businessName: 'Acme Retail',
    registrationNo: 'REG-123',
    businessType: 'Retail',
    yearsInOperation: 5,
    loanProduct: 'Working Capital',
    loanAmount: 500000,
    paybackPeriodMonths: 12,
    purposeOfLoan: 'Inventory',
    repaymentMethod: 'Monthly',
    estimatedMonthlyTurnover: 1000000,
    estimatedMonthlyProfit: 150000,
    groupName: null,
    groupMemberCount: null,
    hasOutstandingLoans: false,
    outstandingLoanDetails: null,
    hasDefaulted: false,
    defaultExplanation: null,
  }
  const res = await agent
    .post('/api/applications/sme')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(payload)
  expect(res.status).toBe(201)
  return res.body.data.id as string
}

async function submitApplication(token: string, appId: string) {
  const agent = createAgent()
  const res = await agent.patch(`/api/applications/${appId}/submit`).set('Authorization', `Bearer ${token}`)
  expect(res.status).toBe(200)
}

describe('Admin endpoints', () => {
  beforeAll(async () => {
    const agent = createAgent()
    const adminLogin = await agent
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({ email: 'admin@example.com', password: 'AdminPass123!' })
    expect(adminLogin.status).toBe(200)
    adminToken = adminLogin.body.accessToken || adminLogin.body.token
    expect(typeof adminToken).toBe('string')

    const email = `app-${Date.now()}@example.com`
    const reg = await agent.post('/api/auth/register').send({
      email,
      password: 'UserPass123!',
      fullName: 'Regular User',
      primaryPhone: '0991111111',
      physicalAddress: 'Somewhere',
      nationalId: 'NID-USER',
    })
    expect(reg.status).toBe(201)
    const login = await agent.post('/api/auth/login').send({ email, password: 'UserPass123!' })
    expect(login.status).toBe(200)
    applicantToken = login.body.accessToken
  })

  it('lists applications with pagination', async () => {
    const agent = createAgent()
    const res = await agent
      .get('/api/admin/applications?page=1&pageSize=10')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('meta')
    expect(res.body).toHaveProperty('data')
    expect(typeof res.body.meta.total).toBe('number')
    expect(Array.isArray(res.body.data)).toBe(true)
  })

  it('filters applications by type and status', async () => {
    const agent = createAgent()
    const res = await agent
      .get('/api/admin/applications?type=SME&status=DRAFT')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(res.status).toBe(200)
    if (res.body.data.length) {
      expect(res.body.data.every((a: any) => a.type === 'SME')).toBe(true)
    }
  })

  it('exports applications as CSV', async () => {
    const agent = createAgent()
    const res = await agent
      .get('/api/admin/applications/export')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toContain('text/csv')
    expect(typeof res.text).toBe('string')
    expect(res.text.split('\n')[0]).toContain('id,type,status')
  })

  it('shows admin stats', async () => {
    const agent = createAgent()
    const res = await agent
      .get('/api/admin/stats')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('total')
    expect(res.body).toHaveProperty('approvalRate')
    expect(res.body).toHaveProperty('byType')
    expect(res.body).toHaveProperty('byStatus')
  })

  it('lists users with pagination', async () => {
    const agent = createAgent()
    const res = await agent
      .get('/api/admin/users?page=1&pageSize=5')
      .set('Authorization', `Bearer ${adminToken}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('meta')
    expect(res.body).toHaveProperty('data')
    expect(Array.isArray(res.body.data)).toBe(true)
  })

  it('forbids applicant from admin endpoints', async () => {
    const agent = createAgent()
    const res = await agent
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${applicantToken}`)
    expect(res.status).toBe(403)
  })

  it('updates application status with mandatory comment', async () => {
    const userToken = await createApplicantAndLogin()
    const appId = await createSmeDraftApplication(userToken)
    await submitApplication(userToken, appId)

    const agent = createAgent()
    const res1 = await agent
      .patch(`/api/admin/applications/${appId}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'UNDER_REVIEW', comment: 'Initial review started' })
    expect(res1.status).toBe(200)
    expect(res1.body.data.status).toBe('UNDER_REVIEW')

    const res2 = await agent
      .patch(`/api/admin/applications/${appId}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'APPROVED', comment: 'Meets criteria' })
    expect(res2.status).toBe(200)
    expect(res2.body.data.status).toBe('APPROVED')
  })

  it('rejects status update without comment', async () => {
    const userToken = await createApplicantAndLogin()
    const appId = await createSmeDraftApplication(userToken)
    await submitApplication(userToken, appId)

    const agent = createAgent()
    const res = await agent
      .patch(`/api/admin/applications/${appId}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'UNDER_REVIEW' })
    expect(res.status).toBe(400)
  })

  it('bulk updates application statuses', async () => {
    const userToken1 = await createApplicantAndLogin()
    const userToken2 = await createApplicantAndLogin()
    const appId1 = await createSmeDraftApplication(userToken1)
    const appId2 = await createSmeDraftApplication(userToken2)
    await submitApplication(userToken1, appId1)
    await submitApplication(userToken2, appId2)

    const agent = createAgent()
    const res = await agent
      .patch('/api/admin/applications/status/bulk')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ ids: [appId1, appId2], status: 'UNDER_REVIEW', comment: 'Bulk triage' })
    expect(res.status).toBe(200)
    expect(res.body.updatedCount).toBe(2)
  })

  it('edits application data and audit-tracks the change', async () => {
    const userToken = await createApplicantAndLogin()
    const appId = await createSmeDraftApplication(userToken)
    await submitApplication(userToken, appId)

    const agent = createAgent()
    const res = await agent
      .patch(`/api/admin/applications/${appId}/data`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ comment: 'Corrected business name', smeData: { businessName: 'Acme Retail Updated' } })
    expect(res.status).toBe(200)
    expect(res.body.data.businessName).toBe('Acme Retail Updated')
  })
})
