const MailVerification = require("../models/authmodels/mailverification.js");

require("../helpers/db.js");

//for sending mails
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");

//setting up the API key
sgMail.setApiKey(process.env.SG_MAIL_KEY);

async function sendVerificationMail(req) {
  //Save the user to Database temporarily
  const mailObj = {
    email: req.body.email,
    emailToken: crypto.randomBytes(64).toString("hex"),
  };
  const savedMailObj = await MailVerification.create(mailObj);

  //Send message
  const msg = {
    to: req.body.email,
    from: process.env.SG_FROM_MAIL,
    subject: "Thank for registering to TAC please verify your email address",
    html: `<h1> Please verify your email address by clicking on the link below </h1>  
    <p>The link would be only valid for 5 minutes </p>
    <a href="http://${req.headers.host}/auth/verify-email?token=${savedMailObj.emailToken}"> Click Me </a>`,
  };

  const msgSend = await sgMail.send(msg);

  return msgSend;
}

/* 
  1. Save user's email address and token in the database temporarily. 
  2. If user clicks on the verification link he is redirected to the "verify-email" route along with token 
  3. If token is verified user is redirected to register page along with token 
  4. On register route token would be verified first (so that any non-verified user will not access /auth/register and fill the details) 
  5. The token would be set to null and the user entry would be deleted from db after 5 minutes 
*/
async function verifyMail(req, res, next) {
  //Check if the correct user access that route
  const mailObjFound = await MailVerification.findOne({
    emailToken: req.query.token,
  });

  //if not the correct user
  if (!mailObjFound) {
    return next(error); //verification error
  } else {
    //redirect to the register page :
    res.redirect(`/auth/register?token=${req.query.token}`);
    mailObjFound.emailToken = null;
  }
}

module.exports = {
  sendVerificationMail,
  verifyMail,
};
