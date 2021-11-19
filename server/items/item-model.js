// import mongoose
const mongoose = require("mongoose");

// creating schema
const itemSchema = new item.Schema({
  teacherName: String,
  name: String,
  currClass: String,
  content: String,
  createdAt: Date,
  isDone: {
    type: Boolean,
    default: false,
  },
});

// creating model
const itemModel = mongoose.model("Item", itemSchema);

// exporting the model and schema:
module.exports = {
    itemSchema,
    itemModel,
}
