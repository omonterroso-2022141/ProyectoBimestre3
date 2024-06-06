'use strict'

import express from 'express'
import { test, createAccount } from './account.controller.js'
import { validateJwt, isAdmin } from '../middlewares/validate.jwt.js'

const api = express.Router()

api.get('/test', test)
api.post('/create', [validateJwt, isAdmin], createAccount)



export default api