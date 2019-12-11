const nanoid = require("nanoid");

const User = require("../models/User");
const sendHashCorpEmail = require("./sendHashCorpEmail");
const emailVerification = require("./templates/emailVerification");

function sendEmailVerificationEmail(userId, req) {
  /**
   * 1. Get the user from database
   * 2. Create the random key for verification
   * 3. Store the random key in the user's document
   * 4. Send Email to user
   */

  let verificationkey = null;

  // Find user by id
  User.findById(userId)
    .then(user => {
      if (user) {
        if (user.verificationkey.length < 5) {
          // generate random key for email verification
          verificationkey = nanoid(48);
          user.verificationkey = verificationkey;

          // save the user
          user.save();
        } else {
          verificationkey = user.verificationkey;
        }
        // send email

        let host = process.env.CLIENT_HOST;
        let link = `${host}/verify?verificationkey=${verificationkey}`;

        let mailTemplate = emailVerification({ link, user, host });

        let mailOptions = {
          from: process.env.DEFAULT_EMAIL_SENDER,
          to: user.email,
          subject: "Kindly Verify Your Email Address For Hashcloud",
          html: mailTemplate
        };
        sendHashCorpEmail.sendHashCorpEmail(mailOptions);
      }
    })
    .catch(error => console.log(error));
}
module.exports = { sendEmailVerificationEmail };
