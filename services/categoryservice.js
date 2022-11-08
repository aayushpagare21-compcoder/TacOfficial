const Category = require("../models/category.js");
const SubCategory = require("../models/subcategory.js"); //!important to register it here 

require("../helpers/db.js");

async function getAllCategories() {
  return await Category.find().populate("sub_category_id");
}

module.exports = {
  getAllCategories,
};
