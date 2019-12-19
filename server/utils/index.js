const isEmpty = require("./isEmpty");
const messageFormat = require("./messageFormat");
const jwtSigner = require("./jwtSigner");
const getLogger = require("./getLogger");
const getUserSecret = require("./getUserSecret");

let docExt = ".doc,.docx,.odt,.pdf,.xls,.xlsx,.ods,.ppt,.pptx,.txt,.odp,.pps,.rtf,.tex".split(
  ","
);
let musicExt = ".mid,.midi,.mp3,.mpa,.ogg,.wav,.wma".split(",");
let imageExt = "ai,.bmp,.gif,.ico,.jpeg,.jpg,.png,.ps,.psd,.svg,.tif,.tiff".split(
  ","
);

module.exports = {
  isEmpty,
  getLogger,
  messageFormat,
  docExt,
  musicExt,
  imageExt,
  getUserSecret,
  jwtSigner
};
