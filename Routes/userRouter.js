const express = require("express");
const { userModel } = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const dotenv = require("dotenv").config();

// Registering a User
userRouter.post("/register", (req, res) => {
  try {
    bcrypt.hash(req.body.password, 5, async (err, hash) => {
      if (hash) {
        try {
          const user = new userModel({ ...req.body, password: hash });
          await user.save();
          res.send({ msg: "USER REGISTERED", USER: user });
        } catch (error) {
          res.send({ msg: `${error}` });
        }
      } else {
        res.send({ msg: `${err}` });
      }
    });
  } catch (error) {
    res.send({ msg: `${error}` });
  }
});

userRouter.get("/", async (req, res) => {
  try {
    const user = await userModel.find();
    res.send({ msg: "All USERS", USER: user });
  } catch (error) {
    res.send({ msg: `${error}` });
  }
});

// Logging in a User
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.send({ msg: "User not found" });
    } else {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (result) {
          jwt.sign({ id: user._id }, process.env.loginSecret, (err, token) => {
            if (err) {
              res.send({ msg: "JWT Error", error: `${err}` });
            } else {
              res.send({ msg: "USER LOGGED IN", token, user });
            }
          });
        } else if (!result) {
          res.send({ msg: "Wrong Cred" });
        }
      });
    }
  } catch (error) {
    res.send({ msg: `${error}` });
  }
});

module.exports = { userRouter };
