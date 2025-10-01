const express = require("express");
const ownerModel = require("../models/owner.models.js");
const router = express.Router();
const {OwnerToken}= require("../utils/ownerToken.js");
const bcrypt = require("bcrypt")
const ownerloggedIn = require("../middlewares/isOwnerLoggedin.js");
const productModel = require("../models/product.model.js");
const orderModel = require("../models/order.model.js");
const {loginOwner,logoutOwner,Orders,deleteProduct} = require("../controllers/ownerController.js");
const { route } = require("./userRouter.js");



if (process.env.NODE_ENV === "development"){
    router.post("/create",async (req,res)=>{
      let owner = await ownerModel.find();
      if(owner.length > 0){
        return res.status(409).send("you can create only one owner")
      }
      let {fullname,email,password,contact} =req.body

      bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(password,salt,async function(err,hash){
            let createdOwner =  await ownerModel.create({
    fullname,
    email,
    password:hash,
    contact,
  })
   res.send(createdOwner).status(201)
        })
      })
    })
}



router.post("/login",loginOwner)
router.get("/logout",logoutOwner)
router.get("/orders",ownerloggedIn,Orders)
router.delete("/deleteproduct",ownerloggedIn,deleteProduct)


module.exports = router