const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
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

const PlaceModel = mongoose.model("Place", placeSchema);
module.exports = PlaceModel;
