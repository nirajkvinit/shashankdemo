const Validator = require("validator");
const { isEmpty } = require("../utils");
const passwordValidation = require("./passwordValidation");

module.exports = function updatePasswordValidation(data) {
  let errors = {};

  if (isEmpty(data) || typeof data !== "object") {
    errors.message = "Invalid input";
  } else {
    data.email =
      !isEmpty(data.email) && typeof data.email === "string" ? data.email : "";
    data.passkey =
      !isEmpty(data.passkey) && typeof data.passkey === "string"
        ? data.passkey
        : "";

    if (isEmpty(data.email)) {
      errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }

    if (isEmpty(data.passkey)) {
      errors.passkey = "Password reset url is incorrect";
    } else if (data.passkey.length < 6) {
      errors.passkey = "Password reset url is incorrect";
    }

    errors = { ...errors, ...passwordValidation(data).errors };
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
