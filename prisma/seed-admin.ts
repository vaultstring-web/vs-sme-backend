import { prisma } from '../src/db/prisma'
import bcrypt from 'bcrypt'



async function seedAdmin() {
  const adminEmail = 'admin@example.com'
  
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  })

  if (existingAdmin) {
    console.log('Admin user already exists')
    return
  }

  const passwordHash = await bcrypt.hash('AdminPass123!', 12)

  await prisma.user.create({
    data: {
      email: adminEmail,
      passwordHash,
      fullName: 'System Administrator',
      nationalIdOrPassport: 'ADMIN001',
      primaryPhone: '+265123456789',
      physicalAddress: 'System Administration Building',
      role: 'ADMIN_TIER1',
    },
  })

  console.log('Admin user created successfully')
}

seedAdmin()
  .catch((error) => {
    console.error('Error seeding admin:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })