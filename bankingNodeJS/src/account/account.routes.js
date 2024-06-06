'use strict'

import express from 'express'
import { test } from './account.controller.js'
import { validateJwt, isAdmin } from '../middlewares/validate.jwt.js'

const api = express.Router()

api.get('/test', test)



export default api