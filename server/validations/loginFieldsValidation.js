const Validator = require("validator");
const { isEmpty } = require("../utils");

module.exports = function validateLoginInput(data) {
  let errors = {};

  if (isEmpty(data) || typeof data !== "object") {
    errors.message = "Invalid input";
  } else {
    data.email =
      !isEmpty(data.email) && typeof data.email === "string" ? data.email : "";
    data.password =
      !isEmpty(data.password) && typeof data.password === "string"
        ? data.password
        : "";

    if (isEmpty(data.email)) {
      errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }

    if (isEmpty(data.password)) {
      errors.password = "Password field is required";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
