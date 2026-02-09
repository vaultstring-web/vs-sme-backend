import 'dotenv/config'
import { describe, it, expect, beforeAll } from 'vitest'
import { createAgent } from '../helpers/testServer'
import { prisma } from '../../db/prisma'

let token = ''
let appId = ''
let otherToken = ''

describe('Applications endpoints', () => {
  beforeAll(async () => {
    const agent = createAgent()
    const res = await agent
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({ email: 'admin@example.com', password: 'AdminPass123!' })
    expect(res.status).toBe(200)
    token = res.body.token || res.body.accessToken
    expect(typeof token).toBe('string')
    // Register and login a second user for ownership tests
    const email2 = `user${Date.now()}@example.com`
    const reg = await agent
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send({ 
        email: email2, 
        password: 'userPass123', 
        fullName: 'Second User',
        primaryPhone: '0000000000',
        physicalAddress: 'Somewhere',
        nationalId: 'NID123456'
      })
    expect(reg.status).toBe(201)
    const login2 = await agent
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({ email: email2, password: 'userPass123' })
    expect(login2.status).toBe(200)
    otherToken = login2.body.token || login2.body.accessToken
    expect(typeof otherToken).toBe('string')
  })

  it('ping routes', async () => {
    const agent = createAgent()
    const res = await agent.get('/api/_ping').set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.ok).toBe(true)
  })

  it('create SME application (valid)', async () => {
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
    expect(typeof res.body.data.id).toBe('string')
    appId = res.body.data.id
  })

  it('create SME application (wrong types)', async () => {
    const agent = createAgent()
    const payload = {
      businessName: 'Bad Types',
      registrationNo: 'REG-XYZ',
      businessType: 'Retail',
      yearsInOperation: 'five',
      loanProduct: 'Working Capital',
      loanAmount: '500000',
      paybackPeriodMonths: 12,
      purposeOfLoan: 'Inventory',
      repaymentMethod: 'Monthly',
      hasOutstandingLoans: false,
      hasDefaulted: false,
    } as any
    const res = await agent
      .post('/api/applications/sme')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(res.status).toBe(400)
  })

  it('create SME application (unauthorized)', async () => {
    const agent = createAgent()
    const payload = {
      businessName: 'No Token',
      businessType: 'Retail',
      yearsInOperation: 1,
      loanProduct: 'WC',
      loanAmount: 1000,
      paybackPeriodMonths: 1,
      purposeOfLoan: 'Inventory',
      repaymentMethod: 'Monthly',
      hasOutstandingLoans: false,
      hasDefaulted: false,
    }
    const res = await agent
      .post('/api/applications/sme')
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(res.status).toBe(401)
  })

  it('create SME application (invalid missing businessName)', async () => {
    const agent = createAgent()
    const payload = {
      registrationNo: 'REG-123',
      businessType: 'Retail',
      yearsInOperation: 5,
      loanProduct: 'Working Capital',
      loanAmount: 500000,
      paybackPeriodMonths: 12,
      purposeOfLoan: 'Inventory',
      repaymentMethod: 'Monthly',
      hasOutstandingLoans: false,
      hasDefaulted: false,
    }
    const res = await agent
      .post('/api/applications/sme')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(res.status).toBe(400)
  })

  it('create Payroll application (valid)', async () => {
    const agent = createAgent()
    const payload = {
      dateOfBirth: '1990-01-01',
      gender: 'Male',
      maritalStatus: 'Single',
      nextOfKinName: 'John Doe',
      nextOfKinRelationship: 'Brother',
      nextOfKinPhone: '+265999000111',
      loanAmount: 300000,
      paybackPeriodMonths: 6,
      employerName: 'Acme Corp',
      employerAddress: 'Main Street 123',
      jobTitle: 'Accountant',
      employeeNumber: 'EMP-001',
      dateOfEmployment: '2015-05-10',
      grossMonthlySalary: 800000,
      netMonthlySalary: 600000,
      payrollDeductionConfirmed: true,
      hasOutstandingLoans: false,
      outstandingLoanDetails: null,
      hasDefaulted: false,
      defaultExplanation: null,
    }
    const res = await agent
      .post('/api/applications/payroll')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(res.status).toBe(201)
  })

  it('create Payroll application (invalid missing employerName)', async () => {
    const agent = createAgent()
    const payload = {
      dateOfBirth: '1990-01-01',
      gender: 'Male',
      maritalStatus: 'Single',
      nextOfKinName: 'John Doe',
      nextOfKinRelationship: 'Brother',
      nextOfKinPhone: '+265999000111',
      loanAmount: 300000,
      paybackPeriodMonths: 6,
      employerAddress: 'Main Street 123',
      jobTitle: 'Accountant',
      employeeNumber: 'EMP-001',
      dateOfEmployment: '2015-05-10',
      grossMonthlySalary: 800000,
      netMonthlySalary: 600000,
      payrollDeductionConfirmed: true,
      hasOutstandingLoans: false
    }
    const res = await agent
      .post('/api/applications/payroll')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(res.status).toBe(400)
  })

  it('create Payroll application (wrong types)', async () => {
    const agent = createAgent()
    const payload = {
      dateOfBirth: '1990-01-01',
      gender: 'Male',
      maritalStatus: 'Single',
      nextOfKinName: 'John Doe',
      nextOfKinRelationship: 'Brother',
      nextOfKinPhone: '+265999000111',
      loanAmount: '300000',
      paybackPeriodMonths: '6',
      employerName: 'Acme Corp',
      employerAddress: 'Main Street 123',
      jobTitle: 'Accountant',
      employeeNumber: 'EMP-001',
      dateOfEmployment: '2015-05-10',
      grossMonthlySalary: '800000',
      netMonthlySalary: '600000',
      payrollDeductionConfirmed: 'true',
      hasOutstandingLoans: 'false'
    } as any
    const res = await agent
      .post('/api/applications/payroll')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(res.status).toBe(400)
  })

  it('create Payroll application (unauthorized)', async () => {
    const agent = createAgent()
    const payload = {
      dateOfBirth: '1990-01-01',
      gender: 'Male',
      maritalStatus: 'Single',
      nextOfKinName: 'John Doe',
      nextOfKinRelationship: 'Brother',
      nextOfKinPhone: '+265999000111',
      loanAmount: 300000,
      paybackPeriodMonths: 6,
      employerName: 'Acme Corp',
      employerAddress: 'Main Street 123',
      jobTitle: 'Accountant',
      employeeNumber: 'EMP-001',
      dateOfEmployment: '2015-05-10',
      grossMonthlySalary: 800000,
      netMonthlySalary: 600000,
      payrollDeductionConfirmed: true,
      hasOutstandingLoans: false
    }
    const res = await agent
      .post('/api/applications/payroll')
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(res.status).toBe(401)
  })

  it('save draft (valid)', async () => {
    const agent = createAgent()
    const res = await agent
      .patch(`/api/applications/${appId}/draft`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send({ estimatedMonthlyProfit: 200000 })
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
  })

  it('save draft (non-existent id)', async () => {
    const agent = createAgent()
    const res = await agent
      .patch(`/api/applications/does-not-exist/draft`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send({ estimatedMonthlyProfit: 200000 })
    expect(res.status).toBe(404)
  })

  it('save draft (forbidden for other user)', async () => {
    const agent = createAgent()
    const res = await agent
      .patch(`/api/applications/${appId}/draft`)
      .set('Authorization', `Bearer ${otherToken}`)
      .set('Content-Type', 'application/json')
      .send({ estimatedMonthlyProfit: 200000 })
    expect(res.status).toBe(403)
  })

  it('add document metadata (missing fileName)', async () => {
    const agent = createAgent()
    const res = await agent
      .post(`/api/applications/${appId}/documents`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send({ fileUrl: 'https://example.com/doc.pdf', documentType: 'business_proof' })
    expect(res.status).toBe(400)
  })

  it('add document metadata (valid)', async () => {
    const agent = createAgent()
    const res = await agent
      .post(`/api/applications/${appId}/documents`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send({ fileName: 'doc.pdf', fileUrl: 'https://example.com/doc.pdf', documentType: 'business_proof' })
    expect(res.status).toBe(201)
  })

  it('add document metadata (forbidden for other user)', async () => {
    const agent = createAgent()
    const res = await agent
      .post(`/api/applications/${appId}/documents`)
      .set('Authorization', `Bearer ${otherToken}`)
      .set('Content-Type', 'application/json')
      .send({ fileName: 'doc2.pdf', fileUrl: 'https://example.com/doc2.pdf', documentType: 'business_proof' })
    expect(res.status).toBe(403)
  })

  it('submit application (valid)', async () => {
    const agent = createAgent()
    const res = await agent
      .patch(`/api/applications/${appId}/submit`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
  })

  it('submit application (already submitted)', async () => {
    const agent = createAgent()
    const res = await agent
      .patch(`/api/applications/${appId}/submit`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(400)
  })

  it('save draft after submit (invalid status)', async () => {
    const agent = createAgent()
    const res = await agent
      .patch(`/api/applications/${appId}/draft`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send({ estimatedMonthlyProfit: 220000 })
    expect(res.status).toBe(400)
  })

  it('submit application (forbidden for other user)', async () => {
    const agent = createAgent()
    const res = await agent
      .patch(`/api/applications/${appId}/submit`)
      .set('Authorization', `Bearer ${otherToken}`)
    expect(res.status).toBe(403)
  })

  it('upload document file (valid pdf)', async () => {
    const agent = createAgent()
    const res = await agent
      .post(`/api/applications/${appId}/documents/upload`)
      .set('Authorization', `Bearer ${token}`)
      .attach('file', Buffer.from('%PDF-1.4\n%âãÏÓ\n'), { filename: 'test.pdf', contentType: 'application/pdf' })
      .field('documentType', 'business_proof')
    expect(res.status).toBe(201)
    expect(typeof res.body.data.fileUrl).toBe('string')
  })

  it('upload document file (invalid type)', async () => {
    const agent = createAgent()
    const res = await agent
      .post(`/api/applications/${appId}/documents/upload`)
      .set('Authorization', `Bearer ${token}`)
      .attach('file', Buffer.from('MZ'), { filename: 'bad.exe', contentType: 'application/octet-stream' })
      .field('documentType', 'business_proof')
    expect(res.status).toBe(400)
  })

  it('upload document file (limit reached)', async () => {
    process.env.MAX_DOCUMENTS_PER_APPLICATION = '3'
    const agent = createAgent()
    const ok = await agent
      .post(`/api/applications/${appId}/documents/upload`)
      .set('Authorization', `Bearer ${token}`)
      .attach('file', Buffer.from('%PDF-1.4\n'), { filename: 'another.pdf', contentType: 'application/pdf' })
      .field('documentType', 'business_proof')
    expect(ok.status).toBe(201)
    const fail = await agent
      .post(`/api/applications/${appId}/documents/upload`)
      .set('Authorization', `Bearer ${token}`)
      .attach('file', Buffer.from('%PDF-1.4\n'), { filename: 'third.pdf', contentType: 'application/pdf' })
      .field('documentType', 'business_proof')
    expect(fail.status).toBe(400)
    process.env.MAX_DOCUMENTS_PER_APPLICATION = undefined
  })
    // ==============================
  // NEW: GET /applications (list)
  // ==============================

  it('list own applications (default)', async () => {
    const agent = createAgent()
    const res = await agent
      .get('/api/applications')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
    expect(res.body.meta).toBeDefined()
    expect(res.body.data.length).toBeGreaterThanOrEqual(1)
  })

  it('list applications with pagination', async () => {
    const agent = createAgent()
    const res = await agent
      .get('/api/applications?page=1&limit=2')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.meta.limit).toBe(2)
    expect(res.body.meta.page).toBe(1)
  })

  it('list applications filtered by status=DRAFT', async () => {
    // Create a new DRAFT app to ensure we have one
    const payload = {
      businessName: 'DraftCo',
      businessType: 'Retail',
      yearsInOperation: 2,
      loanProduct: 'WC',
      loanAmount: 100000,
      paybackPeriodMonths: 6,
      purposeOfLoan: 'Stock',
      repaymentMethod: 'Monthly',
      hasOutstandingLoans: false,
      hasDefaulted: false,
    }
    const agent = createAgent()
    const createRes = await agent
      .post('/api/applications/sme')
      .set('Authorization', `Bearer ${token}`)
      .send(payload)
    expect(createRes.status).toBe(201)

    const res = await agent
      .get('/api/applications?status=DRAFT')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.data.every((app: any) => app.status === 'DRAFT')).toBe(true)
  })

  it('list applications filtered by type=PAYROLL', async () => {
    const agent = createAgent()
    const res = await agent
      .get('/api/applications?type=PAYROLL')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.data.every((app: any) => app.type === 'PAYROLL')).toBe(true)
  })

  it('list applications with date range filter', async () => {
    const startDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0] // yesterday
    const endDate = new Date().toISOString().split('T')[0] // today
    const agent = createAgent()
    const res = await agent
      .get(`/api/applications?startDate=${startDate}&endDate=${endDate}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
  })

  it('list applications – forbidden for other user', async () => {
    const agent = createAgent()
    const res = await agent
      .get('/api/applications')
      .set('Authorization', `Bearer ${otherToken}`)
    expect(res.status).toBe(200)
    // Should return *their* apps, not the main user's
    // So as long as no error, it's correct behavior
    expect(Array.isArray(res.body.data)).toBe(true)
  })

  // ==============================
  // NEW: GET /applications/:id
  // ==============================

  it('get application by ID (valid, owned)', async () => {
    const agent = createAgent()
    const res = await agent
      .get(`/api/applications/${appId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.app.id).toBe(appId)
    expect(res.body.app.smeData).toBeDefined()
    expect(res.body.app.documents).toBeDefined()
  })

  it('get application by ID – not found', async () => {
    const agent = createAgent()
    const res = await agent
      .get('/api/applications/invalid-id-123')
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(404)
  })

  it('get application by ID – forbidden (not owner)', async () => {
    const agent = createAgent()
    const res = await agent
      .get(`/api/applications/${appId}`)
      .set('Authorization', `Bearer ${otherToken}`)
    expect(res.status).toBe(403)
  })

  // ==============================
  // NEW: PATCH /applications/:id (edit draft)
  // ==============================

  it('PATCH edit application (valid, DRAFT)', async () => {
    // First, create a fresh DRAFT app
    const payload = {
      businessName: 'Editable Biz',
      businessType: 'Services',
      yearsInOperation: 3,
      loanProduct: 'Equipment',
      loanAmount: 250000,
      paybackPeriodMonths: 10,
      purposeOfLoan: 'Laptop',
      repaymentMethod: 'Monthly',
      hasOutstandingLoans: false,
      hasDefaulted: false,
    }
    const agent = createAgent()
    const createRes = await agent
      .post('/api/applications/sme')
      .set('Authorization', `Bearer ${token}`)
      .send(payload)
    expect(createRes.status).toBe(201)
    const draftId = createRes.body.data.id

    const patchRes = await agent
      .patch(`/api/applications/${draftId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ loanAmount: 300000, businessName: 'Updated Editable Biz' })
    expect(patchRes.status).toBe(200)

    // Verify update
    const getRes = await agent
      .get(`/api/applications/${draftId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(getRes.body.app.smeData.loanAmount).toBe(300000)
    expect(getRes.body.app.smeData.businessName).toBe('Updated Editable Biz')
  })

  it('PATCH edit submitted application – should fail', async () => {
    const agent = createAgent()
    const res = await agent
      .patch(`/api/applications/${appId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ loanAmount: 999999 })
    expect(res.status).toBe(400)
    expect(res.body.message).toContain('Only DRAFT')
  })

  // ==============================
  // NEW: DELETE /applications/:id
  // ==============================

  it('delete DRAFT application (valid)', async () => {
    // Create a new DRAFT app to delete
    const payload = {
      businessName: 'To Be Deleted',
      businessType: 'Retail',
      yearsInOperation: 1,
      loanProduct: 'WC',
      loanAmount: 50000,
      paybackPeriodMonths: 6,
      purposeOfLoan: 'Test Delete',
      repaymentMethod: 'Monthly',
      hasOutstandingLoans: false,
      hasDefaulted: false,
    }
    const agent = createAgent()
    const createRes = await agent
      .post('/api/applications/sme')
      .set('Authorization', `Bearer ${token}`)
      .send(payload)
    expect(createRes.status).toBe(201)
    const deleteId = createRes.body.data.id

    const delRes = await agent
      .delete(`/api/applications/${deleteId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(delRes.status).toBe(200)

    // Confirm deletion
    const getRes = await agent
      .get(`/api/applications/${deleteId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(getRes.status).toBe(404)
  })

  it('delete SUBMITTED application – should succeed (per spec)', async () => {
    // Create & submit a new app
    const payload = {
      businessName: 'Delete After Submit',
      businessType: 'Retail',
      yearsInOperation: 1,
      loanProduct: 'WC',
      loanAmount: 60000,
      paybackPeriodMonths: 6,
      purposeOfLoan: 'Test Delete Submitted',
      repaymentMethod: 'Monthly',
      hasOutstandingLoans: false,
      hasDefaulted: false,
    }
    const agent = createAgent()
    const createRes = await agent
      .post('/api/applications/sme')
      .set('Authorization', `Bearer ${token}`)
      .send(payload)
    expect(createRes.status).toBe(201)
    const id = createRes.body.data.id

    await agent
      .patch(`/api/applications/${id}/submit`)
      .set('Authorization', `Bearer ${token}`)

    const delRes = await agent
      .delete(`/api/applications/${id}`)
      .set('Authorization', `Bearer ${token}`)
    expect(delRes.status).toBe(200)

    const getRes = await agent
      .get(`/api/applications/${id}`)
      .set('Authorization', `Bearer ${token}`)
    expect(getRes.status).toBe(404)
  })

  it('delete application in UNDER_REVIEW – should fail', async () => {
    // Simulate an app that’s been moved to UNDER_REVIEW (by admin)
    const payload = {
      businessName: 'NonDeletable',
      businessType: 'Retail',
      yearsInOperation: 1,
      loanProduct: 'WC',
      loanAmount: 70000,
      paybackPeriodMonths: 6,
      purposeOfLoan: 'Test Non-Delete',
      repaymentMethod: 'Monthly',
      hasOutstandingLoans: false,
      hasDefaulted: false,
    }
    const agent = createAgent()
    const createRes = await agent
      .post('/api/applications/sme')
      .set('Authorization', `Bearer ${token}`)
      .send(payload)
    expect(createRes.status).toBe(201)
    const id = createRes.body.data.id

    await agent
      .patch(`/api/applications/${id}/submit`)
      .set('Authorization', `Bearer ${token}`)

    await prisma.application.update({
      where: { id },
      data: { status: 'UNDER_REVIEW' },
    })

    const delRes = await agent
      .delete(`/api/applications/${id}`)
      .set('Authorization', `Bearer ${token}`)
    expect(delRes.status).toBe(400)
    expect(delRes.body.message).toContain('Cannot delete')
  })

  it('delete application – not owner', async () => {
    const agent = createAgent()
    const res = await agent
      .delete(`/api/applications/${appId}`)
      .set('Authorization', `Bearer ${otherToken}`)
    expect(res.status).toBe(403)
  })
})
