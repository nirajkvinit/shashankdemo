const Validator = require("validator");
const { isEmpty } = require("../utils");

module.exports = function emailVerificationValidation(data) {
  let errors = {};

  if (isEmpty(data) || typeof data !== "object") {
    errors.message = "Invalid input!";
    return {
      errors,
      isValid: isEmpty(errors)
    };
  }

  data.verificationkey =
    !isEmpty(data.verificationkey) && typeof data.verificationkey === "string"
      ? data.verificationkey
      : "";

  if (isEmpty(data.verificationkey)) {
    errors.message = "Verification key is invalid!";
  }

  if (!Validator.isLength(data.verificationkey, { min: 5 })) {
    errors.message = "Verification key is invalid!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
