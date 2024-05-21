const mongoose = require("mongoose");
const { Schema } = mongoose;

// Defining the schema for documents
const documentSchema = new Schema({
  user: {
    // Reference to the User model
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  documents: {
    type: [String],
    required: true,
  },
});

// Creating the Document model using the defined schema
const DocumentModel = mongoose.model("Document", documentSchema);
module.exports = DocumentModel;
