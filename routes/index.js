const express = require("express")
const userModel = require("../models/user.model")
const productModel = require("../models/product.model")
const router = express.Router()
const isLoggedin = require("../middlewares/isOwnerLoggedin.js")

router.get("/",isLoggedin,async(req,res)=>{
     let products = await productModel.find()
     res.send(products).status(200)
})


module.exports = router