import mongoose from 'mongoose'
const reviewSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true,
        default:0
    },
    comment:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamp:true
})
const productSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{
           type:String,
           required:true
    },
    image:{
        type:String,
        required:true
    },
    reviews:[reviewSchema],
    brand:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true,
        default:0
    },
    review:{
        type:Number,
        required:true,
        default:0
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    numReviews:{
        type:Number,
        default:0
    },
    countInStock:{
        type:Number,
        required:true,
        default:0
    }
},{
    timestamp:true
})

const Product=mongoose.model('Product',productSchema)

export default Product