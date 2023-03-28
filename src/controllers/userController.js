const bcrypt = require("bcrypt");
const { UserModel } = require("../models");
const { asyncErrorHandler, createToken } = require("../utils");
const { SUBSCRIPTION_TYPE } = require("../data");

const createUser = asyncErrorHandler(async (req, res) => {
  const user = new UserModel(req.body);
  const data = await user.save();
  if (!data) {
    return res.status(500).json({ message: "Write error" });
  }
  data.password = null;
  res.status(201).json(data);
});

const loginUser = asyncErrorHandler(async (req, res) => {
  const { password, email } = req.body;
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({ message: "Email or password is wrong" });
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
  loginUser,
  logoutUser,
  currentUser,
  changeSubscription,
};
