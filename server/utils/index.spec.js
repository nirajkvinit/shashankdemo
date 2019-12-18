const { expect } = require("chai");
const index = require("./index");

describe("utils module", () => {
  it("should export a function named 'isEmpty' ", () => {
    expect(index.isEmpty).to.be.a("Function");
  });
  it("should export a function named 'getLogger' ", () => {
    expect(index.getLogger).to.be.a("Function");
  });
  it("should export a function named 'Cache' ", () => {
    expect(index.Cache).to.be.a("Function");
  });
  it("should export a function named 'messageFormat' ", () => {
    expect(index.messageFormat).to.be.a("Function");
  });
  it("should export a function named 'docExt' ", () => {
    expect(index.docExt).to.be.an("Array");
  });
  it("should export a function named 'imageExt' ", () => {
    expect(index.imageExt).to.be.an("Array");
  });
  it("should export a function named 'getUserSecret' ", () => {
    expect(index.getUserSecret).to.be.a("Function");
  });
  it("should export a function named 'jwtSigner' ", () => {
    expect(index.jwtSigner).to.be.a("Function");
  });
});
