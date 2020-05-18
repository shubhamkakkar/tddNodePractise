const bcrypt = require("bcryptjs");
const express = require("express");
const User = require("../../../schema/User");
const router = express.Router();
const { userReturnWithJWT } = require("../helper");
router.post("/", (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  if (!password) {
    return res.status(400).send({ message: "Password is required" });
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
            return res.status(401).send({ message: "Password do not match" });
          }
        } else {
          return res.status(400).send({ message: "User does not exists" });
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
