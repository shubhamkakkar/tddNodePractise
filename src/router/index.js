const express = require("express");
const router = express.Router();

const login = require("./user/login/login");
const signup = require("./user/signup/signup");

router.use("/user/login", login);
router.use("/user/signup", signup);

module.exports = router;
