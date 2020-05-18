const express = require("express");
const router = express.Router();

const login = require("./user/login/login");
const signup = require("./user/signup/signup");

const getAllUsers = require("./adminOnlyRoute/getAllUsers/getAllUsers");

router.use("/user/login", login);
router.use("/user/signup", signup);
router.use("/adminOnlyRoute/getAllUsers/getAllUsers", getAllUsers);

module.exports = router;
