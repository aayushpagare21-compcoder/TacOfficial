const express = require("express");
const router = express.Router();

const userservice = require("../services/userservice.js");

router.get("/", getAllUsers);

//Get all users from database
//query params : page and pageSize for pagination 
// !not in fiverr
function getAllUsers(req, res, next) { 
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0; 

  userservice
    .getAllUsers(page, pageSize)
    .then((users) => res.status(200).json(users))
    .catch((err) => next(err));
}  

module.exports = router;
