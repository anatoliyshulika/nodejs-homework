const mongoose = require("mongoose");

function mongoIdValidation(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
    return res.status(400).json({ message: "Invalid contact ID" });
  }
  next();
}

module.exports = mongoIdValidation;
