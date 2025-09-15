const express = require("express")
const app = express()
const path = require("path")
const cookieParser = require("cookie-parser")
require("dotenv").config();
const dbConnection = require("./config/mongoose-connection.js")
const userRouter = require("./routes/userRouter.js")
const OwnerRouter = require("./routes/ownerRoutes.js")
const ProductRouter = require("./routes/ProductRoutes.js")
const indexRouter = require("./routes/index.js")


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))


app.use("/",indexRouter)
app.use("/users",userRouter)

app.use("/owner",OwnerRouter)

app.use("/products",ProductRouter)














dbConnection()
app.listen(5000,(req,res)=>{
    console.log("server is running")
})