/*A utility module that sends mail */
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SG_MAIL_KEY);

async function sendmail(sendto, subject, text) {
  console.log(subject);
  const msg = {
    to: sendto,
    from: process.env.SG_FROM_MAIL,
    subject: subject,
    html: text,
  };
  const msgSend = await sgMail.send(msg);
  return msgSend;
}

module.exports = sendmail;
