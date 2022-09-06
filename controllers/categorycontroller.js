const express = require("express");
const router = express.Router();

const categoryservice = require("../services/categoryservice.js");

router.get("/", getAllCategories);

function getAllCategories(req, res, next) { 
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  categoryservice
    .getAllCategories(page, pageSize)
    .then((categories) => res.status(200).json(categories))
    .catch((err) => next(err));
}

module.exports = router;
