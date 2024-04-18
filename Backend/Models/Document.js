const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({ 
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    documents:[String],

});

const DocumentModel = mongoose.model('Document', DocumentSchema);
module.exports = DocumentModel;