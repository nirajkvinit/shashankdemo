const mongoose = require("mongoose");
const { getLogger } = require("../server/utils");
const logger = getLogger("main-app"); // get logger

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", error => {
  logger.error(error);
});

db.once("open", () => {
  logger.info("Database connection is open!");
});

module.exports = db;
