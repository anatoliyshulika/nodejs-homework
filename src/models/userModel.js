const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
});

UserSchema.pre("save", async function () {
  if (this.isNew) {
    const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
  }
});

const UserModel = mongoose.model("User", UserSchema, "users");

module.exports = UserModel;
