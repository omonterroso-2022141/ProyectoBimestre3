import { Schema, model } from 'mongoose'

const accountTypeSchema = Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
},{
    versionKey: false
})

export default model('AccountType', accountTypeSchema)