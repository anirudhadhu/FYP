const mongoose = require("mongoose");

// Defining the schema for favorites
const FavoritesSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, // Reference to the User model
  place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Place" }, // Reference to the Place model
});

const FavoritesModel = mongoose.model("Favorites", FavoritesSchema);
module.exports = FavoritesModel;
