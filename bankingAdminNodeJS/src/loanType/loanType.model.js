import { model, Schema } from 'express'

const loanTypeSchema = Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    
},{
    versionKey: false
})

export default model('loanType', loanTypeSchema)