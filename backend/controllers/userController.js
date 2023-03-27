import asyncHandler from 'express-async-handler';
import User from '../model/userModel.js';
import generateToken from '../utils/generateToken.js';
import nodemailer from 'nodemailer'

const sendeMail=((req,res)=>{
    var email = req.body.email
  var message = req.body.complaint
  var content = `email: ${email} \n message: ${message} `

  var sender= nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"systemadkrish@gmail.com",
        pass:"Systemadkrish123@"
    }
});

var composemail={
    from:"systemadkrish@gmail.com",
    to:"vjguru42@gmail.com",
    subject:"Complaints from client",
    text:content
};

 sender.sendMail(composemail,function(err,info){
    if(err){
        console.log("Error occurs");
    }
    else{
        console.log("Message sent successfully "+info.response);
    }
});
})
const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body

    const user= await User.findOne({email})

    if(user && await(user.matchPassword(password))){
        res.json({
            id:user._id,
            email:user.email,
            name:user.name,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(401)
        throw new Error("Invalid email or password")
    }
})


const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body

    const userExists= await User.findOne({email})

    if(userExists){
        res.status(401)
        throw new Error("User already exists")
    }

    const user=await User.create({
        name,email,password
    })

    if(user){
        res.json({
            id:user._id,
            email:user.email,
            name:user.name,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(401)
        throw new Error("User details invalid")
    }
})

const getUserProfile=asyncHandler(async(req,res)=>{

    const user= await User.findById(req.user._id)
    if(user){
        res.json({
            id:user._id,
            email:user.email,
            name:user.name,
            isAdmin:user.isAdmin
        })
    }
    else{
        res.status(401)
        throw new Error("User not found")
    }

    
})

const updateUserProfile=asyncHandler(async(req,res)=>{

    const user= await User.findById(req.user._id)
    if(user){
            user._id=req.body._id || user._id
            user.email=req.body.email || user.email
            user.name=req.body.name || user.name

            if(req.body.password){
                user.password=req.body.password
            }
       const updateProfile=await user.save()
       res.json({
        id:updateProfile._id,
        email:updateProfile.email,
        name:updateProfile.name,
        isAdmin:updateProfile.isAdmin
    })
    }
    else{
        res.status(401)
        throw new Error("User not found")
    }

    
})
const getUsers=asyncHandler(async(req,res)=>{

    const user= await User.find({})
    if(user){ 
        res.json(user)
    }
    else{
        res.status(401)
        throw new Error("User not found")
    }

    
})

const deleteUser=asyncHandler(async(req,res)=>{

    const user= await User.findById(req.params.id)
    if(user){ 
        await user.remove()
        res.json({"message":"User removed"})
    }
    else{
        res.status(401)
        throw new Error("User not found")
    }

    
})

const getUserById=asyncHandler(async(req,res)=>{

    const user= await User.findById(req.params.id).select('-password')
    if(user){ 
        res.json(user)
    }
    else{
        res.status(401)
        throw new Error("User not found")
    }

    
})

const updateUser=asyncHandler(async(req,res)=>{

    const user= await User.findById(req.params.id)
    if(user){
            user._id=req.body._id || user._id
            user.email=req.body.email || user.email
            user.name=req.body.name || user.name
            user.isAdmin=req.body.isAdmin
       const updateProfile=await user.save()
       res.json({
        id:updateProfile._id,
        email:updateProfile.email,
        name:updateProfile.name,
        isAdmin:updateProfile.isAdmin
    })
    }
    else{
        res.status(401)
        throw new Error("User not found")
    }

    
})

export {authUser, getUserProfile,registerUser,updateUserProfile,getUsers,deleteUser,getUserById,updateUser,sendeMail}