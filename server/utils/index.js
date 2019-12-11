const isEmpty = require("./isEmpty");
const log4js = require("log4js");
const Cache = require("./cache");

const getLogger = (moduleName = "Logger") => {
  const logger = log4js.getLogger(moduleName);
  logger.level = "DEBUG";
  return logger;
};

const messageFormat = () => {
  let mformat = {
    isError: true,
    message: "Error occured!",
    data: null
  };

  return { ...mformat };
};

module.exports = {
  isEmpty,
  getLogger,
  Cache,
  messageFormat
};
