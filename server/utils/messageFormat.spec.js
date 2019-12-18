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

  it("should return an object", () => {
    expect(resultObject).to.be.an("object");
    expect(resultObject).to.not.be.a("function");
    expect(resultObject).to.not.be.a("string");
  });

  it("returned object should have 'isError' property which should be true by default", () => {
    expect(resultObject.hasOwnProperty("isError")).to.be.true;
    expect(resultObject.isError).to.be.true;
    expect(resultObject.isError).to.not.be.false;
  });

  it("returned object should have 'message' property which should have 'Error occured!' string", () => {
    expect(resultObject.hasOwnProperty("message")).to.be.true;
    expect(resultObject.message).to.be.a("string");
    expect(resultObject.message).equal("Error occured!");
  });

  it("returned object should have 'data' property which should be null by default", () => {
    expect(resultObject.hasOwnProperty("data")).to.be.true;
    expect(resultObject.data).to.be.null;
  });
});
