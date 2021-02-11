const mongoose = require("mongoose");

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.get_users = async (req, res, next) => {
  try {
    const users = await User.find().exec();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.register = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    console.log(user)
    if (user) {
      res.status(400).json({
        message: "This user is already registered.",
      });
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            email: req.body.email,
            password: hash,
            role: req.body.role,
          });

          const result = await user.save();
          return res.status(200).json(result);
        }
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({  $or: [
      { email: req.body.user },
      { username: req.body.user }
  ]}).exec();
    if (!user) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }

   
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        return res.status(400).json({
          message: "Invalid username or password",
          error: err
        });
      }
      console.log('RESULT',result)
      if (result) {
        const token = jwt.sign(
          { email: user.email, 
            id: user._id,
            username: user.username,
            role: user.role
          },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        
        return res.status(200).json(token);
      }

      res.status(400).json({
        message: "Invalid username or password",
        error: err
      });
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};
