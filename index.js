const path = require("path");
const http = require("http");
const events = require("events");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const socketIO = require("socket.io");
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

const usersRouter = require("./routes/v1api/users");

const { isEmpty, Cache, getLogger } = require("./server/utils");
const logger = getLogger("main-app"); // get logger

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    logger.debug("DB Connected");
  })
  .catch(err => logger.error(`Error connecting Database. Error: ${err}`));

// Initialize cache
const ttl = 60 * 10; // cache for 10 minutes
const cache = new Cache(ttl); // Create a new cache service instance
const evtEmitter = new events.EventEmitter();

// Express APP
const app = express();

// initialize middlewares
app
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

// Create normal http and socket server
const server = http.createServer(app);
const io = socketIO(server);

if (!process.env.NODE_ENV == "production") {
  io.origins("*:*");
}

io.on("connection", socket => {
  logger.debug("SocketIO User Connected");

  socket.on("disconnect", () => {
    logger.debug("SocketIO User disconnected");
  });
});

// API Identifier and activity checker whether it is up or not
app.get("/", (req, res) =>
  res.json({ servicename: "Service is up and running" })
);

//passport config
require("./server/config/passport")(passport);

// Auth and Users API
app.use("/api/v1/users", usersRouter);

server.listen(process.env.PORT, () =>
  logger.debug(`Server running on port ${process.env.PORT}`)
);

module.exports = server;
