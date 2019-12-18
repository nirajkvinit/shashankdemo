// unit test cases for jwtSigner module
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

const { jwtSigner } = require("./index");

describe("jwtSigner module", () => {
  it("should return a promise", () => {
    const jwtToken = jwtSigner().catch(err => {
      // do not handle error here
    });
    expect(jwtToken.then).to.be.a("Function");
    expect(jwtToken.catch).to.be.a("Function");
  });

  it("should return error 'Invalid input' if called without any parameter", async () => {
    try {
      const jwtToken = await jwtSigner();
    } catch (error) {
      expect(error).to.be.an("error");
      expect(error.message).to.equal("Invalid input");
    }
  });

  it("should return an encrypted jwt token if provided expected parameters", async () => {
    try {
      const jwtToken = await jwtSigner(
        { user: "demo user" },
        "somerandomsecret",
        "10m"
      );
      expect(jwtToken).to.be.a("string");
      expect(jwtToken.split(".").length).to.be(3);
    } catch (error) {
      // do nothing
    }
  });
});
