const express = require("express");
const ownerModel = require("../models/owner.models.js");
const {OwnerToken}= require("../utils/ownerToken.js");
const bcrypt = require("bcrypt")
const orderModel = require("../models/order.model.js");
const productModel = require("../models/product.model.js");


 // for owner logedin 


module.exports.loginOwner = async(req,res)=>{
const {email,password} = req.body 

  let owner = await ownerModel.findOne({email})
  if(!owner) return res.status(401).json({msg:"please use correct email and password"})

    bcrypt.compare(password,owner.password,function(err,result){
        if(result){
            let ownerLoginToken = OwnerToken(owner)
            res.cookie("owner",ownerLoginToken)
            res.json({msg:"owner logedin"})
        }else{
            res.status(401).json({msg:"please use correct email or password"})
        }
    })
}


// for owner logout

  module.exports.logoutOwner = async (req,res)=>{
    res.cookie("owner","",
        {
    httpOnly: true,
    secure: false,   // change to true in production (HTTPS)
    sameSite: "lax",
    expires: new Date(0)  // expire the cookie immediately
  }
    )
  res.status(200).json({msg: "Owner are logged out !"});

}


// orders 


module.exports.Orders = async (req,res)=>{
    try {
    const orders = await orderModel
      .find()
      .populate("items.product")
      .populate("user", "fullname email");

    // Convert images
    const formattedOrders = orders.map(order => {
      return {
        ...order._doc,
        items: order.items.map(item => {
          let imageBase64 = null;

          // if product has an image buffer
          if (item.product?.image?.data) {
            imageBase64 = `data:${item.product.image.contentType};base64,${item.product.image.data.toString("base64")}`;
          }

          return {
            ...item._doc,
            image: imageBase64 || item.image, // fallback to existing image string if already encoded
          };
        })
      };
    });

    res.status(200).json({ orders: formattedOrders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
}


module.exports.deleteProduct = async (req,res)=>{
 try {
    const {id} = req.body
   if(!id) return res.status(400).json({msg:"Product Id is required"})
    await productModel.findByIdAndDelete(id)
  res.json({msg:"Product Deleted Successfully"})
 } catch (error) {
  res.status(500).json({msg:"Error deleting products",error})
 }

}