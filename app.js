const express = require("express")
const app = express()
const path = require("path")
const cookieParser = require("cookie-parser")


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))



app.get("/",(req,res)=>{
    res.send("welcome")
})




















app.listen(5000,(req,res)=>{
    console.log("server is running")
})