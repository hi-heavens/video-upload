const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  fileId: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
});

const Upload = mongoose.model("Upload", uploadSchema);

module.exports = Upload;
