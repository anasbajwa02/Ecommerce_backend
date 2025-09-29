const express = require("express")
const userModel = require("../models/user.model")
const router = express.Router()


module.exports.addtocart= async(req,res)=>{
    try {
     const {productId,quantity } = req.body
     let user = await userModel.findOne({email:req.user.email})
     if(!user){
      return res.status(404).json({msg:"User not found"})
     }


     const itemIndex = user.cart.findIndex((item)=> item.product.toString() === productId)

     if(itemIndex > -1){
      user.cart[itemIndex].quantity += quantity || 1;
     }else{
      user.cart.push({product:productId, quantity:quantity || 1})
     }
     user.save()
     res.json({msg:"Product added to cart",cart:user.cart})

    
  } catch (error) {
    console.log(error)
    res.status(500).json({msg:"server error ",error:error.message})
    
  }

}

// cart

module.exports.Cart = async(req,res)=>{
try {
    const user = await userModel.findOne({ email: req.user.email }).populate("cart.product");
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Convert each product image buffer to Base64
    const cartWithImages = user.cart.map((item) => {
      // clone the product object to avoid mutating Mongoose document
      let product = item.product ? item.product.toObject() : null;

      if (product && product.image && product.image.data) {
        product.image = `data:${product.image.contentType};base64,${product.image.data.toString("base64")}`;
      }

      return {
        quantity: item.quantity,
        product: product,
      };
    });

    res.status(200).json({ cart: cartWithImages });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
}


// remove from cart


module.exports.removeFromCart = async(req,res)=>{
try {
    const {productId} = req.body
    const user = await userModel.findOne({email:req.user.email})
    if(!user) return res.status(404).json({msg:"user not found"})

      user.cart = user.cart.filter((item)=>item.product.toString() !== productId)
      await user.save()
      res.status(200).json({msg:"Item removed from cart",cart:user.cart})
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
}