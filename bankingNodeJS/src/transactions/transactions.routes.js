'use strict'

import { Router } from 'express'
import { makeTransaction } from './transactions.controller.js'

const api = Router()

api.post('/transaction', makeTransaction)

export default api