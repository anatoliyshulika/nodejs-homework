const { ContactModel } = require("../models");
const { asyncErrorHandler } = require("../utils");

const getContacts = asyncErrorHandler(async (req, res, next) => {
  const data = await ContactModel.find({ owner: req.user.id });
  res.status(200).json(data);
});

const getContactById = asyncErrorHandler(async (req, res, next) => {
  const data = await ContactModel.find({
    _id: req.params.contactId,
    owner: req.user.id,
  });
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

const removeContact = asyncErrorHandler(async (req, res, next) => {
  const data = await ContactModel.deleteOne({
    _id: req.params.contactId,
    owner: req.user.id,
  });
  if (data.deletedCount) {
    res.status(200).json({ message: "The contact was deleted successfully" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

const addContact = asyncErrorHandler(async (req, res, next) => {
  const contact = new ContactModel(req.body);
  contact.owner = req.user.id;
  const data = await contact.save();
  if (!data) {
    return res.status(500).send("Write error");
  }
  res.status(201).json(data);
});

const updateContact = asyncErrorHandler(async (req, res, next) => {
  const data = await ContactModel.findOneAndUpdate(
    { _id: req.params.contactId, owner: req.user.id },
    req.body,
    { new: true }
  );
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

const toggleFavoriteContact = asyncErrorHandler(async (req, res, next) => {
  const contact = await ContactModel.find({
    _id: req.params.contactId,
    owner: req.user.id,
  });
  const data = await ContactModel.findOneAndUpdate(
    { _id: req.params.contactId, owner: req.user.id },
    { favorite: !contact.favorite },
    { new: true }
  );
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  toggleFavoriteContact,
};
