const admins = require("../Models/adminModel")
const jwt = require("jsonwebtoken")

exports.adminRegister = async (req, res) => {
    try {
        const { admin_name, email, password } = req.body
        const existing = await admins.findOne({ email })
        if (existing) {
            res.status(400).json("user already exist")
        }
        else {
            const newadmin = new admins({ admin_name, email, password })
            await newadmin.save()
            res.status(200).json("admin sign up completed")
        }
    }
    catch (e) {
        console.log(e);
        res.status(400).json(e)

    }

}

exports.adminlogin = async (req, res) => {
    const { admin_name, email, password } = req.body
    const existing=await admins.findOne({email})
    if(existing){
      const token= jwt.sign({admin_id:existing._id},process.env.SECRETKEY)
      res.status(200).json({token,_id:existing._id,admin_name:existing.admin_name,email:existing.email})

    }
     else {
        res.status(406).json("user not found")
    }


}
