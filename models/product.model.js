const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
      image: {
    data: Buffer,
    contentType: String,
  },
    name:String,
    price:String,
    category:String,
  discount:{
    type:Number,
    default:0
  },
  description:String,
    
})

module.exports = mongoose.model("product",productSchema)