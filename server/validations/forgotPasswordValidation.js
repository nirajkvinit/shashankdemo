const Validator = require("validator");
const { isEmpty } = require("../utils");

module.exports = function validateForgotPasswdInput(data) {
  let errors = {};

  if (isEmpty(data) || typeof data !== "object") {
    errors.email = "Invalid input";
  } else {
    data.email =
      !isEmpty(data.email) && typeof data.email === "string" ? data.email : "";

    if (isEmpty(data.email)) {
      errors.email = "Email field is required";
      return {
        errors,
        isValid: isEmpty(errors)
      };
    }

    if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
      return {
        errors,
        isValid: isEmpty(errors)
      };
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
