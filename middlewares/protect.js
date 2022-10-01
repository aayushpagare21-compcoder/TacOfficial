const customerror = require("../helpers/customerror.js");
const jwtservice = require("../helpers/jwtservice.js");

async function protect(req, res, next) {
  const authHeader = req.header.authorization;

  if (!authHeader) {
    return next(customerror.unauthorizedUser("Please login first"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwtservice.verify(token);
    req.payload = payload;
    next();
  } catch (error) {
    return next(customerror.unauthorizedUser("Please login first"));
  }
}

module.exports = protect; 