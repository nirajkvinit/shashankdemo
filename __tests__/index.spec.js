const chai = require("chai");
const expect = chai.expect;
const path = require("path");
const mongoose = require("mongoose");

const app = require("../index");

describe(`Index.js tests`, () => {
  context("Application environment variables:", () => {
    it("Application's environment variable should be 'test'", () => {
      expect(process.env.NODE_ENV).to.be.a("string");
      expect(process.env.NODE_ENV).to.equal("test");
      expect(process.env.NODE_ENV).not.to.equal("production");
    });

    it("PORT should be defined", () => {
      expect(process.env.PORT).not.equal(undefined);
      expect(process.env.PORT).to.be.a("string");
    });

    it("PORT should be defined as '8080'", () => {
      expect(process.env.PORT).to.equal("8080");
    });

    it("DB_URI should be defined", () => {
      expect(process.env.DB_URI).not.equal(undefined);
      expect(process.env.DB_URI).to.be.a("string");
    });
  });

  context("GLOBAL Variables for the app:", () => {
    let appRootDir = path.join(__dirname, "./");

    it("APP_DIR variable should be defined", () => {
      expect(global.APP_DIR).not.equal(undefined);
      expect(global.APP_DIR).to.be.a("string");
    });

    it("APP_DIR value should be application's root directory", () => {
      expect(global.APP_DIR).to.equal(appRootDir);
    });
  });

  context("Express app is an object:", () => {
    it("containing 'settings' object which has 'env' key with value 'test'", () => {
      expect(app.settings.env).to.be.a("string");
      expect(app.settings.env).equal("test");
    });
  });
});

describe("Database tests", () => {
  let dbConnected = false;
  let dbConnection = null;

  before(function(done) {
    this.timeout(15000);

    mongoose
      .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      })
      .then(data => {
        dbConnected = true;
        dbConnection = data;

        done();
      })
      .catch(err => {
        done();
      });
  });

  after(done => {
    if (dbConnected) {
      try {
        mongoose.connection.close(done);
      } catch (error) {
        console.log("error closing connection", error);
      }
    }
  });

  it("DB connection variable should not be 'null'", () => {
    expect(dbConnection).not.equal(null);
  });

  it("Application client should connect with Database", () => {
    expect(dbConnected).equal(true);
  });
});

// test body parser with input data
