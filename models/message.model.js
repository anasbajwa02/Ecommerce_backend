const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    fullname:String,
    email:String,
    message:String,
    phone:Number
})

module.exports=mongoose.model("message",messageSchema)