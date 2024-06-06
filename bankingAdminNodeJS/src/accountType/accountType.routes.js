'use strict'

import {Router} from 'express'
import { add, test } from './accountType.controller.js'

const api = Router()

api.get('/test', test)
api.post('/add', add)

export default api