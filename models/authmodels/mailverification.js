const mongoose = require("mongoose");

const mailVerficationSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      unique: true,
      required: true,
      ref: "User",
    },
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

const MailVerification = mongoose.model(
  "MailVerification",
  mailVerficationSchema,
  "MailVerifications"
);

module.exports = MailVerification;
