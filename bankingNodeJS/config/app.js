'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import userRoutes from '../src/user/user.routes.js'
import accountRoutes from '../src/account/account.routes.js'
import transactionRoutes from '../src/transactions/transactions.routes.js'

const app = express()
config()
const port = process.env.PORT || 3200

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use('/user', userRoutes)
app.use('/account', accountRoutes)
app.use('/transactions', transactionRoutes)

export const initServer =()=>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`);
}