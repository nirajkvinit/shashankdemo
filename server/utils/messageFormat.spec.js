// Unit test cases for messageFormat module
const { expect } = require("chai");
const { messageFormat } = require("./index");

/**
 * - returns an object
 * - object has isError property which is true by default
 * - object has message property which is string and has 'Error occured!'
 * - object has data property which is null by default
 */
describe("messageFormat module", () => {
  let resultObject = messageFormat();

  it("returns an object", () => {
    expect(resultObject).to.be.an("object");
    expect(resultObject).to.not.be.a("function");
    expect(resultObject).to.not.be.a("string");
  });

  it("object has isError property which is true by default", () => {
    expect(resultObject.hasOwnProperty("isError")).to.be.true;
    expect(resultObject.isError).to.be.true;
    expect(resultObject.isError).to.not.be.false;
  });

  it("object has message property which is string and has 'Error occured!'", () => {
    expect(resultObject.hasOwnProperty("message")).to.be.true;
    expect(resultObject.message).to.be.a("string");
    expect(resultObject.message).equal("Error occured!");
  });

  it("object has data property which is null by default", () => {
    expect(resultObject.hasOwnProperty("data")).to.be.true;
    expect(resultObject.data).to.be.null;
  });
});
