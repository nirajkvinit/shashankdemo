const nodemailer = require("nodemailer");
let sgMail = require("@sendgrid/mail");

function sendHashCorpEmail(data) {
  // console.log(typeof process.env.SENDGRID_API_KEY);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // console.log("Sending email");
  data.from = { email: data.from, name: "Hashcorp Mailer" };
  // console.log(data.from);
  let mailResult = sgMail
    .send(data)
    .then(result => {
      // console.log(result);
    })
    .catch(err => {
      console.log("Mail sending Failed! Error: ", err);
    });
  // console.log("Sendgrid-----", mailResult);
  return true;
}

function sendHashCorpEmail_mailtrap(data) {
  let transporter = getMailTransporter();
  transporter.sendMail(data, (error, info) => {
    if (error) {
      console.log(error);
    }
  });
}

function getMailTransporter() {
  return nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "529bf17c0d2522",
      pass: "0e5ebebd46a739"
    }
  });
}

module.exports = { sendHashCorpEmail };
