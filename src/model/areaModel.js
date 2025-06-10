// models/areaModel.js
const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assuming you have a User model
      required: true,
    },
    name: { type: String, required: true },
    type: { type: String, required: true },
    coordinates: [
      {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        _id: false,
      },
    ],
    imageUrl: { type: String },
    scaleReference: { type: Number },
    calculatedArea: { type: Number },
    calculatedDistance: { type: Number },
    unit: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Area", areaSchema);
