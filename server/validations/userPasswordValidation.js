const Validator = require("validator");
const { isEmpty } = require("../utils");
const passwordValidation = require("./passwordValidation");

module.exports = function userPasswordValidation(data) {
  let errors = {};

  if (isEmpty(data) || typeof data !== "object") {
    errors.message = "Invalid input";
  } else {
    data.existingPassword =
      !isEmpty(data.existingPassword) &&
      typeof data.existingPassword === "string"
        ? data.existingPassword
        : "";

    if (isEmpty(data.existingPassword)) {
      errors.existingPassword = "Existing Password field is required";
    }

    errors = { ...errors, ...passwordValidation(data).errors };
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
