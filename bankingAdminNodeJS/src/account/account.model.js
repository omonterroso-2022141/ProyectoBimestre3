'use strict';

import { Schema, model } from 'mongoose'
import Decimal from 'decimal.js'

const accountSchema = new Schema({
    account:{
        type: Number,
        required: true
    },
    userId: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Schema.Types.Decimal128,
        default: Decimal(0).toFixed(2)
    },
    status: {
        type: String,
        uppercase: true,
        enum: ['ACTIVO', 'INACTIVO'],
        default: 'ACTIVO',
        required: true
    },
    created: {
        type: Date,
        required: true
    },
    accountType: {
        type: Schema.ObjectId,
        ref: 'AccountType',
        required: true
    }
}, {
    versionKey: false
})

export default model('Account', accountSchema)
