const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const { genrateToken } = require("../utils/genrateToken.js");

// register user

module.exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(400).json({ msg: "User already exists !" });
      // res.redirect("/login")
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err.message);
        else {
          const createdUser = await userModel.create({
            fullname,
            email,
            password: hash,
          });
          const token = genrateToken(createdUser);
          res.cookie("token", token, {
            httpOnly: true,
            secure: false, // in production level it must be true
            sameSite: "lax",
          });
          res.status(201).json({
            msg: "User registered successfully !",
            user: {
              id: createdUser._id,
              fullname: createdUser.fullname,
              email: createdUser.email,
            },
          });
        }
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// login user

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "Invalid email or password !" });

    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = genrateToken(user);
        res.cookie("token", token, {
          httpOnly: true,
          secure: false, // it must be true on production level
          sameSite: "lax",
        });
        res.json({
          msg: "Login successful !",
          user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
          },
        });
      } else {
        return res.status(400).json({ msg: "Invalid email or password !" });
      }
    });
  } catch (error) {
   console.error(error);
    res.status(500).json({ msg: "Server error !", error: error.message });
  }
};

// user logout

module.exports.logOut = function (req, res) {
  res.cookie("token", "", {
    httpOnly: true,
    secure: false,   // change to true in production (HTTPS)
    sameSite: "lax",
    expires: new Date(0)  // expire the cookie immediately
  });
  res.status(200).json({msg: "you are logged out !"});
};


