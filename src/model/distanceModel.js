const Joi = require("joi");
const mongoose = require("mongoose");

const distanceSchema = new mongoose.Schema({
  latitude1: Number,
  longitude1: Number,
  latitude2: Number,
  longitude2: Number,
  distanceInMeters: Number,
  convertedDistances: Object,
  isActive: { type: Boolean, default: true },
});

const Distance = mongoose.model("Distance", distanceSchema);

const distanceValidation = Joi.object({
  latitude1: Joi.number().required().messages({
    "number.base": "Latitude1 must be a number",
    "any.required": "Latitude1 is required",
  }),
  longitude1: Joi.number().required().messages({
    "number.base": "Longitude1 must be a number",
    "any.required": "Longitude1 is required",
  }),
  latitude2: Joi.number().required().messages({
    "number.base": "Latitude2 must be a number",
    "any.required": "Latitude2 is required",
  }),
  longitude2: Joi.number().required().messages({
    "number.base": "Longitude2 must be a number",
    "any.required": "Longitude2 is required",
  }),
});




const coordinateSchema = Joi.object({
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
});

const coordinatesArraySchema = Joi.array()
  .items(coordinateSchema)
  .min(2) // at least 2 coordinates
  .required();


module.exports = {
  distanceValidation,
  coordinatesArraySchema,
  Distance,
};
