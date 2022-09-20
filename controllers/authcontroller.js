const express = require("express");
const router = express.Router();

const authservice = require("../services/authservice.js");

router.post("/", sendVerificationMail);
router.get("/verify-email", verifyMail);
router.get("/register", (req, res, next) => {
  res.send("You would get a register page here");
});

function verifyMail(req, res, next) {
  authservice.verifyMail(req, res, next);
}

// Gets email address of user and saves it temporarily for sending verification mails 
function sendVerificationMail(req, res, next) {
  const params = {
    email: req.body.email,
    host: req.headers.host,
  };

  authservice
    .sendVerificationMail(params)
    .then((message) => res.status(200).json(message))
    .catch((err) => next(err)); //!Error sending mail 500 internal server error.
}

module.exports = router;
