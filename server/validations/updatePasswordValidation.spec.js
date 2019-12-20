// TODO: Write all test cases
const { expect } = require("chai");
const updatePasswordValidation = require("./updatePasswordValidation");

describe("updatePasswordValidation", () => {
  let expectedInput = {
    email: "correct@email.address",
    passkey: "s0m3S@mp13passkey",
    password: "@123Aabc",
    password2: "@123Aabc"
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
      expect(updatePasswordValidation(item)).to.deep.equal(invalidInputError)
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
      expect(updatePasswordValidation(item).errors.email).to.equal(
        "Email field is required"
      )
    );
  });

  it("should reject if input object does not have 'passkey' property ", () => {
    let incorrectInput = [
      { prop: 123 },
      { prop: true },
      { prop: [] },
      { fruit: "apple" }
    ];

    incorrectInput.forEach(item =>
      expect(updatePasswordValidation(item).errors.passkey).to.equal(
        "Password reset url is incorrect"
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
      expect(updatePasswordValidation(item).errors.email).to.equal(
        "Email field is required"
      )
    );
  });

  it("should reject if 'passkey' property of input object is not a string", () => {
    let incorrectInput = [
      { passkey: 123 },
      { passkey: true },
      { passkey: [] },
      { passkey: [1, 2] },
      { passkey: {} },
      { passkey: { test: "test" } }
    ];

    incorrectInput.forEach(item =>
      expect(updatePasswordValidation(item).errors.passkey).to.equal(
        "Password reset url is incorrect"
      )
    );
  });

  it("should reject if input object's email property does not have valid email address", () => {
    let incorrectInput = [{ email: "apple" }, { email: "apple@banana" }];

    incorrectInput.forEach(item =>
      expect(updatePasswordValidation(item).errors.email).to.equal(
        "Email is invalid"
      )
    );
  });

  it("should reject if length of passkey property of input object is less than 6 characters", () => {
    let incorrectInput = [{ passkey: "apple" }, { passkey: "12345" }];

    incorrectInput.forEach(item =>
      expect(updatePasswordValidation(item).errors.passkey).to.equal(
        "Password reset url is incorrect"
      )
    );
  });

  it("should validate and return successful expected output if expected input given", () => {
    expect(updatePasswordValidation(expectedInput)).to.deep.equal(
      expectedOutput
    );
  });
});
