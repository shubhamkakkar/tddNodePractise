const express = require("express");
const router = express.Router();

router.post("/", (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  if (!email) {
    res.status(400).send({ message: "Email is required" });
  }

  if (!password) {
    res.status(400).send({ message: "Password is required" });
  }

  if (!confirmPassword) {
    res.status(400).send({ message: "Confirm password is required" });
  }

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    if (password !== confirmPassword) {
      res.status(400).send({ message: "Passwords do not match" });
    }
    // email is valid
  } else {
    res.status(400).send({ message: "Email is invalid" });
  }
});

module.exports = router;
