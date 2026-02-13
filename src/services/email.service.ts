import nodemailer, { type Transporter } from 'nodemailer'
import { env } from '../config/env'
import fs from 'node:fs'

export type EmailTemplate = {
  subject: string
  html?: string
  text?: string
}

type SendEmailArgs = EmailTemplate & {
  to: string | string[]
  from?: string
  replyTo?: string
}

type EmailConfig = {
  enabled: boolean
  host?: string
  port?: number
  user?: string
  pass?: string
  secure?: boolean
  tlsRejectUnauthorized?: boolean
  tlsServername?: string
  tlsCaFile?: string
  fromEmail?: string
  toEmail?: string
}

function readEmailConfigFromEnv(): EmailConfig {
  return {
    enabled: env.EMAIL_ENABLED,
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
    secure: env.SMTP_SECURE || env.SMTP_PORT === 465,
    tlsRejectUnauthorized: env.SMTP_TLS_REJECT_UNAUTHORIZED,
    tlsServername: env.SMTP_TLS_SERVERNAME,
    tlsCaFile: env.SMTP_TLS_CA_FILE,
    fromEmail: env.EMAIL_FROM,
    toEmail: env.EMAIL_TO,
  }
}

function createTransporter(cfg: EmailConfig): Transporter {
  if (env.NODE_ENV === 'test' || !cfg.enabled) {
    return nodemailer.createTransport({ jsonTransport: true })
  }

  if (!cfg.host || !cfg.port || !cfg.user || !cfg.pass) {
    return nodemailer.createTransport({ jsonTransport: true })
  }

  const ca =
  cfg.tlsCaFile && cfg.tlsCaFile.trim().length > 0 && fs.existsSync(cfg.tlsCaFile)
    ? fs.readFileSync(cfg.tlsCaFile, 'utf8')
    : undefined

  return nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure ?? cfg.port === 465,
    auth: {
      user: cfg.user,
      pass: cfg.pass,
    },
    tls: {
      rejectUnauthorized: cfg.tlsRejectUnauthorized ?? true,
      servername: cfg.tlsServername,
      ca,
    },
  })
}

class EmailService {
  private cfg: EmailConfig
  private transporter: Transporter

  constructor() {
    this.cfg = readEmailConfigFromEnv()
    this.transporter = createTransporter(this.cfg)
  }

  isEnabled() {
    return this.cfg.enabled && env.NODE_ENV !== 'test'
  }

  getAdminRecipient(): string | undefined {
    return this.cfg.toEmail
  }

  getDefaultFrom(): string | undefined {
    return this.cfg.fromEmail
  }

  async sendEmail(args: SendEmailArgs) {
    const from = args.from ?? this.getDefaultFrom()
    if (!from) throw new Error('EMAIL_FROM is required')

    await this.transporter.sendMail({
      from,
      to: args.to,
      replyTo: args.replyTo,
      subject: args.subject,
      html: args.html,
      text: args.text,
    })
  }
}

export const emailService = new EmailService()
