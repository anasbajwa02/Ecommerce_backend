const  mongoose = require("mongoose")
require("dotenv").config();
const dbUrl = process.env.MONGODB_URI

const dbConnection = async ()=>{
    try {
     await mongoose.connect(`${dbUrl}blackfriday`)
     console.log("DB connected")
    } catch (error) {
        console.log(`error on db connection , ${error}`)

    }
}

module.exports = dbConnection