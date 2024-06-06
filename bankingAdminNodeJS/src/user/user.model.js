'use strict'

import { Schema, model } from 'mongoose'

const userSchema = Schema({
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
}, {
    versionKey: false
})

export default model('user', userSchema)