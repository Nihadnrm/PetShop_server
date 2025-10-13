const jwt=require("jsonwebtoken")


const jwtmiddleware=(req,res,next)=>{
    try{
      const token = req.headers.authorization.split(" ")[1];
    try{
       const user=jwt.verify(token, process.env.SECRETKEY);
    console.log(user);
    req.payload=user.userId
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

module.exports=jwtmiddleware