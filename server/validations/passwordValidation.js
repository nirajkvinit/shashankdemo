const Validator = require("validator");
const { isEmpty } = require("../utils");

const owasp = require("owasp-password-strength-test");
owasp.config({
  allowPassphrases: false,
  maxLength: 128,
  minLength: 6,
  minPhraseLength: 10,
  minOptionalTestsToPass: 3
});

module.exports = function passwordValidation(data) {
  let errors = {};

  if (isEmpty(data) || typeof data !== "object") {
    errors.message = "Invalid input";
  } else {
    data.password =
      !isEmpty(data.password) && typeof data.password === "string"
        ? data.password
        : "";
    data.password2 =
      !isEmpty(data.password2) && typeof data.password2 === "string"
        ? data.password2
        : "";

    if (isEmpty(data.password)) {
      errors.password = "Password field is required";
    } else {
      if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be between 6 and 30 characters";
      } else {
        let passwdTestResult = owasp.test(data.password);
        if (passwdTestResult.errors.length > 0) {
          errors.password = passwdTestResult.errors[0];
        }
      }
    }

    if (isEmpty(data.password2)) {
      errors.password2 = "Confirm Password field is required";
    }

    if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = "Passwords must match";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
