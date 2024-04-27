const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Place' },
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    name: { type: String, required: true },
    number: { type: String, required: true },
    numberOfGuests: { type: Number, required: true },
    numberOfDays: { type: Number, required: true },
    price: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    transactionId: { type: String },
});

const BookingModel = mongoose.model('Booking', bookingSchema);
module.exports = BookingModel;
