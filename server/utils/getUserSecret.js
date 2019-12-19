const isEmpty = require("./isEmpty");

const getUserSecret = userSecret => {
  if (!isEmpty(userSecret)) {
    return `${userSecret}${process.env.SECRET_OR_KEY}`;
  }
  return process.env.SECRET_OR_KEY;
};

module.exports = getUserSecret;
