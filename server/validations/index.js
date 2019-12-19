const emailVerificationValidation = require("./emailVerificationValidation");
const forgotPasswordValidation = require("./forgotPasswordValidation");
const loginFieldsValidation = require("./loginFieldsValidation");
const passwordValidation = require("./passwordValidation");
const profileFieldsValidation = require("./profileFieldsValidation");
const signupFieldsValidation = require("./signupFieldsValidation");
const updatePasswordValidation = require("./updatePasswordValidation");
const userPasswordValidation = require("./userPasswordValidation");

module.exports = {
  emailVerificationValidation,
  forgotPasswordValidation,
  loginFieldsValidation,
  passwordValidation,
  profileFieldsValidation,
  signupFieldsValidation,
  updatePasswordValidation,
  userPasswordValidation
};
