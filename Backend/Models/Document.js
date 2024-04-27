const mongoose = require('mongoose');
const { Schema } = mongoose;

const documentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    documents: {
        type: [String], // Assuming the documents are stored as file paths
        required: true
    }
});

const DocumentModel = mongoose.model('Document', documentSchema);
module.exports = DocumentModel;
