import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const userSchema=mongoose.Schema({
    name:{
           type:String,
           required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }
},{
    timestamp:true
})

userSchema.methods.matchPassword=async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.pre('save', async function (next){
    const user=this
    if(!user.isModified('password')){
        next()
    }

    const salt=await bcrypt.genSalt(10)
    user.password=await bcrypt.hash(user.password,salt)
})

const User=mongoose.model('User',userSchema)

export default User