const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const SUBSCRIPTION_TYPE = require("../data");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
    select: false,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Data conflict"],
    lowercase: true,
  },
  subscription: {
    type: String,
    enum: Object.values(SUBSCRIPTION_TYPE),
    default: SUBSCRIPTION_TYPE.STARTER,
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

UserSchema.pre("save", async function () {
  if (this.isNew) {
    const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;

    const hashEmail = gravatar.url(
      this.email,
      { s: "200", r: "x", d: "robohash" },
      true
    );
    this.avatarURL = hashEmail;
  }
});

const UserModel = mongoose.model("User", UserSchema, "users");

module.exports = UserModel;
