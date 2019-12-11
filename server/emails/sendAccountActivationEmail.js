const sendHashCorpEmail = require("./sendHashCorpEmail");
const accountActivation = require("./templates/accountActivation");

function sendAccountActivationEmail(user, req) {
  let host = process.env.CLIENT_HOST;
  let login = `${host}/signin`;
  let mailTemplate = accountActivation({ user, login, host });
  let mailOptions = {
    from: process.env.DEFAULT_EMAIL_SENDER,
    to: user.email,
    subject: "Your account was activated successfully!",
    html: mailTemplate
  };
  sendHashCorpEmail.sendHashCorpEmail(mailOptions);
}
module.exports = { sendAccountActivationEmail };
