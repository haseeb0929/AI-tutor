const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
  fileName: String,
  filePath: String,
  fileType: String,
  size: Number,
}, { timestamps: true });

module.exports = mongoose.model("Pdf", pdfSchema);