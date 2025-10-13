const users = require('../Models/userModel')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

// REGISTER
exports.userRegister = async (req, res) => {
    try {
        const { username, password, email } = req.body

        // Check if user already exists
        const existing = await users.findOne({ email })
        if (existing) {
            return res.status(400).json("User already exists")
        }

        // Hash password
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newuser = new users({
            username,
            email,
            password: hashedPassword,  // store hashed password
            profile: "",
            phone: "",
            pin: "",
            address: ""
        })

        await newuser.save()
        res.status(200).json("User signup completed")
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: e.message })
    }
}

// LOGIN
exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const existing = await users.findOne({ email })

        if (!existing) {
            return res.status(406).json("User not found")
        }

        // Compare plain password with hashed one
        const isMatch = await bcrypt.compare(password, existing.password)
        if (!isMatch) {
            return res.status(401).json("Invalid credentials")
        }

        // Create JWT
        const token = jwt.sign({ userId: existing._id }, process.env.SECRETKEY, { expiresIn: "1d" })

        // Don’t return password to frontend
        res.status(200).json({
            token,
            _id: existing._id,
            username: existing.username,
            email: existing.email,
            profile: existing.profile,
            phone: existing.phone,
            pin: existing.pin,
            address: existing.address
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message })
    }
}

// UPDATE
exports.updateuser = async (req, res) => {
    try {
        const userId = req.payload
        let { username, email, phone, pin, address } = req.body
        let profile

        if (req.file) {
            profile = req.file.filename
        }

        const response = await users.findByIdAndUpdate(
            userId,
            { username, email, phone, pin, address, profile },
            { new: true } // return updated user
        )

        res.status(200).json(response)
    } catch (err) {
        console.error(err);
        res.status(400).json(err)
    }
}

// ALL USERS
exports.allusers = async (req, res) => {
    try {
        const respons = await users.find().select("-password") // never send passwords
        res.status(200).json(respons)
    }
    catch (e) {
        console.log(e);
        res.status(400).json(e)
    }
}

// DELETE
exports.deleteuser = async (req, res) => {
    try {
        const { id } = req.params
        const response = await users.findByIdAndDelete(id)
        res.status(200).json(response)
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
}
