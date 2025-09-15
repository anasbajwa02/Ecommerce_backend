const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
module.exports = async function (req,res,next) {
    if(!req.cookies.token){
        res.send("error you need to login first") 
    }  

    try{
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY )
        let user = await userModel.findOne({email:decoded.email}).select("-password")

        req.user = user
        next()
    }
    catch(err){
        res.send(`somthing went wrong ${err}`)
    }

}