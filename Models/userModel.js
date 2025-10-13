const mongoose=require('mongoose')

const userschema=new mongoose.Schema({
    username:{
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
         required:true,
         
    },
    profile:{
        type:String
    },
    phone:{
        type:String
    },
    pin:{
        type:String
    },
    address:{
        type:String
    }

})

const users=mongoose.model('users',userschema)
module.exports=users