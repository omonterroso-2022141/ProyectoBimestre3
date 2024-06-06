'use strict'

import { Schema, model } from 'mongoose'

const adminSchema = Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    DPI:{
        type: String,
        required: true,
        minLength: 13,
        maxLength: 13
    },
    address:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    job:{
        type: String,
        required: true
    },
    income:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        enum: [ 'ADMIN' ]
    }
}, {
    versionKey: false
})

export default model('admin', adminSchema)