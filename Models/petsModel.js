const mongoose = require("mongoose")


const petschema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        
    },
    breed: {
        type: String,
    },
    gender: {
        type: String,
    },
    age: {
        type: String,
    },
    color:{
         type: String,
    },
    size:{
         type: String,
    },
    price:{
         type: String,
    },
    image:{
         type: String,
    },
    status: {
        type: String,
        enum: ['available', 'sold'],
        default: 'available'
    },
})

const pets=mongoose.model("pets",petschema)
module.exports=pets
