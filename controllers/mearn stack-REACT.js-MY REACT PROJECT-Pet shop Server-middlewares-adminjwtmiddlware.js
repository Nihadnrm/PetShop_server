const jwt=require("jsonwebtoken")



const  adminjwtmiddleware=(req,res,next)=>{
    try{
      const token = req.headers.authorization.split(" ")[1];
    try{
       const admin=jwt.verify(token, process.env.SECRETKEY);
    console.log(admin);
    req.payload=admin.admin_id
    next()
    }
   catch (err) {
      console.log(err);
      res.status(401).json(err);
    }
    }
    catch (err) {
      console.log(err);
      res.status(401).json(err);
    }
}

module.exports= adminjwtmiddleware