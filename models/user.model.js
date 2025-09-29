const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",   // reference to your product model
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  contact: Number,
  picture: String,
});

module.exports = mongoose.model("user", userSchema);
