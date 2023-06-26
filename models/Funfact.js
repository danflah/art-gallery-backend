const mongoose = require("mongoose");

const funFactSchema = new mongoose.Schema(
  { 
    title: { 
      type: String,
      required: true    
    },
    image: {
      type: String,
      required: true
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Funfact", funFactSchema);