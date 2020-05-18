const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
function bcryptPasswordFn(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function userReturnWithJWT(doc) {
  const secretKey = "IsPalindrome?";
  const token = jwt.sign(
    { email: doc.email, _id: doc._id, role: doc.role },
    secretKey
  );
  return {
    ...doc,
    token,
  };
}

module.exports = {
  bcryptPasswordFn,
  userReturnWithJWT,
};
