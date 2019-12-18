const log4js = require("log4js");

const getLogger = (moduleName = "Logger") => {
  const logger = log4js.getLogger(moduleName);
  logger.level = "DEBUG";
  return logger;
};

module.exports = getLogger;
