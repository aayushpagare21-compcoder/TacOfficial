const mongoose = require("mongoose");
/*Details of Seller 
When a user will create his seller profile it would be stored here
*/

const sellerSchema = mongoose.Schema(
  {
    //* Referncing to user model (Every Seller is a user)
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },

    //* Referencing to role model (Every seller has a role of seller)
    role_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Role",
    },

    //* For grabbing profile picture, description, categories and portfolio site
    user_meta_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "UserMeta",
    },

    language: {
      type: String,
      trim: true,
    },

    skills: {
      type: [
        {
          skillname: {
            type: String,
            trim: true,
          },
          experience: {
            type: String,
            trim: true,
          },
        },
      ],
    },

    //* Refrecing to Other Schemas
    education: {
      country: { type: mongoose.Types.ObjectId, ref: "Country" },
      college: { type: mongoose.Types.ObjectId, ref: "College" },
      degree: { type: mongoose.Types.ObjectId, ref: "Degree" },
      year: {
        start_year: Number,
        end_year: Number,
      },
    },

    certificates: [String],

    //! Seprate tables could be created for each signups data later
    //! e.g user_instagram, user_meta
    social_signup: {
      instagram: { type: String, trim: true },
      twitter: { type: String, trim: true },
      meta: { type: String, trim: true },
      linkedin: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

const Seller = mongoose.model("Seller", sellerSchema, "Sellers");

module.exports = Seller;
