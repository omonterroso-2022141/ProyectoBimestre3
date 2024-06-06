'use strict'

import express from 'express'
import { createAdmin, login, test } from './admin.controller.js'

const api = express.Router()

api.get('/test', test)
api.post('/register', createAdmin)
api.post('/login', login)

export default api