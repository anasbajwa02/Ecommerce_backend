const express = require("express")
const app = express()
const path = require("path")
const cors = require("cors");
const cookieParser = require("cookie-parser")
require("dotenv").config();
const dbConnection = require("./config/mongoose-connection.js")
const userRouter = require("./routes/userRouter.js")
const OwnerRouter = require("./routes/ownerRoutes.js")
const ProductRouter = require("./routes/ProductRoutes.js")
const OrderRouter = require("./routes/orderRoute.js")
const indexRouter = require("./routes/index.js")


const PORT = process.env.PORT


app.use(cookieParser())
app.use(cors(
  {
  origin: true,  // your frontend URL
  credentials: true,                // allow cookies/JWT in requests
}
));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))


app.use("/",indexRouter)
app.use("/users",userRouter)

app.use("/owner",OwnerRouter)

app.use("/products",ProductRouter)

app.use("/order",OrderRouter)



dbConnection()
app.listen(PORT,(req,res)=>{
    console.log("server is running")
})