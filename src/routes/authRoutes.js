const express = require("express");
const {
  createUser,
  resendingEmail,
  emailConfirmation,
  loginUser,
  logoutUser,
  currentUser,
  changeSubscription,
  uploadFile,
  upload,
} = require("../controllers");
const { createUserValidation } = require("../validators");
const { authMiddleware } = require("../middlewares");

const router = express.Router();

router.post("/register", createUserValidation, createUser);
router.get("/verify/:verificationToken", emailConfirmation);
router.post("/verify", resendingEmail);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.get("/current", authMiddleware, currentUser);
router.patch("/", authMiddleware, changeSubscription);
router.patch("/avatars", authMiddleware, upload.single("avatar"), uploadFile);

module.exports = router;
