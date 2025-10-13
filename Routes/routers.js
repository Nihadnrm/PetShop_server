const express=require("express")
const usercontroler=require("../controllers/userControler")
const jwtmiddleware=require("../middlewares/jwtmiidleware")
const adminjwtmiddleware=require("../middlewares/adminjwtmiddlware")
const multermiddle=require("../middlewares/multermiddleware")
const petscontroler=require("../controllers/petsControler")
const admincontroler=require("../controllers/adminControler")
const feedbackcontroler=require("../controllers/feedbackControler")
const appointmentcontroler=require("../controllers/appointmentControler")
const wishlistcontroler= require("../controllers/wishlistControler")
const cartcontroler=require("../controllers/CartControler")
const paymentcontroler=require("../controllers/paymenyControler")

const router=express.Router()

//users
router.post("/register", usercontroler.userRegister)
router.post("/login",usercontroler.userLogin)
router.put("/update",jwtmiddleware,multermiddle.single("profile"),usercontroler.updateuser)
router.get("/allusers",usercontroler.allusers)
router.delete("/deleteuser/:id",jwtmiddleware,usercontroler.deleteuser)


//admin
router.post("/adminregister",admincontroler.adminRegister)
router.post("/adminlogin",admincontroler.adminlogin)

//pets
router.post("/addpets",petscontroler.addpet)
router.get("/getpets",petscontroler.getpet)
router.put("/editpet/:id",adminjwtmiddleware,petscontroler.editpet)
router.delete("/deletepet/:id",adminjwtmiddleware,petscontroler.deletepet)

//feedback

router.post("/addfeedback",jwtmiddleware,feedbackcontroler.addfeedback)
router.get("/getfeedback",jwtmiddleware,feedbackcontroler.getfeedback)

// Appointment
router.post("/addappointment", jwtmiddleware, appointmentcontroler.addappointment);
router.get("/getappointment", jwtmiddleware, appointmentcontroler.getappointment);
router.put("/appointment/status", jwtmiddleware, appointmentcontroler.updateStatus);
router.get("/getuserappointment", jwtmiddleware, appointmentcontroler.getuserappointment);




//wishlist
router.post("/addtowish",jwtmiddleware,wishlistcontroler.addwishlist)
router.get("/getwishlist",jwtmiddleware,wishlistcontroler.getwishlist)
router.delete("/deletefromwishlist/:id",jwtmiddleware,wishlistcontroler.deletewishlist)

//cart
router.post("/addtocart",jwtmiddleware,cartcontroler.addcart)
router.get("/getcart",jwtmiddleware,cartcontroler.getcart)
router.delete("/deletecart/:id",jwtmiddleware,cartcontroler.deletecart)

//payment
router.post("/pay",jwtmiddleware,paymentcontroler.payment)
router.get("/getorders",paymentcontroler.getorders)
router.get("/getuserorders",jwtmiddleware,paymentcontroler.getuserorders)
router.put("/updateorderstatus",jwtmiddleware,paymentcontroler.updateorderStatus)






module.exports=router