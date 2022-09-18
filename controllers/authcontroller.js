const express = require("express");
const router = express.Router();

const authservice = require("../services/authservice.js");

router.post("/", sendVerificationMail);
router.get("/verify-email", verifyMail);  

router.get("/register", (req, res, next) => {
  res.send("You would get a register page here");
});  


// Gets email address of user and saves it temporarily for sending verification mails
function sendVerificationMail(req, res, next) {
  authservice
    .sendVerificationMail(req)
    .then((message) => {
      res.status(200).json({ message: message });
    })
    .catch((err) => next(err)); // Error sending mail
}

//Verifies user's mail
function verifyMail(req, res, next) {
  authservice.verifyMail(req, res, next);
}

module.exports = router;
