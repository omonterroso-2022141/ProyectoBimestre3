'use strict'

import express from 'express'
import { createUser, login, test } from './user.controller.js'
import { validateJwt, isAdmin } from '../middlewares/validate.jwt.js'

const api = express.Router()

api.get('/test', test)
api.post('/register', [ validateJwt, isAdmin ], createUser)
api.post('/login', login)

export default api