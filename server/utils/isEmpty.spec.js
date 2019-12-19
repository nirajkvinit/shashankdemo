// unit test cases for isEmpty module
const { expect } = require("chai");
const { isEmpty } = require("./index");

describe("isEmpty function", () => {
  describe("should return true (for falsy values)", () => {
    it("'undefined' as given parameter", () => {
      expect(isEmpty(undefined)).to.be.true;
    });

    it("`null` as given parameter", () => {
      expect(isEmpty(null)).to.be.true;
    });

    it("empty object as given parameter", () => {
      expect(isEmpty({})).to.be.true;
    });

    it("empty string as given parameter", () => {
      expect(isEmpty("")).to.be.true;
    });

    it("empty array as given parameter", () => {
      expect(isEmpty([])).to.be.true;
    });
  });

  describe("should return false (for Truthy values)", () => {
    it("object which is not empty", () => {
      expect(isEmpty({ a: "test" })).to.be.false;
    });

    it("string which is not empty", () => {
      expect(isEmpty("hello world")).to.be.false;
    });

    it("array which is not empty", () => {
      expect(isEmpty([1, 2, 3])).to.be.false;
    });
  });
});
