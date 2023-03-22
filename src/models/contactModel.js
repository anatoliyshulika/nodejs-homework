const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ContactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.ObjectId,
    ref: "user",
  },
});

const ContactModel = mongoose.model("Contact", ContactSchema, "contacts");

module.exports = ContactModel;
