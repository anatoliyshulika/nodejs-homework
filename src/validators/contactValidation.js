const Joi = require("joi");
const { ContactModel } = require("../models");

async function addValidation(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string()
      .pattern(/^\+380\d{9}$/)
      .required(),
    favorite: Joi.boolean(),
  });

  const contactExists = await ContactModel.exists({ email: req.body.email });

  if (contactExists) {
    return res.status(409).json({ message: "Conflict in the request" });
  }

  const valRes = schema.validate(req.body);
  if (valRes.error) {
    return res.status(400).json({ message: "missing required fields" });
  }
  next();
}

function updateValidation(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string()
      .pattern(/^\+380\d{9}$/)
      .required(),
    favorite: Joi.boolean(),
  });

  if (Object.keys(req.body).length < 1) {
    return res.status(400).json({ message: "missing fields" });
  }
  const valRes = schema.validate(req.body);
  if (valRes.error) {
    return res.status(400).json({ message: "Incorrect fields" });
  }
  next();
}

module.exports = {
  addValidation,
  updateValidation,
};
