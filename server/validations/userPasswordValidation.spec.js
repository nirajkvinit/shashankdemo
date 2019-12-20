// TODO: Write all test cases
const { expect } = require("chai");
const userPasswordValidation = require("./userPasswordValidation");

describe("userPasswordValidation", () => {
  let expectedInput = {
    email: "correct@email.address",
    existingPassword: "s0m3S@mp13passkey",
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
      expect(userPasswordValidation(item)).to.deep.equal(invalidInputError)
    );
  });

  it("should reject if input object does not have 'existingPassword' property ", () => {
    let incorrectInput = [
      { number: 123 },
      { boolProp: true },
      { emptyArr: [] },
      { fruit: "apple" }
    ];

    incorrectInput.forEach(item =>
      expect(userPasswordValidation(item).errors.existingPassword).to.equal(
        "Existing Password field is required"
      )
    );
  });

  it("should reject if 'existingPassword' property of input object is not a string", () => {
    let incorrectInput = [
      { existingPassword: 123 },
      { existingPassword: true },
      { existingPassword: [] },
      { existingPassword: [1, 2] },
      { existingPassword: {} },
      { existingPassword: { test: "test" } }
    ];

    incorrectInput.forEach(item =>
      expect(userPasswordValidation(item).errors.existingPassword).to.equal(
        "Existing Password field is required"
      )
    );
  });

  it("should validate and return successful expected output if expected input given", () => {
    expect(userPasswordValidation(expectedInput)).to.deep.equal(expectedOutput);
  });
});
