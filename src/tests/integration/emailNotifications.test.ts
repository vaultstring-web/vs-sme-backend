import 'dotenv/config'
import { describe, it, expect } from 'vitest'
import { emailService } from '../../services/email.service'
import { applicationDataEditedAdminTemplate, applicationStatusChangedAdminTemplate } from '../../utils/emailTemplates'

describe('Email notifications', () => {
  it('renders status change template', () => {
    const tpl = applicationStatusChangedAdminTemplate({
      applicationId: 'app-1',
      userId: 'user-1',
      actorId: 'admin-1',
      fromStatus: 'SUBMITTED',
      toStatus: 'UNDER_REVIEW',
      comment: 'Looks good',
    })
    expect(typeof tpl.subject).toBe('string')
    expect(typeof tpl.html).toBe('string')
    expect(typeof tpl.text).toBe('string')
    expect(tpl.subject).toContain('app-1')
  })

  it('renders data edit template', () => {
    const tpl = applicationDataEditedAdminTemplate({
      applicationId: 'app-2',
      userId: 'user-2',
      actorId: 'admin-2',
      type: 'SME',
      fields: ['businessName'],
      comment: 'Correction',
    })
    expect(typeof tpl.subject).toBe('string')
    expect(typeof tpl.html).toBe('string')
    expect(typeof tpl.text).toBe('string')
    expect(tpl.subject).toContain('app-2')
  })

  it('uses non-network transport in test environment', async () => {
    await expect(
      emailService.sendEmail({
        from: 'no-reply@example.com',
        to: 'admin@example.com',
        subject: 'Test',
        text: 'Hello',
      }),
    ).resolves.toBeUndefined()
  })
})

