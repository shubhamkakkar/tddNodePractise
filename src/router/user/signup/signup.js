const express = require("express");
const router = express.Router();
const { bcryptPasswordFn, userReturnWithJWT } = require("../helper");
const User = require("../../../schema/User.js");
const { ErrorHandler } = require("../../../customHandlers/error");
router.post("/", (req, res, next) => {
  const { email, password, confirmPassword, role = "user" } = req.body;
  /*
   * role if not given -> considered as user
   */

  if (!email) {
    return next(new ErrorHandler(400, "Email is required"));
  }

  if (!password) {
    return next(new ErrorHandler(400, "Password is required"));
  }

  if (!confirmPassword) {
    return next(new ErrorHandler(400, "Confirm password is required"));
  }

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    if (password !== confirmPassword) {
      return next(new ErrorHandler(400, "Passwords do not match"));
    }

    User.findOne({ email })
      .then((user) => {
        if (user === null) {
          const bcryptPassword = bcryptPasswordFn(password);
          // return res.status(200).send({ message: "working" });
          const newUser = new User({ email, password: bcryptPassword, role });
          newUser
            .save()
            .then(({ _doc: { password, __v, ...rest } }) => {
              const user = userReturnWithJWT(rest);
              return res.status(200).send({ user });
            })
            .catch((er) => {
              console.log({ er });
              return next(new ErrorHandler(500, "Internal server error"));
            });
        } else {
          return res.status(200).send({ message: "User already exists" });
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
