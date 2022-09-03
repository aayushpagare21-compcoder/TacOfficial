const mongoose = require("mongoose");

/*Verification Methods of User 
No user interaction required 
*/
const verificationSchema = mongoose.Schema(
  {
    verification_type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Verification = mongoose.model(
  "Verification",
  verificationSchema,
  "Verifications"
);

module.exports = Verification;
