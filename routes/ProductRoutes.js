const express = require("express")
const router = express.Router()
const upload = require("../config/multer-config.js")
const productModel = require("../models/product.model.js")
const ownerloggedIn = require("../middlewares/isOwnerLoggedin.js")

router.post("/create",ownerloggedIn,upload.single("image"),async (req,res)=>{
    try {
        let {image,name,price,discount} = req.body
        let product = await productModel.create({
            image:req.file.buffer,name,price,discount
        })
        res.send(product)
    } catch (error) {
       return res.send(`error in create${error.message}`)
    }
})


module.exports = router