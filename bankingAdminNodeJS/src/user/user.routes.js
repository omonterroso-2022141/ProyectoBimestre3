'use strict'

import express from 'express'
import { createUser, deleteUser, listUser, login, test, updateUser } from './user.controller.js'
import { validateJwt, isAdmin } from '../middlewares/validate.jwt.js'

const api = express.Router()

api.get('/test', test)
api.post('/register', [ validateJwt, isAdmin ], createUser)
api.get('/listUsers', [validateJwt, isAdmin], listUser)
api.put('/updateUser/:id', [validateJwt, isAdmin], updateUser)
api.delete('/deleteUser/:id', [validateJwt, isAdmin], deleteUser)
api.post('/login', login)
api.get('/getUsers', [ validateJwt, isAdmin ], listUser)

export default api