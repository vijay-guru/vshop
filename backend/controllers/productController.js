import asyncHandler from 'express-async-handler';
import Product from '../model/productModel.js';


const getProducts=asyncHandler(async(req,res)=>{
    const pageSize=8
    const page=Number(req.query.pageNumber) || 1
    const keyword=req.query.keyword ? {
        name:{
            $regex:req.query.keyword,
            $options:'i'
        }
    }:{}
    const count=await Product.countDocuments({...keyword})
    const product=await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page-1))
    res.json({product,page,pages:Math.ceil(count/pageSize)})
})

const getProductsById=asyncHandler (async(req,res)=>{
    const product=await Product.findById(req.params.id)
    if(product){ 
       res.json(product)
    }
    else{
        res.status(404)
        throw new Error('Product not found')
    }
})

const deleteProduct=asyncHandler (async(req,res)=>{
    const product=await Product.findById(req.params.id)
    if(product){ 
       await product.remove()
       res.send("Product Removed")
    }
    else{
        res.status(404)
        throw new Error('Product not found')
    }
})

const createProduct=asyncHandler (async(req,res)=>{
    const product=new Product({
        name:"Sample name",
        price:0,
        user:req.user._id,
        image:'/images/sample.jpg',
        brand:"Sample brand",
        countInStock:0,
        numReviews:0,
        description:"Sample description"
    })

    const createdProduct=await product.save()
    res.status(201).json(createdProduct)

})

const updateProduct=asyncHandler (async(req,res)=>{
    const {
        name,
        price,
        user,
        image,
        brand,
        countInStock,
        numReviews,
        description
    }=req.body
    const product=await Product.findById(req.params.id)
    if(product){ 
        product.name=name
        product.price=price
        product.image=image
        product.brand=brand
        product.countInStock=countInStock
        product.numReviews=numReviews
        product.description=description

        const updatedProduct=await product.save()
        res.status(201).json(updatedProduct)
     }
     else{
         res.status(404)
         throw new Error('Product not found')
     }
})

const createProductReview=asyncHandler (async(req,res)=>{
    const {rating,comment}=req.body
    const product=await Product.findById(req.params.id)
    if(product){ 
        const alreadyReviewed=product.reviews.find(r=> r.user.toString()===req.user._id.toString())
        if(alreadyReviewed){
            res.status(404)
         throw new Error('Product already reviewed')
        }

        const review={
            name:req.user.name,
            rating:Number(rating),
            comment,
            user:req.user._id
        }
        product.reviews.push(review)
        product.numReviews=product.reviews.length
        product.rating=Number(product.reviews.reduce((acc,item)=>item.rating+acc,0)/product.reviews.length)
        await product.save()
        res.status(201)
        res.send("Product review added")
     }
     else{
         res.status(404)
         throw new Error('Product not found')
     }
})

const getTopProduct=asyncHandler (async(req,res)=>{
    const product=await Product.find({}).sort({rating:-1}).limit(3)
    res.send(product)
     
})


export {
    getProducts,
    getProductsById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProduct
}