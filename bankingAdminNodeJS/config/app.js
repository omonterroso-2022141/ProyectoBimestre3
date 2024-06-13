'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import userRoutes from '../src/user/user.routes.js'
import typeRoutes from '../src/accountType/accountType.routes.js'
import accountRoutes from '../src/account/account.routes.js'
import transactionRoutes from '../src/transactions/transactions.routes.js'
import adminRoutes from '../src/admin/admin.routes.js'
import cardRoutes from '../src/card/card.routes.js'

const app = express()
config()
const port = process.env.PORT || 3200

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use('/user', userRoutes)
app.use('/type', typeRoutes)
app.use('/account', accountRoutes)
app.use('/transactions', transactionRoutes)
app.use('/admin', adminRoutes)
app.use('/card',  cardRoutes)

export const initServer =()=>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`);
}