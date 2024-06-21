'use strict'

import { Router } from 'express'
import { listMyTransactions, makeTransaction } from './transactions.controller.js'
import { validateJwt } from '../middlewares/validate.jwt.js'

const api = Router()

api.post('/transaction', [ validateJwt ], makeTransaction)
api.get('/listMyTransactions', [validateJwt], listMyTransactions)

export default api