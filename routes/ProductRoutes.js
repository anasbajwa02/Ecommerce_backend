const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config.js");
const productModel = require("../models/product.model.js");
const ownerloggedIn = require("../middlewares/isOwnerLoggedin.js");

router.post(
  "/create",
  ownerloggedIn,
  upload.single("image"),
  async (req, res) => {
    try {
      let { name, price, discount, category, description } = req.body;

      let product = await productModel.create({
        image: {
          data: req.file.buffer,
          contentType: req.file.mimetype, // <-- store the type too
        },
        name,
        price,
        discount,
        category,
        description,
      });

      res.status(201).json({msg:"product added successfully !" , product});
    } catch (error) {
      res.status(500).json({ msg :"error in adding product " , error });
    }
  }
);

module.exports = router;
