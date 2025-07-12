  const jswebtoken = require("jsonwebtoken");
  const User = require("../Models/User.model");
  const dotenv = require("dotenv");
  const express = require("express");
  const app = express();
  const cookieParser = require("cookie-parser");
  app.use(cookieParser());
  dotenv.config();
  let my_secret_Key = process.env.JWT_SECRET_KEY;

  const logniController = async (req, res) => {
    try {
      const { email, password } = req.body;

      let existsUser = await User.findOne({ email });
      console.log(existsUser,'existsUser');
      
      const passWrdVerify = await existsUser.matchPassword(password);
      console.log(passWrdVerify,'passWrdVerify');

      if (!passWrdVerify) {
        res.status(401).json({
          message: "invalid  Credentials",
          passWrdVerify,
          token: "",
          error: "",
        });
        return;
      }
          console.log('1');
console.log("ENV:", process.env.NODE_ENV); // should print "production"
console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY); // must NOT be undefined
      let token = jswebtoken.sign({ id: existsUser._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 1000 * 60 * 60 * 24,
      });

                        console.log('3',process.env);

      res.json({
        message: "login sucessful",
        passWrdVerify,
        token,
        userDetails: existsUser,
      });
    } catch (e) {
      res.status(500).json({ token:'',error: "server errro", e });
    }
  };

  const registerUser = async (req, res) => {
    const { email, username, password } = req.body;
  
    const isExistUser = await User.findOne({ email }).select(
      "username email -_id"
    ); // exclude  -_id  {userName,email }
    if (isExistUser) {
      res
        .status(400)
        .json({ message: "User email already exists", error: isExistUser.email });
      return;
    }
    const user = new User({
      username,
      password,
      email,
    });
    try {
      let newUser = await user.save();
      res.json({ message: "User registered successfully", userDetails: newUser });
    } catch (e) {
      res
        .status(500)
        .json({ message: "User not registration failed ", error: e.message });
    }
  };

  module.exports = { logniController, registerUser };
