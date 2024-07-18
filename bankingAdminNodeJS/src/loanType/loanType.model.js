import { model, Schema } from 'mongoose'

const loanTypeSchema = Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    interestRate:{
        // E; interes es anual.
        type:Number,
        required: true
    }
    
},{
    versionKey: false
})

export default model('loanType', loanTypeSchema)