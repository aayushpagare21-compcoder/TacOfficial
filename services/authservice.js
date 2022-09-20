const MailVerification = require("../models/authmodels/mailverification.js");
const User = require("../models/usermodels/user.js");

require("../helpers/db.js");
const sendMail = require("../helpers/sendmail.js");

const crypto = require("crypto");

/*Sends email verification mail to user 
 returns a promise */
async function sendVerificationMail(params) {
  // Generates a token and saves this object in database
  const token = crypto.randomBytes(64).toString("hex");
  const mailObj = {
    email: params.email,
    emailToken: token,
  };
  await MailVerification.create(mailObj);

  // Sends mail to the user
  return sendMail(
    params.email,
    `Thanks for registering to TAC`,
    `<h1> Please verify your email address by clicking on the link below </h1>  
  <p>The link would be only valid for 5 minutes </p>
  <a href="http://${params.host}/auth/verify-email?token=${token}"> Click Me </a>`
  );
}

/* 
  verifies users email address 
  redirects the user
*/
async function verifyMail(req, res, next) {
  // Verifies the token
  const mailObjFound = await MailVerification.findOne({
    emailToken: req.query.token,
  });

  //If token not verified redirects to verification error page
  if (!mailObjFound) {
    res.redirect("/auth/verification-mail-error");
  } else {
    //redirect to the register page :
    res.redirect(`/auth/register`);
    mailObjFound.emailToken = null;
  }
}

module.exports = {
  sendVerificationMail,
  verifyMail,
};
