const sendHashCorpEmail = require("./sendHashCorpEmail");
const passwordUpdate = require("./templates/passwordUpdate");

function sendPasswordUpdateEmail(user, req) {
  let host = process.env.CLIENT_HOST;
  let login = `${host}/signin`;
  let mailTemplate = passwordUpdate({ user, login, host });

  let mailOptions = {
    from: process.env.DEFAULT_EMAIL_SENDER,
    to: user.email,
    subject: "Your password was updated successfully!",
    html: mailTemplate
  };
  sendHashCorpEmail.sendHashCorpEmail(mailOptions);
}
module.exports = { sendPasswordUpdateEmail };
