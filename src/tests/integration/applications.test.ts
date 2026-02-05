import 'dotenv/config'
import { describe, it, expect, beforeAll } from 'vitest'
import { createAgent } from '../helpers/testServer'

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
    const res = await agent.get('/api/applications/_ping').set('Authorization', `Bearer ${token}`)
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
})
