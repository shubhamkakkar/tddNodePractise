const express = require("express");
const router = express.Router();

router.post("/", (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  if (!password) {
    return res.status(400).send({ message: "Password is required" });
  }

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return res.status(200).send({ message: "success" });
  } else {
    return res.status(400).send({ message: "Email is invalid" });
  }
});

module.exports = router;
