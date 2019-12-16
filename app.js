const path = require("path");
const events = require("events");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// load environment variables based on NODE_ENV value
if (process.env.NODE_ENV === "production") {
  // load .env file for production
  require("dotenv").config({ path: ".env" });
} else {
  // else load .env.development
  require("dotenv").config({ path: ".env.development" });
}

// APP_DIR Global variable
global.APP_DIR = path.join(__dirname, "./");

const usersRouter = require("./server/routes/v1api/users");

const { isEmpty, Cache, getLogger } = require("./server/utils");
const logger = getLogger("main-app"); // get logger

// Initialize cache
const cache = new Cache(process.env.CACHE_TTL); // Create a new cache service instance
// Initialize global event emitter
const evtEmitter = new events.EventEmitter();

// Express APP
const app = express();

// initialize middlewares
app
  .use(helmet())
  .use(compression())
  .use(cors())
  .use(bodyParser.json({ limit: "2mb" }))
  .use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: false,
      parameterLimit: 5000
    })
  )
  .use(passport.initialize()) // initialize passport
  .use((req, res, next) => {
    // cache middlware
    req.cache = cache;
    // event emitter middlware
    req.evtEmitter = evtEmitter;
    // pass socket conn
    req.io = io;
    next();
  });

// API Identifier and activity checker whether it is up or not
app.get("/", (req, res) =>
  res.json({ servicename: "Service is up and running" })
);

//passport config
require("./server/config/passport")(passport);

// Auth and Users API
app.use("/api/v1/users", usersRouter);

module.exports = server;
