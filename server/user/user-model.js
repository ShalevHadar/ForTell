const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  userSchema,
  UserModel,
};