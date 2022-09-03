const mongoose = require("mongoose");

/*Metadata of User  
Once user creates an account he might complete his profile filling theses details 
*/
const userMetaSchema = mongoose.Schema(
  {
    //* Referencing to User Model (Every user has a usermeta)
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },

    //* Referencing to Role Model (Every user has a role)
    role_id: {
      type: mongoose.Types.ObjectId,
      ref: "Role",
      required: true,
    },

    //* Referencing to Verification Model (Every user has a verification type)
    verification_type_id: {
      type: mongoose.Types.ObjectId,
      ref: "Verification",
      required: true,
    },

    //* Referencing  to Category Model (Every user has chosen 5 categories)
    category_id_1: {
      type: mongoose.Types.ObjectId,
      Ref: "Category",
      required: true,
    },
    category_id_2: {
      type: mongoose.Types.ObjectId,
      Ref: "Category",
      required: true,
    },
    category_id_3: {
      type: mongoose.Types.ObjectId,
      Ref: "Category",
      required: true,
    },
    category_id_4: {
      type: mongoose.Types.ObjectId,
      Ref: "Category",
      required: true,
    },
    category_id_5: {
      type: mongoose.Types.ObjectId,
      Ref: "Category",
      required: true,
    },

    profile_picture: {
      type: String,
      trim: true,
    },

    about_me: {
      type: String,
      trim: true,
    },

    portfolio: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const UserMeta = mongoose.model("UserMeta", userMetaSchema, "UserMetas");

module.exports = UserMeta;
