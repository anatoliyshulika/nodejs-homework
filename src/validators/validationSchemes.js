const Joi = require("joi");

const contactSchema = Joi.object({
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

const userSchema = Joi.object({
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().required(),
  token: Joi.string().optional(),
});

module.exports = { contactSchema, userSchema };
