const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const createUser = (req, res) => {
  bcrypt
    .hash(req.body.password, 12)
    .then((hashPw) => {
      const user = new User({
        email: req.body.email,
        password: hashPw,
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "User Created",
        data: result,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: "Invalid credentials." });
    });
};

const login = (req, res) => {
  let user;
  User.findOne({ email: req.body.email })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "No User Found",
        });
      }
      user = result;
      return bcrypt.compare(req.body.password, result.password);
    })
    .then((isPassword) => {
      if (!isPassword) {
        return res.status(401).json({
          message: "Invalid Password",
        });
      }
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id,
        },
        "secret_this_should_be_longer",
        {
          expiresIn: "3h",
        }
      );
      res.status(200).json({
        token: token,
        userId: user._id,
        expiresIn: 3600 * 3,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Invalid credentials." });
    });
};

module.exports = {
  createUser: createUser,
  login: login,
};
