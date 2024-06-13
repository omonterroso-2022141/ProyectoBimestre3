'use strict'

import { Router } from 'express'
import { listTransaction, makeTransaction } from './transactions.controller.js'
import { validateJwt } from '../middlewares/validate.jwt.js'

const api = Router()

api.post('/make-transaction', makeTransaction)
api.get('/listTransactions', listTransaction)

export default api