const mongoose = require("mongoose");

export const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
});

export const UserModel = mongoose.model("user", userSchema);