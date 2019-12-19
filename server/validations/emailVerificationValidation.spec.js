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
    errors: { message: "Verification key is invalid!" },
    isValid: false
  };

  let errorOutput2 = {
    errors: { message: "Invalid input!" },
    isValid: false
  };

  it("should reject all input and return error if unexpected or no input provided", () => {
    expect(emailVerificationValidation()).to.deep.equal(errorOutput2);

    expect(JSON.stringify(emailVerificationValidation())).to.equal(
      JSON.stringify(errorOutput2)
    );

    expect(emailVerificationValidation("random")).to.deep.equal(errorOutput2);

    expect(emailVerificationValidation(545454)).to.deep.equal(errorOutput2);

    expect(emailVerificationValidation("*%&#%$^dgfg4586")).to.deep.equal(
      errorOutput2
    );

    expect(emailVerificationValidation({ fruit: "apple" })).to.deep.equal(
      errorOutput
    );

    expect(emailVerificationValidation({ verificationkey: 123 })).to.deep.equal(
      errorOutput
    );

    expect(
      emailVerificationValidation({ verificationkey: true })
    ).to.deep.equal(errorOutput);

    // should not accept input having less than 5 characters
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
