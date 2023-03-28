const express = require("express");
const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  toggleFavoriteContact,
} = require("../controllers");
const {
  addValidation,
  updateValidation,
  mongoIdValidation,
} = require("../validators");
const { authMiddleware } = require("../middlewares");

const router = express.Router();

router.use(authMiddleware);
router.get("/", getContacts);
router.get("/:contactId", mongoIdValidation, getContactById);
router.delete("/:contactId", mongoIdValidation, removeContact);
router.post("/", addValidation, addContact);
router.put("/:contactId", mongoIdValidation, updateValidation, updateContact);
router.patch("/:contactId/favorite", mongoIdValidation, toggleFavoriteContact);

module.exports = router;
