const Category = require("../models/categorymodels/category.js");

require("../helpers/db.js");

async function getAllCategories(page, pageSize) {
  return await Category.find()
    .limit(pageSize)
    .skip(page * pageSize);
} 

module.exports = { 
    getAllCategories,
}
