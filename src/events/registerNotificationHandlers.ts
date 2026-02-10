import { logger } from '../config/logger'
import { emailService } from '../services/email.service'
import { applicationDataEditedAdminTemplate, applicationStatusChangedAdminTemplate } from '../utils/emailTemplates'
import { applicationEvents, type ApplicationDataEditedEvent, type ApplicationStatusChangedEvent } from './applicationEvents'

async function onApplicationStatusChanged(e: ApplicationStatusChangedEvent) {
  const to = emailService.getAdminRecipient()
  if (!emailService.isEnabled() || !to) return
  const tpl = applicationStatusChangedAdminTemplate(e)
  await emailService.sendEmail({ to, ...tpl })
}

async function onApplicationDataEdited(e: ApplicationDataEditedEvent) {
  const to = emailService.getAdminRecipient()
  if (!emailService.isEnabled() || !to) return
  const tpl = applicationDataEditedAdminTemplate(e)
  await emailService.sendEmail({ to, ...tpl })
}

applicationEvents.on('application.status.changed', (e: ApplicationStatusChangedEvent) => {
  logger.info('notification event application.status.changed', {
    applicationId: e.applicationId,
    userId: e.userId,
    actorId: e.actorId,
    fromStatus: e.fromStatus,
    toStatus: e.toStatus,
  })
  void onApplicationStatusChanged(e).catch(err => {
    logger.error('notification send failed: application.status.changed', {
      applicationId: e.applicationId,
      userId: e.userId,
      actorId: e.actorId,
      fromStatus: e.fromStatus,
      toStatus: e.toStatus,
      error: err instanceof Error ? err.message : String(err),
    })
  })
})

applicationEvents.on('application.data.edited', (e: ApplicationDataEditedEvent) => {
  logger.info('notification event application.data.edited', {
    applicationId: e.applicationId,
    userId: e.userId,
    actorId: e.actorId,
    type: e.type,
    fields: e.fields,
  })
  void onApplicationDataEdited(e).catch(err => {
    logger.error('notification send failed: application.data.edited', {
      applicationId: e.applicationId,
      userId: e.userId,
      actorId: e.actorId,
      type: e.type,
      fields: e.fields,
      error: err instanceof Error ? err.message : String(err),
    })
  })
})
