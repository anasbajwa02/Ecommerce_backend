const express = require("express");
const ownerModel = require("../models/owner.models.js");
const router = express.Router();
const {OwnerToken}= require("../utils/ownerToken.js");
const bcrypt = require("bcrypt")



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

router.post("/login", async (req,res)=>{
    const {email,password} = req.body 

  let owner = await ownerModel.findOne({email})
  if(!owner) return res.status(401).send("please use correct email and password")

    bcrypt.compare(password,owner.password,function(err,result){
        if(result){
            let ownerLoginToken = OwnerToken(owner)
            res.cookie("owner",ownerLoginToken)
            res.send("owner logedin")
        }else{
            res.status(401).send("please use correct email or password")
        }
    })

})

router.get("/logout",(req,res)=>{
    res.cookie("owner","")
    res.send("owner logout")
})


module.exports = router