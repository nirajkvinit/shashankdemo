const { expect } = require("chai");
const forgotPasswordValidation = require("./forgotPasswordValidation");

// expects an object with following properties (email)

describe("forgotPasswordValidation", () => {
  let expectedInput = {
    email: "correct@email.address"
  };

  let expectedOutput = {
    errors: {},
    isValid: true
  };

  let errorOutput = {
    errors: { email: "Invalid input!" },
    isValid: false
  };

  let errorOutput2 = {
    errors: { email: "Email field is required" },
    isValid: false
  };

  let errorOutput3 = {
    errors: { email: "Email is invalid" },
    isValid: false
  };

  it("TODO: Refactor test cases");

  it("should reject all input and return error if unexpected or no input provided", () => {
    expect(forgotPasswordValidation()).to.deep.equal(errorOutput);
    expect(JSON.stringify(forgotPasswordValidation())).to.equal(
      JSON.stringify(errorOutput)
    );
    expect(forgotPasswordValidation("random")).to.deep.equal(errorOutput);
    expect(forgotPasswordValidation(545454)).to.deep.equal(errorOutput);
    expect(forgotPasswordValidation("*%&#%$^dgfg4586")).to.deep.equal(
      errorOutput
    );
    expect(forgotPasswordValidation({ fruit: "apple" })).to.deep.equal(
      errorOutput2
    );
    expect(forgotPasswordValidation({ email: 123 })).to.deep.equal(
      errorOutput2
    );
    expect(forgotPasswordValidation({ email: true })).to.deep.equal(
      errorOutput2
    );
    expect(forgotPasswordValidation({ email: "@apple.com" })).to.deep.equal(
      errorOutput3
    );
  });

  it("should validate and return successful expected output if expected input given", () => {
    expect(forgotPasswordValidation(expectedInput)).to.deep.equal(
      expectedOutput
    );
  });
});
