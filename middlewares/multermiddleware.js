const multer=require("multer")
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        const fname=Date.now()+"_"+file.originalname
        cb(null,fname)
    }
    
})

const fileFlter=(req,file,cb)=>{
   if(file.mimetype==="image/jpg" || file.mimetype==="image/png" || file.mimetype==="image/jpeg"){
        cb(null,true)
    }
    else{
        cb(null,false)
        cb(new Error("only jpg,png or jpeg files are supported"))
    }
}
module.exports=multer({storage,fileFlter})