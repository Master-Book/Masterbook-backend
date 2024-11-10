
const bcrypt = require('bcrypt');

const comparePassword = async (password, hashedPassword, salt) => {
  const hashedInputPassword = await bcrypt.hash(password, salt);
  return hashedInputPassword === hashedPassword;
};

module.exports = { comparePassword };
            