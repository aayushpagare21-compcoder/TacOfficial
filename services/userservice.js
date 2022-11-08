const User = require("../models/user.js");

require("../helpers/db.js");

async function getAllUsers(page, pageSize) {
  return await User.find()
    .limit(pageSize)
    .skip(page * pageSize);
}

module.exports = {
  getAllUsers,
};
