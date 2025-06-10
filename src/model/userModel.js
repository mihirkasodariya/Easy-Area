const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userRegisterSchema = new Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    profilePhoto: { type: String },
    isActive: { type: Boolean, default: true },
    role: { type: String, required: true, default: "user" },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userRegisterSchema);

const googleOAuthValidation = Joi.object({
  code: Joi.string().trim().required().messages({
    "string.empty": "Authorization code is required",
    "string.email": "Please provide a valid Authorization code",
    "any.required": "Authorization code is required",
  }),
});

module.exports = {
  userModel,
  googleOAuthValidation,
};
