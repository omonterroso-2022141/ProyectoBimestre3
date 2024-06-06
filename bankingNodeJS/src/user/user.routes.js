'use strict'

import express from 'express'
import { createUser, login, test } from './user.controller.js'

const api = express.Router()

api.get('/test', test)
api.post('/register', createUser)
api.post('/login', login)

export default api