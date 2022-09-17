const mongoose = require("mongoose");

const mailVerficationSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    emailToken: { type: String, required: true },
  },
  { timstamps: true }
);

const MailVerification = mongoose.model(
  "MailVerification",
  mailVerficationSchema,
  "MailVerifications"
);

module.exports = MailVerification;
