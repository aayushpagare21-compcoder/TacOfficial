const express = require("express");
const router = express.Router();

const authservice = require("../services/authservice.js");

// Send your email to request a verification mail
router.post("/", sendVerificationMail);

//Verifies the email using token
router.get("/verify-email", verifyMail);

//After verifcation of mail user is redirected here
router.get("/register", (req, res, next) => {
  res.send("You would get a register page here");
});

//If email verification failed user is redirected here
router.get("/verification-mail-error", (req, res, next) => {
  res.send("error");
});

// Verifies the mail and redirects the user
// type void
function verifyMail(req, res, next) {
  authservice.verifyMail(req, res, next);
}

/* Gets the email address of the user
   Generates token and saves it in the database 
   type promise
*/
function sendVerificationMail(req, res, next) {
  const params = {
    email: req.body.email,
    host: req.headers.host,
  };

  authservice
    .sendVerificationMail(params)
    .then((message) => res.status(200).json(message))
    .catch((err) => next(err));
}

module.exports = router;
