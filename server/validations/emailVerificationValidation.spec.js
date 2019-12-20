const { expect } = require("chai");
const emailVerificationValidation = require("./emailVerificationValidation");

// expects an object with following properties (verificationkey)
// verificationkey is a string with minimum length 5
describe("emailVerificationValidation", () => {
  let expectedInput = {
    verificationkey: "someRandomString"
  };

  let expectedOutput = {
    errors: {},
    isValid: true
  };

  let errorOutput = {
    errors: { message: "Invalid input or verification key is invalid" },
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
      expect(emailVerificationValidation(item)).to.deep.equal(errorOutput)
    );
  });

  it("should reject if input object does not have 'verificationkey' property having string value", () => {
    let incorrectInput = [
      { verificationkey: 123 },
      { verificationkey: true },
      { verificationkey: [] },
      { fruit: "apple" }
    ];

    incorrectInput.forEach(item =>
      expect(emailVerificationValidation(item)).to.deep.equal(errorOutput)
    );
  });

  it("should reject if length of 'verificationkey' is less than 5", () => {
    expect(
      emailVerificationValidation({ verificationkey: "321" })
    ).to.deep.equal(errorOutput);
  });

  it("should validate and return successful expected output if expected input given", () => {
    expect(emailVerificationValidation(expectedInput)).to.deep.equal(
      expectedOutput
    );
  });
});
