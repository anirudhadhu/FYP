const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    uniqueString: {
        type: String,
    },
    role: {
        type: String,
        default: 'user' 
    },
    verified:{
        type: Boolean,
        default: false
    }
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
