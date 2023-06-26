const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
  { 
    artistName: {
      type: String,
      required: true,
    },
    artistImage: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Artist", artistSchema);