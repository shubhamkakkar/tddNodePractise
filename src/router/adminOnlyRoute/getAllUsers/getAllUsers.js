const express = require("express");
const User = require("../../../schema/User");
const { userInfroFromJWTExtract } = require("../../user/helper");
const { ErrorHandler } = require("../../../customHandlers/error");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const token = req.header("authorization");
  if (token && token.trim().length) {
    const userInfroFromJWT = userInfroFromJWTExtract(token);
    if (userInfroFromJWT.email) {
      if (userInfroFromJWT.role === "admin") {
        const users = await User.find();
        return res.status(200).send({ users });
      } else {
        return next(new ErrorHandler(401, "Un-autherized access"));
      }
    } else {
      return next(new ErrorHandler(400, "Authentication token is invalid"));
    }
  } else {
    return next(new ErrorHandler(400, "Authentication token not sent"));
  }
});
module.exports = router;
