const { isEmpty } = require("../utils");

module.exports = function emailVerificationValidation(data) {
  let errors = {};
  let errorMessage = "Invalid input or verification key is invalid";

  if (isEmpty(data) || typeof data !== "object") {
    errors.message = errorMessage;
  } else {
    data.verificationkey =
      !isEmpty(data.verificationkey) && typeof data.verificationkey === "string"
        ? data.verificationkey
        : "";

    if (isEmpty(data.verificationkey)) {
      errors.message = errorMessage;
    }

    if (data.verificationkey.length < 5) {
      errors.message = errorMessage;
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
