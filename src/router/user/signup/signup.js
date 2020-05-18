const express = require("express");
const router = express.Router();
const { bcryptPasswordFn, userReturnWithJWT } = require("../helper");
const User = require("../../../schema/User.js");
router.post("/", (req, res, next) => {
  const { email, password, confirmPassword, role = "user" } = req.body;
  /*
   * role if not given -> considered as user
   */

  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  if (!password) {
    return res.status(400).send({ message: "Password is required" });
  }

  if (!confirmPassword) {
    return res.status(400).send({ message: "Confirm password is required" });
  }

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    if (password !== confirmPassword) {
      return res.status(400).send({ message: "Passwords do not match" });
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
              return res.status(500).send({ message: "Internal server error" });
            });
        } else {
          return res.status(200).send({ message: "User already exists" });
        }
      })
      .catch((er) => {
        console.log({ er });
        return res.status(500).send({ message: "Internal server error" });
      });
  } else {
    return res.status(400).send({ message: "Email is invalid" });
  }
});

module.exports = router;
