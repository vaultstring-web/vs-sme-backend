import 'dotenv/config'
import { emailService } from '../services/email.service'

async function main() {
  const to = process.env.EMAIL_TO ?? process.env.TO_EMAIL
  if (!to) throw new Error('EMAIL_TO (or TO_EMAIL) is required')

  const from = process.env.EMAIL_FROM ?? process.env.FROM_EMAIL ?? 'no-reply@vaultstring.com'

  const subject = `vs-sme-backend SMTP test ${new Date().toISOString()}`
  const text = 'If you received this email, SMTP is working.'

  await emailService.sendEmail({ to, from, subject, text })
}

main()
  .then(() => {
    process.stdout.write('Test email sent.\n')
    process.exit(0)
  })
  .catch(err => {
    const msg = err instanceof Error ? err.message : String(err)
    process.stderr.write(`Test email failed: ${msg}\n`)
    process.exit(1)
  })

