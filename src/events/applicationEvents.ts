import { EventEmitter } from 'events'

export type ApplicationStatusChangedEvent = {
  applicationId: string
  userId: string
  actorId: string
  fromStatus: string
  toStatus: string
  comment: string
}

export type ApplicationDataEditedEvent = {
  applicationId: string
  userId: string
  actorId: string
  type: 'SME' | 'PAYROLL'
  fields: string[]
  comment: string
}

export const applicationEvents = new EventEmitter()

