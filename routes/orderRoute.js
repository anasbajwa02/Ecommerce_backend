const express = require("express")
const router = express.Router()
const isLoggedin = require("../middlewares/isLoggedin.js")
const userModel = require("../models/user.model")
const productModel = require("../models/product.model")
const mongoose = require("mongoose")
const orderModel = require("../models/order.model.js")


router.post("/",isLoggedin,async(req,res)=>{
    try {
        const {name,email,address,city,zipcode,phone} = req.body.formData
        
        const user = await userModel.findOne({email:req.user.email}).populate("cart.product")

        if(!user) return res.status(404).json({msg:"User not found"})
            if(user.cart.length === 0) return res.status(400).json({msg:"Cart is empty"})
                      
        // set order
                  
                const items = user.cart.map((item)=>({
                    product:item.product._id,
                    name:item.product.name,
                    image:item.product.image,
                    price:item.product.discount || item.product.price,
                    quantity:item.quantity,
                }))

                

        // find total amount 
            let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += items[i].price * items[i].quantity;
    }


      // create our order 

        const order = await orderModel.create({
      user: user._id,
      deliveryInfo:{
        name,
        email,
        address,
        city,
        zipcode,
        phone,
      },
      items,
      total,
      paymentMethod: "Cash on Delivery",
    });

    // clear the user cart on order placed 
    user.cart = [];
    await user.save();

     res.status(201).json({ msg: "Order placed successfully", order });
    } catch (error) {
          res.status(500).json({ msg: "Server error", error: error.message });
    }
})



module.exports = router