const { expect } = require("chai");
const index = require("./index");

describe("validations module", () => {
  it("should export a function named 'emailVerificationValidation' ", () => {
    expect(index.emailVerificationValidation).to.be.a("Function");
  });

  it("should export a function named 'forgotPasswordValidation' ", () => {
    expect(index.forgotPasswordValidation).to.be.a("Function");
  });

  it("should export a function named 'loginFieldsValidation' ", () => {
    expect(index.loginFieldsValidation).to.be.a("Function");
  });

  it("should export a function named 'passwordValidation' ", () => {
    expect(index.passwordValidation).to.be.an("Function");
  });

  it("should export a function named 'updatePasswordValidation' ", () => {
    expect(index.updatePasswordValidation).to.be.a("Function");
  });

  it("should export a function named 'userPasswordValidation' ", () => {
    expect(index.userPasswordValidation).to.be.a("Function");
  });

  it("should export a function named 'signupFieldsValidation' ", () => {
    expect(index.signupFieldsValidation).to.be.a("Function");
  });
});
