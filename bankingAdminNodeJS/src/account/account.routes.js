'use strict'

import express from 'express'
import { test, createAccount } from './account.controller.js'

const api = express.Router()

api.get('/test', test)
api.post('/create', createAccount)



export default api