const { addValidation, updateValidation } = require("./contactValidation");
const { createUserValidation } = require("./userValidation");
const mongoIdValidation = require("./mongoIdValidation");

module.exports = {
  addValidation,
  updateValidation,
  mongoIdValidation,
  createUserValidation,
};
