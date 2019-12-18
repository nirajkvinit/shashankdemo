const jwt = require("jsonwebtoken");

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

module.exports = jwtSigner;
