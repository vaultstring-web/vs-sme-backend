import 'dotenv/config'
import { env } from '../config/env'
import bcrypt from 'bcrypt'
import { prisma } from '../db/prisma'

async function createAdmin() {
  const email = process.argv[2] || 'admin@vaultstring.com'
  const password = process.argv[3] || 'admin123'
  const role = 'ADMIN_TIER1'

  console.log(`Creating admin user: ${email}`)

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      console.log('User already exists')
      return
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        fullName: 'System Administrator',
        nationalIdOrPassport: 'ADMIN001',
        primaryPhone: '0000000000',
        physicalAddress: 'System',
        role,
      },
    })

    console.log(`Admin user created with ID: ${user.id}`)
  } catch (error) {
    console.error('Error creating admin user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()
