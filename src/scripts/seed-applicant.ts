import * as bcrypt from 'bcrypt'
import * as fs from 'fs/promises'
import * as path from 'path'
import 'dotenv/config'

import { prisma } from '../db/prisma'

const TEST_DATA_DIR = path.join(__dirname, '..', 'tests', 'test-data')
const UPLOADS_DIR = path.join(process.cwd(), 'uploads')

// Realistic test data for applicant
const APPLICANT_DATA = {
  email: 'applicant@example.com',
  password: 'SecurePass123!',  // Plain-text password for display only (NOT stored in DB)
  fullName: 'Jane Mwamba',
  nationalIdOrPassport: 'MWK-APPLICANT-789012',
  primaryPhone: '+265991234567',
  secondaryPhone: '+265881234567',
  physicalAddress: 'Plot 45, Area 3, Lilongwe, Malawi',
  postalAddress: 'P.O. Box 1234, Lilongwe',
  role: 'APPLICANT' as const,
}

// SME Application data (will be submitted)
const SME_APPLICATION = {
  businessName: 'Mwamba Agri-Processing Ltd',
  businessType: 'Agricultural Processing',
  yearsInOperation: 4,
  registrationNo: 'RC-MW-78901234',
  loanProduct: 'Business Expansion Loan',
  loanAmount: 1500000,
  paybackPeriodMonths: 24,
  purposeOfLoan: 'Purchase new maize milling equipment and expand storage facility',
  repaymentMethod: 'Monthly installments via business account',
  estimatedMonthlyTurnover: 450000,
  estimatedMonthlyProfit: 120000,
  groupName: 'Lilongwe Farmers Co-op',
  groupMemberCount: 12,
  hasOutstandingLoans: false,
  hasDefaulted: false,
}

// PAYROLL Application data (left as DRAFT)
const PAYROLL_APPLICATION = {
  gender: 'Female',
  maritalStatus: 'Married',
  nextOfKinName: 'David Mwamba',
  nextOfKinRelationship: 'Spouse',
  nextOfKinPhone: '+265997654321',
  loanAmount: 350000,
  paybackPeriodMonths: 18,
  employerName: 'National Bank of Malawi',
  employerAddress: 'City Centre, Lilongwe, Malawi',
  jobTitle: 'Senior Credit Officer',
  employeeNumber: 'NBM-SCO-7890',
  dateOfBirth: new Date('1988-05-15'),
  dateOfEmployment: new Date('2015-03-10'),
  grossMonthlySalary: 185000,
  netMonthlySalary: 142000,
  payrollDeductionConfirmed: true,
  hasOutstandingLoans: true,
  outstandingLoanDetails: 'Small personal loan with NBM (MWK 50,000), due Dec 2026',
  hasDefaulted: false,
}

// Document mappings
const USER_DOCUMENTS = [
  { source: 'test-image.jpg', type: 'PROFILE_PICTURE' as const, destSubdir: '' },
  { source: 'test-image.jpg', type: 'NATIONAL_ID_FRONT' as const, destSubdir: '' },
  { source: 'test-image.jpg', type: 'NATIONAL_ID_BACK' as const, destSubdir: '' },
  { source: 'test-document.pdf', type: 'PROOF_OF_ADDRESS' as const, destSubdir: '' },
]

const SME_DOCUMENTS = [
  { source: 'test-document.pdf', type: 'BUSINESS_REGISTRATION' as const, destSubdir: 'applications' },
  { source: 'test-image.jpg', type: 'FINANCIAL_STATEMENT' as const, destSubdir: 'applications' },
  { source: 'test-file.txt', type: 'TAX_CERTIFICATE' as const, destSubdir: 'applications' },
]

async function copyFileWithUniqueName(
  sourceFile: string,
  destDir: string,
  originalName: string
): Promise<{ uniqueFilename: string; fileUrl: string }> {
  await fs.mkdir(destDir, { recursive: true })
  
  const ext = path.extname(originalName)
  const name = path.basename(originalName, ext)
  const uniqueFilename = `${name}-${Date.now()}-${Math.floor(Math.random() * 10000)}${ext}`
  const destPath = path.join(destDir, uniqueFilename)
  
  await fs.copyFile(sourceFile, destPath)
  
  // Generate URL path matching application structure
  const relativePath = path.relative(process.cwd(), destPath).replace(/\\/g, '/')
  return {
    uniqueFilename,
    fileUrl: `/${relativePath}`,
  }
}

async function seedUserDocuments(userId: string) {
  console.log('\n📁 Seeding user documents...')
  const userUploadDir = path.join(UPLOADS_DIR, userId)
  
  for (const doc of USER_DOCUMENTS) {
    const sourcePath = path.join(TEST_DATA_DIR, doc.source)
    const { uniqueFilename, fileUrl } = await copyFileWithUniqueName(
      sourcePath,
      userUploadDir,
      doc.source
    )
    
    await prisma.userDocument.create({
      data: {
        userId,
        fileName: doc.source,
        fileUrl,
        documentType: doc.type,
        isVerified: Math.random() > 0.3, // Randomly verify some docs
        verifiedAt: Math.random() > 0.5 ? new Date() : null,
      },
    })
    console.log(`  ✓ ${doc.type}: ${uniqueFilename}`)
  }
}

