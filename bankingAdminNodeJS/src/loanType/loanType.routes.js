'use strict'

import {Router} from 'express'
import { addLoanType } from './loanType.controller.js'
import { isAdmin, validateJwt } from '../middlewares/validate.jwt.js'

const api = Router()

api.post('/addTypeLoan', [validateJwt, isAdmin], addLoanType)

export default api  