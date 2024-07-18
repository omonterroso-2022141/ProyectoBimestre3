'use strict'

import express from 'express'
import { login, test, getUserByToken, getThirdPAccount, favorite} from './user.controller.js'
import { validateJwt } from '../middlewares/validate.jwt.js'

const api = express.Router()

api.get('/test', test)
api.post('/login', login)
api.get('/getByToken',[validateJwt], getUserByToken)
api.get('/getThirdPAccount', [validateJwt], getThirdPAccount)
api.put('/favorite', favorite)

export default api