const express = require("express")
const router = express.Router()
const messageModel = require("../models/message.model.js")
const sendMail = require("../utils/email.js")





module.exports.Email = async(req,res)=>{
try {
    const { fullname, email, message, phone } = req.body;

    // save message to DB
    const Usermessage = await messageModel.create({
      fullname,
      email,
      message,
      phone,
    });

    // send email
    await sendMail(
      process.env.EMAIL_USER, // your own email to be notified
      "New Contact Form Submission",
      `You got a new message:
      Name: ${fullname}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}`
    );

    // ✅ only send ONE response
    res.status(200).json({
      success: true,
      msg: "Message saved & email sent",
      data: Usermessage,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Error submitting form" });
  }
}