const jwt = require("jsonwebtoken");

function createToken(id) {
  const token = jwt.sign({ id }, process.env.PRIVATE_KEY, {
    algorithm: process.env.ALGORITM,
    expiresIn: process.env.EXPIRES,
  });
  return token;
}

module.exports = createToken;
