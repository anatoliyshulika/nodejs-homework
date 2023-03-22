const Joi = require("joi");
const { UserModel } = require("../models");

async function createUserValidation(req, res, next) {
  const schema = Joi.object({
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    email: Joi.string().email().required(),
    subscription: Joi.string().required(),
    token: Joi.string().optional(),
  });

  const userExists = await UserModel.exists({ email: req.body.email });

  if (userExists) {
    return res.status(409).json({ message: "Conflict in the request" });
  }

  const valRes = schema.validate(req.body);
  if (valRes.error) {
    return res.status(400).json({ message: valRes.error.details[0].message });
  }
  next();
}

module.exports = { createUserValidation };
