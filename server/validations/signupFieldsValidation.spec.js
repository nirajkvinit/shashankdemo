const { expect } = require("chai");
const signupFieldsValidation = require("./signupFieldsValidation");

// expects an object with following properties (email)

describe("signupFieldsValidation", () => {
  let expectedInput = {
    email: "correct@email.address"
  };

  let expectedOutput = {
    errors: {},
    isValid: true
  };

  let invalidInputError = {
    errors: { email: "Invalid input" },
    isValid: false
  };

  let emailRequiredError = {
    errors: { email: "Email field is required" },
    isValid: false
  };

  let invalidEmailError = {
    errors: { email: "Email is invalid" },
    isValid: false
  };

  it("should reject if input is not an object", () => {
    let incorrectInput = [
      "randomString",
      "",
      54524545,
      true,
      false,
      "KJHGI^&76*^*%%#@"
    ];

    incorrectInput.forEach(item =>
      expect(signupFieldsValidation(item)).to.deep.equal(invalidInputError)
    );
  });

  it("should reject if input object does not have 'email' property ", () => {
    let incorrectInput = [
      { verificationkey: 123 },
      { verificationkey: true },
      { verificationkey: [] },
      { fruit: "apple" }
    ];

    incorrectInput.forEach(item =>
      expect(signupFieldsValidation(item)).to.deep.equal(emailRequiredError)
    );
  });

  it("should reject if 'email' property of input object is not a string", () => {
    let incorrectInput = [
      { email: 123 },
      { email: true },
      { email: [] },
      { email: [1, 2] },
      { email: {} },
      { email: { test: "test" } }
    ];

    incorrectInput.forEach(item =>
      expect(signupFieldsValidation(item)).to.deep.equal(emailRequiredError)
    );
  });

  it("should reject if input object's email proper does not have valid email address", () => {
    let incorrectInput = [{ email: "apple" }, { email: "apple@banana" }];

    incorrectInput.forEach(item =>
      expect(signupFieldsValidation(item)).to.deep.equal(invalidEmailError)
    );
  });

  it("should validate and return successful expected output if expected input given", () => {
    expect(signupFieldsValidation(expectedInput)).to.deep.equal(expectedOutput);
  });
});
