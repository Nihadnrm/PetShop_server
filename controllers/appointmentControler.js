const appointments = require("../Models/AppointmentModel");

// Add appointment
exports.addappointment = async (req, res) => {
    try {
        const userId = req.payload; 
        const { petname, category, breed, service, date, time, owner, contact } = req.body;
        const newappointment = new appointments({ userId,petname, category, breed, service, date, time, owner, contact });
        await newappointment.save();
        res.status(200).json(newappointment);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
};

// Get all appointments
exports.getappointment = async (req, res) => {
    try {
        const response = await appointments.find();
        res.status(200).json(response);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
};

// Update appointment status
exports.updateStatus = async (req, res) => {
    try {
        userId = req.payload; 
        const { id, status } = req.body; 
        const updated = await appointments.findByIdAndUpdate(id, {userId, status }, { new: true });
        res.status(200).json(updated);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
};

exports.getuserappointment = async (req, res) => {
    try {
        const userId = req.payload; 
        const response = await appointments.find({userId});
        res.status(200).json(response);
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
};


