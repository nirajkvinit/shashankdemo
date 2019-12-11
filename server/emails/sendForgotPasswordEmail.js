const nanoid = require("nanoid");

// const User = require("../models/User");
const sendHashCorpEmail = require("./sendHashCorpEmail");
const passwordRecovery = require("./templates/passwordRecovery");

function sendForgotPasswordEmail(user, req) {
  /**
   * // create a random string
   * // save or update in the database as password recovery key
   * // send email
   */

  let passkey = nanoid(48);

  if (user) {
    user.passkey = passkey;
    user.save();
    // send email

    let host = process.env.CLIENT_HOST;
    let link = `${host}/updatepassword/${passkey}`;

    let mailTemplate = passwordRecovery({ link, user, host });
    console.log("DefaultEmailSender", process.env.DEFAULT_EMAIL_SENDER);

    let mailOptions = {
      from: process.env.DEFAULT_EMAIL_SENDER,
      to: user.email,
      subject: "Forgot Password?",
      html: mailTemplate
    };
    sendHashCorpEmail.sendHashCorpEmail(mailOptions);
  }
}
module.exports = { sendForgotPasswordEmail };