async function seedApplicationDocuments(applicationId: string, documents: typeof SME_DOCUMENTS) {
  console.log('\n📁 Seeding application documents...')
  const appUploadDir = path.join(UPLOADS_DIR, 'applications', applicationId)
  
  for (const doc of documents) {
    const sourcePath = path.join(TEST_DATA_DIR, doc.source)
    const { uniqueFilename, fileUrl } = await copyFileWithUniqueName(
      sourcePath,
      appUploadDir,
      doc.source
    )
    
    await prisma.document.create({
      data: {
        applicationId,
        fileName: doc.source,
        fileUrl,
        documentType: doc.type,
      },
    })
    console.log(`  ✓ ${doc.type}: ${uniqueFilename}`)
  }
}

async function main() {
  console.log('🌱 Starting applicant seeding process...\n')
  
  // Verify test files exist
  for (const file of [...USER_DOCUMENTS, ...SME_DOCUMENTS]) {
    const filePath = path.join(TEST_DATA_DIR, file.source)
    try {
      await fs.access(filePath)
    } catch {
      throw new Error(`Missing test file: ${filePath}. Ensure test-data directory contains required files.`)
    }
  }

  // Cleanup existing applicant
  console.log('🧹 Cleaning up existing applicant data...')
  await prisma.user.deleteMany({ where: { email: APPLICANT_DATA.email } })
  console.log('✅ Cleanup complete')

  // Create user
  console.log('\n👤 Creating applicant user...')
  const passwordHash = await bcrypt.hash(APPLICANT_DATA.password, 12)
  
  // ✅ FIXED: Explicit field mapping instead of spreading APPLICANT_DATA
  // This prevents the 'password' field from being passed to Prisma
  const user = await prisma.user.create({
    data: {
      email: APPLICANT_DATA.email,
      passwordHash,  // ✅ Only passwordHash stored in database
      fullName: APPLICANT_DATA.fullName,
      nationalIdOrPassport: APPLICANT_DATA.nationalIdOrPassport,
      primaryPhone: APPLICANT_DATA.primaryPhone,
      secondaryPhone: APPLICANT_DATA.secondaryPhone,
      physicalAddress: APPLICANT_DATA.physicalAddress,
      postalAddress: APPLICANT_DATA.postalAddress,
      role: APPLICANT_DATA.role,
    },
    select: { id: true, email: true, fullName: true },
  })
  console.log(`✅ User created: ${user.fullName} (${user.email})`)

  // Seed user documents
  await seedUserDocuments(user.id)

  // Create SME Application (will be submitted)
  console.log('\n📝 Creating SME application (will submit)...')
  const smeApp = await prisma.application.create({
    data: {
      userId: user.id,
      type: 'SME',
      status: 'DRAFT',
    },
  })

  await prisma.smeApplicationData.create({
    data: {
      ...SME_APPLICATION,
      applicationId: smeApp.id,
    },
  })
  console.log('✅ SME application draft created')

  // Submit SME application
  const submittedAt = new Date()
  await prisma.application.update({
    where: { id: smeApp.id },
    data: { status: 'SUBMITTED', submittedAt },
  })
  await prisma.auditLog.create({
    data: {
      applicationId: smeApp.id,
      actorId: user.id,
      action: 'SUBMITTED',
    },
  })
  console.log('✅ SME application SUBMITTED')

  // Seed SME application documents
  await seedApplicationDocuments(smeApp.id, SME_DOCUMENTS)

  // Create PAYROLL Application (left as DRAFT)
  console.log('\n📝 Creating PAYROLL application (DRAFT status)...')
  const payrollApp = await prisma.application.create({
    data: {
      userId: user.id,
      type: 'PAYROLL',
      status: 'DRAFT',
    },
  })

  await prisma.payrollApplicationData.create({
    data: {
      ...PAYROLL_APPLICATION,
      applicationId: payrollApp.id,
    },
  })
  console.log('✅ PAYROLL application draft created (not submitted)')

  // Final summary
  console.log('\n' + '='.repeat(60))
  console.log('✅ SEEDING COMPLETE!')
  console.log('='.repeat(60))
  console.log(`📧 Login email: ${APPLICANT_DATA.email}`)
  console.log(`🔑 Password (for login): ${APPLICANT_DATA.password}`)
  console.log(`👥 User ID: ${user.id}`)
  console.log(`📄 SME Application ID (SUBMITTED): ${smeApp.id}`)
  console.log(`📄 PAYROLL Application ID (DRAFT): ${payrollApp.id}`)
  console.log(`📁 Documents seeded: ${USER_DOCUMENTS.length + SME_DOCUMENTS.length}`)
  console.log('='.repeat(60))
  console.log('\n💡 Next steps:')
  console.log('   - Start backend: pnpm dev')
  console.log('   - Login with credentials above')
  console.log('   - View applications in UI or via API')
  console.log('   - Test document downloads at seeded URLs')
}

main()
  .catch((error) => {
    console.error('\n❌ SEEDING FAILED:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })