const express = require("express");
const router = express.Router();

const authservice = require("../services/authservice.js");
const protect = require("../helpers/protect.js");

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

//If user wants to reset his password while log-in
router.post("/forget-password", sendResetPasswordMail);

// Gets reset password input field
router.get("/reset-password", (req, res, next) => {
  res.send("get reset password page here");
});

// Resets the password
router.post("/reset-password/:token/:userId", resetPassword);

// Login the user
router.post("/login", login);

router.get("/lol", protect, function (req, res) {
  
});

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
    .sendVerificationMail(params, next)
    .then((message) => {
      if (message) return res.status(200).json(message);
    })
    .catch((err) => {
      return next(err);
    }); //!Error sending mail internal server error
}

// Verifies the mail and redirects the user
// type void
function verifyMail(req, res, next) {
  authservice.verifyMail(req, res, next);
}

/*Gets the email address of the user and sends a link to reset a password */
function sendResetPasswordMail(req, res, next) {
  const params = {
    email: req.body.email,
    host: req.headers.host,
  };

  authservice
    .sendResetPasswordMail(params, next)
    .then((message) => {
      if (message) return res.status(200).json(message);
    })
    .catch((err) => {
      return next(err);
    }); //!Internal server error , error sending mail
}

/*Verifes the token and allows the user to reset the password */
function resetPassword(req, res, next) {
  authservice
    .resetPassword(req, res, next)
    .then((user) => {
      if (user) return res.status(202).json(user);
    })
    .catch((err) => {
      return next(err);
    }); //! Internal server error , not able to save user to db
}

function login(req, res, next) {
  authservice
    .login(req.body)
    .then((user) => {
      if (user) return res.status(200).json(user);
    })
    .catch((err) => {
      return next(err);
    });
}

module.exports = router;
