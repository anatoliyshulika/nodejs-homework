const { UserModel } = require("../models");
const { userSchema } = require("./validationSchemes");

async function createUserValidation(req, res, next) {
  const valRes = userSchema.validate(req.body);
  if (valRes.error) {
    return res.status(400).json({ message: valRes.error.details[0].message });
  }

  const userExists = await UserModel.exists({ email: req.body.email });
  if (userExists) {
    return res.status(409).json({ message: "Conflict in the request" });
  }
  next();
}

module.exports = { createUserValidation };
