'use strict'

import {Router} from 'express'
import { add, test, getAccountTypes} from './accountType.controller.js'
import { validateJwt, isAdmin } from '../middlewares/validate.jwt.js'

const api = Router()

api.get('/test', test)
api.post('/add',/* [validateJwt, isAdmin], */ add)
api.get('/get', getAccountTypes)

export default api