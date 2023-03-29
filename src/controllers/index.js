const {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  toggleFavoriteContact,
} = require("./contactController");
const {
  createUser,
  loginUser,
  logoutUser,
  currentUser,
  changeSubscription,
} = require("./userController");
const { uploadFile, upload } = require("./filesController");

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  toggleFavoriteContact,
  createUser,
  loginUser,
  logoutUser,
  currentUser,
  changeSubscription,
  uploadFile,
  upload,
};
