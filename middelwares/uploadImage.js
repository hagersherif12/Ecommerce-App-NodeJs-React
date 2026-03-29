// multer calling 
const path=require("path")
const multer= require("multer")
//  configration 
const storage = multer.diskStorage({
    destination:(req , file,cb) =>{
        cb(null,"uploads")
    },
    filename: (req,file,cb)=>{
        const uniqueName = Date.now() + "-"+ Math.round(Math.random()*1000)+path.extname(file.originalname)
        cb(null,uniqueName)
    }
    
})
// calling configration
const upload = multer({storage}) 
// single image 
const uploadImage= upload.single("image")
// export 
module.exports={ uploadImage };