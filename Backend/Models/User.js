const mongoose = require("mongoose");
const { Schema } = mongoose; // Destructuring Schema from mongoose for easier usage

// Defining the schema for users
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  uniqueString: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

// Creating the User model using the defined schema
const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
