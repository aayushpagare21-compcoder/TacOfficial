const MailVerification = require("../models/authmodels/mailverification.js");
const User = require("../models/usermodels/user.js");
const ForgetPassword = require("../models/authmodels/forgetpassword.js");

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


async function sendResetPasswordMail(params) {
  // Generates a token and saves this object in database
  const token = crypto.randomBytes(64).toString("hex");
  const userFound = await User.findOne({ email: params.email });

  if (!userFound) {
    // return; //!user not registered
  }

  const mailObj = {
    userId: userFound._id,
    email: params.email,
    emailToken: token,
  };

  await ForgetPassword.create(mailObj);

  // Sends mail to the user
  return sendMail(
    params.email,
    `Sorry you find trouble logging in`,
    `<h1> Click on this link to reset your password </h1>  
  <p>The link would be only valid for 5 minutes </p>
  <a href="http://${params.host}/auth/reset-password?token=${token}&userId=${userFound._id}"> Click Me </a>`
  );
}

async function resetPassword(req, res, next) {
  console.log(req.params);
  const mailObjFound = await ForgetPassword.findOne({
    emailToken: req.params.token,
  });

  if (!mailObjFound) {
    //!invalid link
  }

  const userFound = await User.findById({ _id: req.params.userId });
  userFound.password = req.body.password;
  return await userFound.save();
}

module.exports = {
  sendVerificationMail,
  verifyMail,
  sendResetPasswordMail,
  resetPassword,
};
