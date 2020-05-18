const express = require("express");
const User = require("../../../schema/User");
const router = express.Router();
const { bcryptPasswordFn, userReturnWithJWT } = require("../helper");
router.post("/", (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  if (!password) {
    return res.status(400).send({ message: "Password is required" });
  }

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    User.findOne({ email }).then((user) => {
      if (user) {
      } else {
        return res.status(400).send({ message: "User does not exists" });
      }
    });
  } else {
    return res.status(400).send({ message: "Email is invalid" });
  }
});

module.exports = router;
