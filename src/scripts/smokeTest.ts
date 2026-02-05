import 'dotenv/config'
import app from '../app'
import { prisma } from '../db/prisma'

async function run() {
  const server = app.listen(0)
  await new Promise<void>((resolve) => server.once('listening', () => resolve()))
  const address = server.address()
  const port = typeof address === 'object' && address ? address.port : 3000
  const baseUrl = `http://localhost:${port}`

  const headersJson = { 'Content-Type': 'application/json' }
  const req = async (method: string, path: string, body?: any, token?: string) => {
    const headers: any = { ...headersJson }
    if (token) headers['Authorization'] = `Bearer ${token}`
    const res = await fetch(`${baseUrl}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })
    const text = await res.text()
    let json: any
    try {
      json = JSON.parse(text)
    } catch {
      json = { raw: text }
    }
    return { status: res.status, json }
  }

  // Login
  const login = await req('POST', '/api/auth/login', { email: 'admin@example.com', password: 'AdminPass123!' })
  console.log('LOGIN', login.status, login.json)
  const token = (login.json.token || login.json.accessToken) as string
  if (login.status !== 200 || !token) throw new Error('Login failed')

  // Ping applications routes
  const ping = await req('GET', '/api/applications/_ping', undefined, token)
  console.log('PING', ping.status, ping.json)

  // Create SME application
  const smeBody = {
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
  const createSme = await req('POST', '/api/applications/sme', smeBody, token)
  console.log('CREATE_SME', createSme.status, createSme.json)
  if (createSme.status !== 201) throw new Error('Create SME failed')
  const appId = createSme.json.data.id as string

  // Save draft
  const draft = await req('PATCH', `/api/applications/${appId}/draft`, { estimatedMonthlyProfit: 180000 }, token)
  console.log('SAVE_DRAFT', draft.status, draft.json)

  // Add document metadata
  const doc = await req('POST', `/api/applications/${appId}/documents`, { fileName: 'invoice.pdf', fileUrl: 'https://example.com/invoice.pdf', documentType: 'business_proof' }, token)
  console.log('ADD_DOC', doc.status, doc.json)

  // Submit
  const submit = await req('PATCH', `/api/applications/${appId}/submit`, undefined, token)
  console.log('SUBMIT', submit.status, submit.json)

  server.close()
  await prisma.$disconnect()
}

run().catch(async (e) => {
  console.error('SMOKE TEST FAILED', e)
  try {
    // Attempt graceful shutdown
    await prisma.$disconnect()
  } catch {}
  await prisma.$disconnect()
  process.exit(1)
})
