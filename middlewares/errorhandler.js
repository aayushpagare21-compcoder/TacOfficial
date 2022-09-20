const customerror = require("../helpers/customerror.js");

function errorhandler(err, req, res, next) {
  let statusCode = 500;

  let data = {
    message: "Internal Server Error",
  };

  if (err instanceof customerror) {
    (statusCode = err.status),
      (data = {
        message: err.message,
      });
  }

  return res.status(statusCode).json(data);
}

module.exports = errorhandler;
