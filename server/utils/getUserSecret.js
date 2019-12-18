const isEmpty = require("./isEmpty");

const getUserSecret = user => {
  let userSecret = process.env.SECRET_OR_KEY;
  if (!isEmpty(user.usersecret)) {
    userSecret += user.usersecret;
  }
  return userSecret;
};

module.exports = getUserSecret;
