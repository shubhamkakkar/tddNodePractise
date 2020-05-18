const express = require("express");
const router = express.Router();

router.post("/", (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
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

    return res.status(200).send({ message: "success" });
    // email is valid
  } else {
    return res.status(400).send({ message: "Email is invalid" });
  }
});

module.exports = router;
