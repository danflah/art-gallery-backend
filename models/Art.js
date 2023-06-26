const mongoose = require("mongoose");

const artSchema = new mongoose.Schema(
  { 
    artName: { 
      type: String,
      required: true    
    },
    artImage: {
      type: String,
      required: true
    },
    artType: {
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

module.exports = mongoose.model("Art", artSchema);