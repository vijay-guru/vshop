import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import asyncHandler from "express-async-handler"

export const protect=asyncHandler(async(req,res,next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token=req.headers.authorization.split(' ')[1]
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            req.user=await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error("Not authorized , token invalid")
        }
    }
    if(!token){
        res.status(401)
        throw new Error("Not authorized , no token found")
    }

})

export const admin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }
    else{
        throw new Error("Not authorized as admin")
    }
}
