const MailVerification = require("../models/authmodels/mailverification.js");
const User = require("../models/usermodels/user.js");

require("../helpers/db.js");
const sendMail = require("../helpers/sendmail.js");

const crypto = require("crypto");

// Sends email verification mail to user
async function sendVerificationMail(params) {
  const token = crypto.randomBytes(64).toString("hex");
  const mailObj = {
    email: params.email,
    emailToken: token,
  };

  try {
    await MailVerification.create(mailObj); //!handle it
  } catch (error) {
    //!handle 500 Internal Server Error;
  }

  return sendMail(
    params.email,
    `Thanks for registering to TAC`,
    `<h1> Please verify your email address by clicking on the link below </h1>  
  <p>The link would be only valid for 5 minutes </p>
  <a href="http://${params.host}/auth/verify-email?token=${token}"> Click Me </a>`
  );
}

async function verifyMail(req, res, next) {
  console.log(req.query.token, req.query.tokenid);
  //Check if the correct user access that route
  let mailObjFound;
  try {
    mailObjFound = await MailVerification.findOne({
      emailToken: req.query.token,
    });
  } catch (error) {
    //! 500 Internal Server Error
  } 

  //if not the correct user
  if (!mailObjFound) {
    return; //!authentication error 
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
