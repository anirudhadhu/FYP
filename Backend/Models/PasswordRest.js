const mongoose = require("mongoose");
const { Schema } = mongoose; // Destructuring Schema from mongoose for easier usage

// Defining the schema for password resets
const passwordResetSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Referencing the User model
  token: {
    type: String,
    required: true,
  }, // Token generated for the password reset process
  expires: {
    type: Date,
    required: true,
  },
});

// Creating the PasswordReset model using the defined schema
const PasswordResetModel = mongoose.model("PasswordReset", passwordResetSchema);
module.exports = PasswordResetModel;
