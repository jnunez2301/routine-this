const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    minLength: [2, "You must add at least 2 character"],
    maxLength: [32, "Your name is too long, try something shorter"],
    unique: true,
    required: [true, "Please assign a username"],
  },
  createdAt: {
    type: Date,
    required: false,
    default: new Date(),
  },
  password: {
    type: String,
    minLength: [6, "Password must be at least 6 characters long"],
    required: [true, "Password field cannot be empty"],
  },
  secretAnswer: {
    type: String,
    required: [
      true,
      "Just in case you forget private info, we must add an answer",
    ],
    minLength: [1, "Answer has to be at least 1 character long"],
    maxLength: [255, "Answer is too long"],
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
