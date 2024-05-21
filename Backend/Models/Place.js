const mongoose = require("mongoose");

// Defining the schema for places
const placeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the owner user
  title: {
    type: String,
  },
  address: {
    type: String,
  },
  photos: [String],
  description: {
    type: String,
  },
  perks: [String],
  extraInfo: String,
  checkIn: {
    type: String,
  },
  checkOut: {
    type: String,
  },
  maxGuests: Number,
  price: Number,
});

// Creating the Place model using the defined schema
const PlaceModel = mongoose.model("Place", placeSchema);
module.exports = PlaceModel;
