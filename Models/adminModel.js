const mongoose=require('mongoose')

const adminSchema=new mongoose.Schema({
     admin_name:{
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
        }
    })

const admins=new mongoose.model("admins",adminSchema)
module.exports=admins