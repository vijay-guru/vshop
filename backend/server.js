import express from 'express'
import path from "path"
import morgan from 'morgan'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
let app=express()
dotenv.config()
connectDB()
app.use(express.json())
app.use('/api/product',productRoutes)
app.use('/api/user',userRoutes)
app.use('/api/order',orderRoutes)
app.use('/api/upload',uploadRoutes)
app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})
const __dirname=path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))
if(process.env.NODE_ENV==='production'){
    dotenv.config()
    app.use(express.static(path.join(__dirname,'/frontend/build')))
    app.get('*',(req,res)=>
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    )
}
else{
    console.log("hiiiiiiiiiiiii")
    app.get('/',(req,res)=>{
        res.send("This is Backend")
    })
}

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}
app.use(notFound)
app.use(errorHandler)

app.get('/api/product/',(req,res)=>{
    res.json(product)
})


app.set( 'port', ( process.env.PORT || 5000 ));

// Start node server
app.listen( app.get( 'port' ), function() {
  console.log( 'Node server is running on port ' + app.get( 'port' ));
  });
/*const PORT=process.env.PORT || 5000
app.listen(PORT,console.log(`Serving running in ${process.env.NODE_ENV} mode on ${process.env.PORT}..`)) */