const mongoose = require("mongoose");

/*TAC Categories 
No user interaction required
*/

const categorySchema = mongoose.Schema(
  {
    //* Referencing to the subcategory model (Every Category has zero or more subcategory)
    sub_category_id: {
      type: [
        { type: mongoose.Types.ObjectId, ref: "SubCategory", required: true },
      ],
      Ref: "SubCategory",
    },

    category_name: {
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

const Category = mongoose.model("Category", categorySchema, "Categories");

module.exports = Category;
