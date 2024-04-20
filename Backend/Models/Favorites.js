const mongoose = require("mongoose");

const FavoritesSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Place" },

});

const FavoritesModel = mongoose.model("Favorites", FavoritesSchema);
module.exports = FavoritesModel;
