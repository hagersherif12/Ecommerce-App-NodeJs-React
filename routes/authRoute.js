// router 
const express= require("express");
const router= express.Router()
// controllers 
const {register , login , logout  }=require("../controllers/authController")
//register
router.post("/register",register);

//login
router.post("/login",login)

//logout 
router.get("/logout",logout);

module.exports= router;