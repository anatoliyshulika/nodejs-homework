const jwt = require("jsonwebtoken");
const { UserModel } = require("../models");

async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decodedUser = await jwt.decode(token, process.env.PRIVATE_KEY);
    const user = await UserModel.findById(decodedUser.id);
    if (user && user.token === token) {
      req.user = user;
    } else {
      return res.status(401).json({ message: "Not authorized" });
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authMiddleware;
