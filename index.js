const dotenv = require('dotenv').config()
const express=require('express')
const cors=require('cors')
require('./connect/connect')
const router=require("./Routes/routers")




const server=express()
server.use(cors())
server.use(express.json())   // Parses incoming JSON requests

server.use(router)
server.use('/images',express.static('./uploads'))



const port=4000 || process.env.PORT
server.listen(port,()=>{
    console.log("server running at",port);
    
})

