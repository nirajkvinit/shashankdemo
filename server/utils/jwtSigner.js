const jwt = require("jsonwebtoken");
const isEmpty = require("./isEmpty");

/**
 *
 * @param {Object} payload - Usually user information which can be made public
 * @param {string} userSecret - secret to sign token with
 * @param {string} expiresIn - token expiry time e.g. 10m meaning token will expire in 10 minutes
 * @return {Promise<string>} signed json web token
 */
const jwtSigner = function(payload, userSecret, expiresIn) {
  return new Promise(function(resolve, reject) {
    jwt.sign(payload, userSecret, { expiresIn }, (err, token) => {
      if (!isEmpty(err)) {
        reject(new Error("Invalid input"));
      } else if (isEmpty(token)) {
        reject(new Error("Invalid input"));
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = jwtSigner;
