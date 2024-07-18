'use strict'

import { model, Schema } from 'express'

const loansSchema = new Schema({
    userId:{
        type: Schema.ObjetcId,
        ref: 'user',
        required: true
    },
    loanType:{
        type: Schema.ObjectId,
        ref: 'loanType',
        required: true
    },
    amount:{
        type: Schema.Types.Decimal128,
        required: true,
    }
},{
    varsionKey: false
})

export default model('Loans', loansSchema)