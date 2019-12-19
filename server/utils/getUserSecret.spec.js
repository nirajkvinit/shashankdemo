// unit test cases for getUserSecret module
const { expect } = require("chai");
const { getUserSecret } = require("./index");

describe("getUserSecret module", () => {
  // before(() => {
  //   process.env.NODE_ENV = "test";
  //   const app = require("../../app"); // load this to load environment variables
  // });

  it("should return a string", () => {
    expect(getUserSecret()).to.be.a("string");
  });

  it("should return environment secret key if no input given", () => {
    expect(getUserSecret()).to.equal(process.env.SECRET_OR_KEY);
  });

  it("should return input and environment secret appended to it", () => {
    expect(getUserSecret("APPLE")).to.equal(
      "APPLE" + process.env.SECRET_OR_KEY
    );
    expect(getUserSecret(3)).to.equal("3" + process.env.SECRET_OR_KEY);
  });
});
