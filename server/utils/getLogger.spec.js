// unit test cases for getLogger module
const { expect } = require("chai");
const { getLogger } = require("./index");

describe("getLogger module", () => {
  it("Should return a function for logging", () => {
    expect(getLogger).to.be.a("function");
  });
});
