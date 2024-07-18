'use strict';

import Decimal from 'decimal.js';
import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
    emitionDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    toAccount: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    fromAccount: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    amount: {
        type: Schema.Types.Decimal128,
        required: true
    }
}, {
    versionKey: false
});

export default model('Transaction', transactionSchema);