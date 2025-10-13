const mongoose = require("mongoose")


const cartSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    petId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pets",
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1
    }

})

const carts=mongoose.model("carts",cartSchema)
module.exports=carts