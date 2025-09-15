const express = require("express");
const userModel = require("../models/user.model");
const router = express.Router();
const {registerUser,loginUser,logOut} = require("../controllers/authController.js") 
router.get("/",(req,res)=>{
    res.send("user router")
})


router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/logout",logOut)



module.exports = router