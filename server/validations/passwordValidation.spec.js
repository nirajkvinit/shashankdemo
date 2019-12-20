// TODO: Write all test cases
const { expect } = require("chai");
const passwordValidation = require("./passwordValidation");

describe("passwordValidation", () => {
  let expectedInput = {
    password: "SomeRand0mP@ssword",
    password2: "SomeRand0mP@ssword"
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
      expect(passwordValidation(item)).to.deep.equal(invalidInputError)
    );
  });

  it("should reject if input object does not have 'password' property ", () => {
    let incorrectInput = [
      { number: 123 },
      { boolProp: true },
      { emptyArr: [] },
      { fruit: "apple" }
    ];

    incorrectInput.forEach(item =>
      expect(passwordValidation(item).errors.password).to.equal(
        "Password field is required"
      )
    );
  });

  it("should reject if input object does not have 'password2' property ", () => {
    let incorrectInput = [
      { number: 123 },
      { boolProp: true },
      { emptyArr: [] },
      { fruit: "apple" }
    ];

    incorrectInput.forEach(item =>
      expect(passwordValidation(item).errors.password).to.equal(
        "Password field is required"
      )
    );
  });

  it("should reject if 'password' property of input object is not a string", () => {
    let incorrectInput = [
      { email: 123 },
      { email: true },
      { email: [] },
      { email: [1, 2] },
      { email: {} },
      { email: { test: "test" } }
    ];

    incorrectInput.forEach(item =>
      expect(passwordValidation(item).errors.password).to.equal(
        "Password field is required"
      )
    );
  });

  it("should reject if length of 'password' property is not between 6 - 30", () => {
    let incorrectInput = [
      { password: "123" },
      { password: "abcdefghijklmnopqrstuvwxyz123456789ABCDEF" }
    ];

    incorrectInput.forEach(item =>
      expect(passwordValidation(item).errors.password).to.equal(
        "Password must be between 6 and 30 characters"
      )
    );
  });

  // The password must contain at least one lowercase letter.
  it("should reject if password does not contain atlease one lowercase letter", () => {
    let incorrectInput = ["1234567890", "!@#$#%$^%&^*&", "ABCDEFGH"];

    incorrectInput.forEach(item =>
      expect(passwordValidation({ password: item }).errors.password).to.equal(
        "The password must contain at least one lowercase letter."
      )
    );
  });

  // The password must contain at least one uppercase letter.
  it("should reject if password does not contain atlease one uppercase letter", () => {
    let incorrectInput = ["a1234567890", "a!@#$#%$^%&^*&", "abcdefghijklmnop"];

    incorrectInput.forEach(item =>
      expect(passwordValidation({ password: item }).errors.password).to.equal(
        "The password must contain at least one uppercase letter."
      )
    );
  });

  // The password must contain at least one number.
  it("should reject if password does not contain atlease one number", () => {
    let incorrectInput = ["Aabcdefghijklmnop", "Aa!@#$#%$^%&^*&", "AaBCDEFGH"];

    incorrectInput.forEach(item =>
      expect(passwordValidation({ password: item }).errors.password).to.equal(
        "The password must contain at least one number."
      )
    );
  });
  // The password must contain at least one special character.
  it("should reject if password does not contain atlease one special character", () => {
    let incorrectInput = ["aA1234567890", "aA1bcdefghijklmnop", "aA1BCDEFGH"];

    incorrectInput.forEach(item =>
      expect(passwordValidation({ password: item }).errors.password).to.equal(
        "The password must contain at least one special character."
      )
    );
  });

  it("should reject if passwords do not match", () => {
    expect(
      passwordValidation({ password: "1aA23456@", password2: "sfkljghfkgh" })
        .errors.password2
    ).to.equal("Passwords must match");
  });

  let correctPasswords = [
    "1aA234567890@",
    "!@aA1#$#%$^%&^*&",
    "abcdA1efghijk@lmnop",
    "ABCa1DEFGH@"
  ];

  // Passwords must match

  correctPasswords.forEach(item => {
    return it(`'${item}' should be accepted as valid password`, () => {
      expect(
        passwordValidation({ password: item, password2: item })
      ).to.deep.equal(expectedOutput);
    });
  });

  it("should validate and return successful expected output if expected input given", () => {
    expect(passwordValidation(expectedInput)).to.deep.equal(expectedOutput);
  });
});
