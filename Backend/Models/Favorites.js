const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Add a field for storing favorite places
  favoritePlaces: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place", // Reference to the Place model
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
