const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema(
  {
    //* Referencing to Category (Every subcategory has a category)
    category_id: {
      type: String,
      // required: true,
      ref: "Category",
    },

    sub_category_name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    active_user: {
      type: Number,
    },
  },
  { timestamps: true }
);

const SubCategory = mongoose.model(
  "SubCategory",
  subCategorySchema,
  "SubCategories"
);

module.exports = SubCategory;
