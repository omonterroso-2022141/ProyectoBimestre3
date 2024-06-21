'use strict'

import { Router } from 'express'
import { listTransactions, makeTransaction } from './transactions.controller.js'
import { isAdmin, validateJwt } from '../middlewares/validate.jwt.js'

const api = Router()

api.post('/make-transaction', makeTransaction)
api.get('/listTransactions', [validateJwt, isAdmin], listTransactions)

export default api