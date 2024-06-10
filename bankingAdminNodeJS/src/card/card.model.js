import { Schema, model } from 'mongoose'
import Decimal from 'decimal.js'

const cardSchema = new Schema({
    cardNumber:{
        type: Number,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dueDate:{
        type: Date,
        required: true
    },
    CVV:{
        type: Number,
        required: true
    },
    issued:{
        type: String,
        required: true
    },
    balance:{
        type: Schema.Types.Decimal128,
        default: Decimal(0).toFixed(2)
    }
},{
    versionKey: false
})

export default model('Card', cardSchema)