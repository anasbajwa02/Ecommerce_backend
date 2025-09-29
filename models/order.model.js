const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,

    },
    deliveryInfo:{
      name: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      zipcode: { type: String },
      phone: { type: String, required: true },
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        name: { type: String, required: true }, // keep snapshot
        image: { type: String },
        price: { type: Number, required: true }, // final price
        quantity: { type: Number, required: true },
      },
    ],
total: {
      type: Number,
      required: true,
    },
     paymentMethod: {
      type: String,
      default: "Cash on Delivery", // always COD
    },

},{timeStamps:true})


module.exports = mongoose.model("order",orderSchema)