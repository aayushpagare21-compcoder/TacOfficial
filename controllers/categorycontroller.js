const express = require("express");
const router = express.Router();

const categoryservice = require("../services/categoryservice.js");

router.get("/", getAllCategories);

//gets all categories as well as subcategories related to them
//! Navbar in fiverr
function getAllCategories(req, res, next) {
  categoryservice
    .getAllCategories()
    .then((categories) => res.status(200).json(categories))
    .catch((err) => next(err));
}

module.exports = router;
