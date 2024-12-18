import mongoose from 'mongoose'

const productValidateSchema = new mongoose.Schema({
    id:String,
    title:{
        type: String,
        required: true
    },
    part:{
        type: Number,
        required: true
    },
    _id:false,
     createAt: {
        immutable:true,
        type: Date,
        default:() => new Date(),
    },
    updateAt: {
        type: Date,
        default:() => new Date(),
    },
})

const productVal = mongoose.model('productVal',productValidateSchema)

export default productVal