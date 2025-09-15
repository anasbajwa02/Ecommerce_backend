require("dotenv").config();

const jwt = require("jsonwebtoken")

const OwnerToken = (user)=>{
    
return jwt.sign({email:user.email,id:user._id},process.env.JWT_KEY)
};
module.exports.OwnerToken = OwnerToken