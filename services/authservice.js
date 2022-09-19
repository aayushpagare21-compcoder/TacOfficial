const MailVerification = require("../models/authmodels/mailverification.js");
const User = require("../models/usermodels/user.js");

require("../helpers/db.js");
const sendMail = require("../helpers/sendmail.js");

const crypto = require("crypto");

// Sends email verification mail to user
async function sendVerificationMail(params) {
  const userFound = await User.findOne({ email: params.email });
  if (!userFound) {
    return "register first"; //handle it later dw
  }

  const token = crypto.randomBytes(64).toString("hex");
  const userFoundId = userFound._id;

  const mailObj = {
    userId: userFoundId,
    email: params.email,
    emailToken: token,
  };

  await MailVerification.create(mailObj);

  return sendMail(
    params.email,
    `Thanks for registering to TAC`,
    `<h1> Please verify your email address by clicking on the link below </h1>  
  <p>The link would be only valid for 5 minutes </p>
  <a href="http://${params.host}/auth/verify-email?token=${token}&tokenid=${userFoundId}"> Click Me </a>`
  );
}

async function verifyMail(req, res, next) {
  console.log(req.query.token, req.query.tokenid);
  //Check if the correct user access that route
  const mailObjFound = await MailVerification.findOne({
    emailToken: req.query.token,
  });

  //if not the correct user
  if (!mailObjFound) {
    return "invalid link";
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
