import express from "express";
import multer from "multer";
import path from "path"

const router=express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) { 
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
  })

  const checkFile=(file,cb)=>{
       const filetypes=/jpg|jpeg|png/
       const extname=filetypes.test(path.extname(file.originalname).toLowerCase())
       const mimetype=filetypes.test(file.mimetype)

       if(filetypes && mimetype){
           return cb(null,true)
       }
       else{
           cb("Images only")
       }
  }
 
  const upload = multer({ 
      storage,
      fileFilter:function (req, file, cb){
          checkFile(file,cb)
      }
 })

router.post('/',upload.single('image'),(req,res)=>{
    console.log(`${req.file.path}`)
    res.send(`/${req.file.path}`)

})

export default router