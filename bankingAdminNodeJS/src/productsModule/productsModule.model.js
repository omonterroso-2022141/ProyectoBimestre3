import { model, Schema } from 'express'

const productSchema = Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    discount:{
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    }
},{
    varsionKey: false
})

export default model('productsModule', productSchema)