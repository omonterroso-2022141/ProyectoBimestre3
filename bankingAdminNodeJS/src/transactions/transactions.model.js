'use strict';

import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
    emitionDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    toAccount: {
        type: String,
        required: true
    },
    fromAccount: {
        type: String, 
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
