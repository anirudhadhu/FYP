const mongoose = require('mongoose');
const { Schema } = mongoose;

const passwordResetSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    token: {
      type: String,
      required: true
    },
    expires: {
      type: Date,
      required: true
    }
  });
  
  const PasswordResetModel = mongoose.model('PasswordReset', passwordResetSchema);
  module.exports = PasswordResetModel