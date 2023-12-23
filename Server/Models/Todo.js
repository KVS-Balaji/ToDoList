const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: false,
  },
  dueDate: {
    type: Date,
    required: false,
  },
  time: {
    type: String,
    required: false,
  },
});

const TodoModel = mongoose.model("todo", todoSchema);
module.exports = TodoModel;
