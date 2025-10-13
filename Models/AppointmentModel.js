const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
                ref: "users",
                required: true
    },
    petname: { type: String },
    category: { type: String },
    breed: { type: String },
    service: { type: String, required: true },
    date: { type: String },
    time: { type: String },
    owner: { type: String },
    contact: { type: String },
    status: { type: String, enum: ["pending", "completed"], default: "pending" } // ✅ status field
});

const appointments = mongoose.model("appointments", appointmentSchema);
module.exports = appointments;
