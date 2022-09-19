const mongoose = require("mongoose");

const forgetPasswordSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, required: true },
    emailToken: { type: String, required: true, unique: true, required: true },
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: "300s" },
    },
  },
  { timstamps: true }
);

const ForgetPassword = mongoose.model(
  "ForgetPassword",
  forgetPasswordSchema,
  "ForgetPasswords"
);

module.exports = ForgetPassword;
