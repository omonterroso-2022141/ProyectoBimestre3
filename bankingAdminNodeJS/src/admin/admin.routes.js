'use strict'

import express from 'express'
import { createAdmin, login, test } from './admin.controller.js'
import { validateJwt, isAdmin } from '../middlewares/validate.jwt.js'

const api = express.Router()

api.get('/test', test)
api.post('/register',[validateJwt, isAdmin],createAdmin)
api.post('/login', login)

export default api