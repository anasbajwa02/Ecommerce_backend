const jwt = require("jsonwebtoken")
const ownerModel = require("../models/owner.models")

module.exports = async function (req,res,next) {
    if(!req.cookies.owner){
        res.send("error you need to login first") 
    }  

    try{
        let decoded = jwt.verify(req.cookies.owner, process.env.JWT_KEY )
        let user = await ownerModel.findOne({email:decoded.email}).select("-password")

        req.user = user
        next()
    }
    catch(err){
        res.send(`somthing went wrong ${err}`)
    }

}