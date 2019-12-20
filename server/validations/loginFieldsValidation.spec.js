const { expect } = require("chai");
const loginFieldsValidation = require("./loginFieldsValidation");

// expects an object with following properties (email)

describe("loginFieldsValidation", () => {
  let expectedInput = {
    email: "correct@email.address",
    password: "s0m3S@mp13password"
  };

  let expectedOutput = {
    errors: {},
    isValid: true
  };

  let invalidInputError = {
    errors: { message: "Invalid input" },
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
      expect(loginFieldsValidation(item)).to.deep.equal(invalidInputError)
    );
  });

  it("should reject if input object does not have 'email' property ", () => {
    let incorrectInput = [
      { number: 123 },
      { boolProp: true },
      { emptyArr: [] },
      { fruit: "apple" }
    ];

    incorrectInput.forEach(item =>
      expect(loginFieldsValidation(item).errors.email).to.equal(
        "Email field is required"
      )
    );
  });

  it("should reject if input object does not have 'password' property ", () => {
    let incorrectInput = [
      { verificationkey: 123 },
      { verificationkey: true },
      { verificationkey: [] },
      { fruit: "apple" }
    ];

    incorrectInput.forEach(item =>
      expect(loginFieldsValidation(item).errors.password).to.equal(
        "Password field is required"
      )
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
      expect(loginFieldsValidation(item).errors.email).to.equal(
        "Email field is required"
      )
    );
  });

  it("should reject if 'password' property of input object is not a string", () => {
    let incorrectInput = [
      { password: 123 },
      { password: true },
      { password: [] },
      { password: [1, 2] },
      { password: {} },
      { password: { test: "test" } }
    ];

    incorrectInput.forEach(item =>
      expect(loginFieldsValidation(item).errors.password).to.equal(
        "Password field is required"
      )
    );
  });

  it("should reject if input object's email property does not have valid email address", () => {
    let incorrectInput = [{ email: "apple" }, { email: "apple@banana" }];

    incorrectInput.forEach(item =>
      expect(loginFieldsValidation(item).errors.email).to.equal(
        "Email is invalid"
      )
    );
  });

  it("should validate and return successful expected output if expected input given", () => {
    expect(loginFieldsValidation(expectedInput)).to.deep.equal(expectedOutput);
  });
});
