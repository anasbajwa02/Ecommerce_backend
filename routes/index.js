const express = require("express")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const productModel = require("../models/product.model")
const router = express.Router()
const isLoggedin = require("../middlewares/isLoggedin.js")
const messageModel = require("../models/message.model.js")
const sendMail = require("../utils/email.js")
const  {addtocart,Cart,removeFromCart}  = require("../controllers/cartController.js")
const {Email} = require("../controllers/emailController.js")

router.get("/", async (req, res) => {
  try {
    let products = await productModel.find();
    
    const updatedProducts = products.map((p) => {
      if (p.image && p.image.data) {
        return {
          ...p._doc,
          image: `data:${p.image.contentType};base64,${p.image.data.toString("base64")}`,
        };
      }
      return p;
    });

    res.status(200).json({updatedProducts,msg:"All products"});
  } catch (err) {
    res.status(500).send({ error: "Server error" });
  }
});

//add to cart

router.post("/addtocart",isLoggedin,addtocart)

// cart 

router.get("/cart",isLoggedin,Cart)

// delete from cart 

router.delete("/removefromcart",isLoggedin,removeFromCart)
// send mail
router.post("/message",Email)



//check cookie

router.get("/checkcookie", async(req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ loggedIn: false });
  }

  try {
   let decoded =  jwt.verify(token, process.env.JWT_KEY);
  let user = await userModel.findOne({email:decoded.email}).select("-password")
  console.log(user)
    return res.json({ loggedIn: true ,user});
  } catch (err) {
    
    return res.status(401).json({ loggedIn: false });
  }
});



module.exports = router