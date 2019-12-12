const jwt = require("jsonwebtoken");
const log4js = require("log4js");
const isEmpty = require("./isEmpty");
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

const getUserSecret = user => {
  let userSecret = process.env.SECRET_OR_KEY;
  if (!isEmpty(user.usersecret)) {
    userSecret += user.usersecret;
  }
  return userSecret;
};

const jwtSigner = (payload, userSecret, expiresIn) =>
  new Promise(function(resolve, reject) {
    jwt.sign(payload, userSecret, { expiresIn }, (err, token) => {
      if (isEmpty(err)) {
        resolve(token);
      } else {
        reject(err);
      }
    });
  });

module.exports = {
  isEmpty,
  getLogger,
  Cache,
  messageFormat,
  docExt,
  musicExt,
  imageExt,
  getUserSecret,
  jwtSigner
};
