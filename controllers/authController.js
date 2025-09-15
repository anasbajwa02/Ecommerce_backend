const userModel = require("../models/user.model.js")
const bcrypt = require("bcrypt")
const {genrateToken} = require("../utils/genrateToken.js")


// register user 


module.exports.registerUser =async(req,res)=>{
    
 const  {fullname,email,password} = req.body
 

 const user =await userModel.findOne({email:email})
 if(user){
    return res.send("user already exist")
    // res.redirect("/login")
 }
 
 bcrypt.genSalt(10,function(err,salt){

    bcrypt.hash(password,salt, async function(err,hash){
       if(err) return res.send(err.message)
        else{
     const createdUser = await userModel.create({
    fullname,
    email,
    password:hash,
    
 })
 let token = genrateToken(createdUser)
 res.cookie("token",token)
 res.send(createdUser)
 console.log(createdUser)
        }
    })
 })



}



// login user


module.exports.loginUser = async(req,res)=>{
    const {email,password} = req.body
   const user = await userModel.findOne({email})
   if(!user) return res.status(404).send("please try with correct login or password")
   
    bcrypt.compare(password,user.password,function(err,result){
        if(result){
            res.send("you are logedin ")
            let token = genrateToken(user)
       res.cookie("token",token)
        }else{
           return  res.send("please try with correct login or password ")
        }
    })

}


// user logout

module.exports.logOut = function(req,res){
    res.cookie("token","")
    res.send("you are log out")
    // res.redirect("/")
}