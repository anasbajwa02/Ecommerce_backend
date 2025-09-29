const jwt = require("jsonwebtoken");
const ownerModel = require("../models/owner.models");

module.exports = async function (req, res, next) {
  if (!req.cookies.owner) {
    return res.status(401).json({ msg: "You need to login first (owner)" });
  }

  try {
    let decoded = jwt.verify(req.cookies.owner, process.env.JWT_KEY);
    let user = await ownerModel.findOne({ email: decoded.email }).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "Owner not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token", error: err.message });
  }
};
