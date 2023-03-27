import asyncHandler from 'express-async-handler';
import Order from '../model/orderModel.js';


const addOrderItems=asyncHandler(async(req,res)=>{
    const{
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    createdAt}=req.body

    if(orderItems && orderItems.length===0){
        res.status(401)
        throw new Error("No order found")
        return
    }
    else{
        const order=new Order({
            orderItems,
            user:req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        createdAt
        })

        const createdOrder=await order.save()

        res.status(201).json(createdOrder)
    }
})

const getOrderById=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id).populate('user','name email')
    if(order){
        res.json(order)
    }
    else{
        res.status(401)
        throw new Error("Order not found")
    }
})

const updateOrderToPaid=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id)
    if(order && order.paymentMethod==="Cod"){
        order.isPaid=true
        order.paidAt=Date.now()
    }
    else if(order){
        order.isPaid=true
        order.paidAt=Date.now()
        order.paymentResult={
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email:req.body.payer.email_address
        }
        const updated=order.save()
        res.json(updated)
    }
    else{
        res.status(401)
        throw new Error("Order not found")
    }
})


const updateOrderToDelivered=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id)
    if(order){
        order.isDelivered=true
        order.deliveredAt=Date.now()
        const updated=order.save()
        res.json(updated)
    }
    else{
        res.status(401)
        throw new Error("Order not found")
    }
})


const getMyOrders=asyncHandler(async(req,res)=>{
    const order=await Order.find({user:req.user._id})
    res.json(order)
})

const getOrders=asyncHandler(async(req,res)=>{
    const orders=await Order.find({}).populate('user','id name')
    res.json(orders)
})

export {addOrderItems,getOrderById,updateOrderToPaid,updateOrderToDelivered,getMyOrders,getOrders }