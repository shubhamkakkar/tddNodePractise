function bcryptPasswordFn(password) {
  const bcrypt = require("bcryptjs");
  const salt = bcrypt.genSaltSync("B4c0//");
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

module.exports = {
  bcryptPasswordFn,
};
