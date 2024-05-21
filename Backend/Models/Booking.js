const mongoose = require("mongoose");

// Defining the schema for bookings
const bookingSchema = new mongoose.Schema(
  {
    place: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Place",
    }, // Reference to the Place model
    
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    name: { type: String, required: true },
    number: { type: String, required: true },
    numberOfGuests: { type: Number, required: true },
    numberOfDays: { type: Number, required: true },
    perks: { type: String, required: true },
    price: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    paymentIntentId: { type: String, required: true },
  },
  { timestamps: true }
);

const BookingModel = mongoose.model("Booking", bookingSchema); // Creating the Booking model using the defined schema
module.exports = BookingModel;
