const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = "IsPalindrome?";

function bcryptPasswordFn(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function userReturnWithJWT(doc) {
  const token = jwt.sign(
    { email: doc.email, _id: doc._id, role: doc.role },
    secretKey
  );
  return {
    ...doc,
    token,
  };
}

function userInfroFromJWTExtract(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return {
      status: 400,
      message: "Invalid token",
    };
  }
}

module.exports = {
  bcryptPasswordFn,
  userReturnWithJWT,
  userInfroFromJWTExtract,
};
