// This file is to test whether .env file is available
// and proper environment variables are configured or not

const { expect } = require("chai");
const app = require("./app");

describe(".env and Environment Variables", () => {
  let originalNodeENV = process.env.NODE_ENV;

  describe("Production environment variable", () => {
    before(() => {
      process.env.NODE_ENV = "production";
    });

    it("NODE_ENV is defined and has value as 'production", () => {
      expect(process.env.NODE_ENV).to.be.a("string");
      expect(process.env.NODE_ENV).to.equal("production");
      expect(process.env.NODE_ENV).to.not.equal("test");
    });

    after(() => {
      process.env.NODE_ENV = originalNodeENV;
    });
  });

  describe("Testing environment variable", () => {
    it("NODE_ENV is defined and has value as 'test", () => {
      expect(process.env.NODE_ENV).to.be.a("string");
      expect(process.env.NODE_ENV).to.equal("test");
      expect(process.env.NODE_ENV).to.not.equal("production");
    });
  });

  it("PORT is defined and has some value", () => {
    expect(process.env.PORT).to.not.equal(undefined);
    expect(process.env.PORT).to.be.a("string");
  });

  it("DB_URI is defined and has some value", () => {
    expect(process.env.DB_URI).to.not.equal(undefined);
    expect(process.env.DB_URI).to.be.a("string");
  });

  it("SECRET_OR_KEY is defined and has some value", () => {
    expect(process.env.SECRET_OR_KEY).to.not.equal(undefined);
    expect(process.env.SECRET_OR_KEY).to.be.a("string");
  });

  it("TOKEN_EXPIRY_TIME is defined and has some value", () => {
    expect(process.env.TOKEN_EXPIRY_TIME).to.not.equal(undefined);
    expect(process.env.TOKEN_EXPIRY_TIME).to.be.a("string");
  });

  it("DEFAULT_EMAIL_SENDER is defined and has some value", () => {
    expect(process.env.DEFAULT_EMAIL_SENDER).to.not.equal(undefined);
    expect(process.env.DEFAULT_EMAIL_SENDER).to.be.a("string");
  });

  it("SENDGRID_API_KEY is defined and has some value", () => {
    expect(process.env.SENDGRID_API_KEY).to.not.equal(undefined);
    expect(process.env.SENDGRID_API_KEY).to.be.a("string");
  });

  it("UPLOAD_DIR is defined and has some value", () => {
    expect(process.env.UPLOAD_DIR).to.not.equal(undefined);
    expect(process.env.UPLOAD_DIR).to.be.a("string");
  });

  it("CACHE_TTL is defined and has some value", () => {
    expect(process.env.CACHE_TTL).to.not.equal(undefined);
    expect(process.env.CACHE_TTL).to.be.a("string");
  });
});
