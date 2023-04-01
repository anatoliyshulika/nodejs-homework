const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { UserModel } = require("../models");
const { asyncErrorHandler, createToken } = require("../utils");
const { sendConfirmationEmail } = require("../services");
const { SUBSCRIPTION_TYPE } = require("../data");

const createUser = asyncErrorHandler(async (req, res) => {
  const user = new UserModel(req.body);
  user.verificationToken = crypto.randomUUID();
  const data = await user.save();
  if (!data) {
    return res.status(500).json({ message: "Write error" });
  }
  data.password = null;
  const verificationLink = `localhost:3000/api/users/verify/${user.verificationToken}`;
  await sendConfirmationEmail(user.email, verificationLink);
  res.status(201).json({ message: "Required confirm your email" });
});

const resendingEmail = asyncErrorHandler(async (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).json({ message: "missing required field email" });
  }

  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.verify) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }

  const verificationLink = `localhost:3000/api/users/verify/${user.verificationToken}`;
  await sendConfirmationEmail(user.email, verificationLink);
  res.status(200).json({ message: "OK" });
});

const emailConfirmation = asyncErrorHandler(async (req, res) => {
  const user = await UserModel.findOne({
    verificationToken: req.params.verificationToken,
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.verificationToken = " ";
  user.verify = true;
  await user.save();
  res.status(200).json({ message: "Verification successful" });
});

const loginUser = asyncErrorHandler(async (req, res) => {
  const { password, email } = req.body;
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({ message: "Email or password is wrong" });
  }

  if (!user.verify) {
    return res.status(403).json({ message: "Required confirm your email" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const { id } = user;
    user.token = createToken(id);
    await user.save();
    user.password = null;
    res.status(200).json(user);
  } else {
    res.status(401).json({ message: "Email or password is wrong" });
  }
});

const logoutUser = asyncErrorHandler(async (req, res) => {
  const user = await UserModel.findById(req.user.id);
  if (!user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  user.token = null;
  await user.save();
  res.status(204).end();
});

const currentUser = asyncErrorHandler(async (req, res) => {
  const user = await UserModel.findById(req.user.id);
  if (!user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  res.status(200).json(user);
});

const changeSubscription = asyncErrorHandler(async (req, res) => {
  const user = await UserModel.findById(req.user.id);
  if (!user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const subscriptions = Object.values(SUBSCRIPTION_TYPE);
  if (subscriptions.includes(req.body.subscriptionType)) {
    user.subscription = req.body.subscriptionType;
    user.save();
  }

  res.status(200).json(user);
});

module.exports = {
  createUser,
  resendingEmail,
  loginUser,
  logoutUser,
  currentUser,
  changeSubscription,
  emailConfirmation,
};
