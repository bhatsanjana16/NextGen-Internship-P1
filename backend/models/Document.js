const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Document', documentSchema);

// const mongoose = require("mongoose");

// const fileSchema = new mongoose.Schema({
//   filename: String,
//   path: String,
// });

// const documentSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   content: String,
//   files: [fileSchema],
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Document", documentSchema);
