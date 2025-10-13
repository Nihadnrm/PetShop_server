const mongoose=require("mongoose")


const wishlistSchema=new mongoose.Schema({
userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users", 
    required: true
},
petId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "pets", 
    required: true
}
}
)

const whishlists=mongoose.model("wishlists",wishlistSchema)
module.exports=whishlists