const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const app = require("./app");
const axios = require("axios");

// TODO: write test cases for app.js
describe("App module", () => {
  it("Get / api", async () => {
    let result = await chai.request(app).get("/");
    expect(result).to.have.status(200);
    expect(result.body).to.haveOwnProperty("servicename");
    expect(result.body.servicename).to.equal("Service is up and running");
  });
  it("TODO: Write test cases");
});
