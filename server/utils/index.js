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

let docExt =
  ".doc,.docx,.odt,.pdf,.xls,.xlsx,.ods,.ppt,.pptx,.txt,.odp,.pps,.rtf,.tex";
let musicExt = ".mid,.midi,.mp3,.mpa,.ogg,.wav,.wma";
let imageExt = "ai,.bmp,.gif,.ico,.jpeg,.jpg,.png,.ps,.psd,.svg,.tif,.tiff";

module.exports = {
  isEmpty,
  getLogger,
  Cache,
  messageFormat,
  docExt,
  musicExt,
  imageExt
};
