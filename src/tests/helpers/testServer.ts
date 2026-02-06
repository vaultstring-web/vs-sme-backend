// src/tests/helpers/testServer.ts

import app from '../../app'
import request from 'supertest'

export function createAgent() {
  return request(app)
}
