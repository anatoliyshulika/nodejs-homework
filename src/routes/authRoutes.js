const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
  currentUser,
  changeSubscription,
} = require("../controllers");
const { createUserValidation } = require("../validators");
const { authMiddleware } = require("../middlewares");

const router = express.Router();

router.post("/register", createUserValidation, createUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.get("/current", authMiddleware, currentUser);
router.patch("/", authMiddleware, changeSubscription);

module.exports = router;
