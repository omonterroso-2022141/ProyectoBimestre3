'use strict'

import express from 'express'
import { test, getAccounts, updateBalance, getAccountByID } from './account.controller.js'
import { validateJwt, isAdmin } from '../middlewares/validate.jwt.js'

const api = express.Router()

api.get('/test', test)

//# Created By: Yerick Aguilar
api.get('/getAccounts', [validateJwt], getAccounts)
api.put('/updateBalance/:uid', updateBalance)
api.get('/getAccount/:uid', getAccountByID)



export default api