const bcrypt = require("bcryptjs");
const express = require("express");
const User = require("../../../schema/User");
const { ErrorHandler } = require("../../../customHandlers/error");
const router = express.Router();
const { userReturnWithJWT } = require("../helper");
router.post("/", (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return next(new ErrorHandler(400, "Email is required"));
  }

  if (!password) {
    return next(new ErrorHandler(400, "Password is required"));
  }

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    User.findOne({ email })
      .then((user) => {
        if (user) {
          if (bcrypt.compareSync(password, user.password)) {
            const { password, __v, ...rest } = user._doc;
            const userTemp = userReturnWithJWT(rest);
            return res.status(200).send({ user: userTemp });
          } else {
            return next(new ErrorHandler(401, "Password do not match"));
          }
        } else {
          return next(new ErrorHandler(400, "User does not exists"));
        }
      })
      .catch((er) => {
        console.log({ er });
        return next(new ErrorHandler(500, "Internal server error"));
      });
  } else {
    return next(new ErrorHandler(400, "Email is invalid"));
  }
});

module.exports = router;
