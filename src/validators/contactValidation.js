const { ContactModel } = require("../models");
const { contactSchema } = require("./validationSchemes");

async function addValidation(req, res, next) {
  const contactExists = await ContactModel.exists({ email: req.body.email });

  if (contactExists) {
    return res.status(409).json({ message: "Conflict in the request" });
  }

  const valRes = contactSchema.validate(req.body);
  if (valRes.error) {
    return res.status(400).json({ message: "missing required fields" });
  }
  next();
}

function updateValidation(req, res, next) {
  if (Object.keys(req.body).length < 1) {
    return res.status(400).json({ message: "missing fields" });
  }
  const valRes = contactSchema.validate(req.body);
  if (valRes.error) {
    return res.status(400).json({ message: "Incorrect fields" });
  }
  next();
}

module.exports = {
  addValidation,
  updateValidation,
};
