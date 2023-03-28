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
};
