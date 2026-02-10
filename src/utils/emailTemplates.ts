import type { ApplicationDataEditedEvent, ApplicationStatusChangedEvent } from '../events/applicationEvents'

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function applicationStatusChangedAdminTemplate(e: ApplicationStatusChangedEvent) {
  const subject = `Application ${e.applicationId}: ${e.fromStatus} → ${e.toStatus}`
  const safeComment = escapeHtml(e.comment)
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
      <h2 style="margin: 0 0 16px 0;">Application Status Changed</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; width: 160px; font-weight: bold;">Application ID</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(e.applicationId)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">User ID</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(e.userId)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Actor ID</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(e.actorId)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">From</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(e.fromStatus)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">To</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(e.toStatus)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; vertical-align: top;">Comment</td>
          <td style="padding: 8px; border: 1px solid #ddd; white-space: pre-wrap;">${safeComment}</td>
        </tr>
      </table>
    </div>
  `

  const text = [
    'Application Status Changed',
    `Application ID: ${e.applicationId}`,
    `User ID: ${e.userId}`,
    `Actor ID: ${e.actorId}`,
    `From: ${e.fromStatus}`,
    `To: ${e.toStatus}`,
    '',
    'Comment:',
    e.comment,
  ].join('\n')

  return { subject, html, text }
}

export function applicationDataEditedAdminTemplate(e: ApplicationDataEditedEvent) {
  const subject = `Application ${e.applicationId}: Data Edited (${e.type})`
  const fields = e.fields.join(', ')
  const safeComment = escapeHtml(e.comment)
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
      <h2 style="margin: 0 0 16px 0;">Application Data Edited</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; width: 160px; font-weight: bold;">Application ID</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(e.applicationId)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Type</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(e.type)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">User ID</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(e.userId)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Actor ID</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(e.actorId)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Fields</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(fields)}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; vertical-align: top;">Comment</td>
          <td style="padding: 8px; border: 1px solid #ddd; white-space: pre-wrap;">${safeComment}</td>
        </tr>
      </table>
    </div>
  `

  const text = [
    'Application Data Edited',
    `Application ID: ${e.applicationId}`,
    `Type: ${e.type}`,
    `User ID: ${e.userId}`,
    `Actor ID: ${e.actorId}`,
    `Fields: ${fields}`,
    '',
    'Comment:',
    e.comment,
  ].join('\n')

  return { subject, html, text }
}

