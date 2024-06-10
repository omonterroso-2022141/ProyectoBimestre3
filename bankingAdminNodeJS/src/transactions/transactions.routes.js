'use strict'

import { Router } from 'express'
import { makeTransaction } from './transactions.controller.js'
import { validateJwt } from '../middlewares/validate.jwt.js'

const api = Router()

api.post('/make-transaction', makeTransaction)

export default api