import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import product from './data/product.js'
import mongoose from 'mongoose'
import users from './data/users.js'
import User from './model/userModel.js'
import Product from './model/productModel.js'
import Order from './model/orderModel.js'

dotenv.config()

connectDB()

const importData= async ()=>{
        try {
            await Order.deleteMany()
            await User.deleteMany()
            await Product.deleteMany()

            const createdUser= await User.insertMany(users)
            const adminUser=createdUser[0]._id
            const sampelProducts=product.map((prod)=>{
                return{...prod , user:adminUser}
            })
            await Product.insertMany(sampelProducts)
            console.log("Data imported successfully")
            process.exit()
        } catch (error) {
            console.log(`${error}`)
            process.exit(1)
        }
}


const destroydata= async ()=>{
    try {
        await Order.deleteMany()
        await User.deleteMany()
        await Product.deleteMany()
        console.log("Data destroyed successfully")
        process.exit()
    } catch (error) {
        console.log(`${error}`)
        process.exit(1)
    }
}

if(process.argv[2]=='-d'){
    destroydata()
}
else{
    importData()
}