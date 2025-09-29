const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
module.exports = async function (req,res,next) {
   if (!req.cookies.token) {
    return res.status(401).json({ msg: "You need to login first user" });
}
 

    try{
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY )
        let user = await userModel.findOne({email:decoded.email}).select("-password")

        req.user = user
        next()
    }
    catch(err){
       return res.status(500).json({ msg: "Invalid or expired token" });
    }

}