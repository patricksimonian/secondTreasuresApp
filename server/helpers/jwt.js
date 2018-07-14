const jwt = require('jsonwebtoken');
Promise = require('bluebird');

const buildPayload = function(data, expiry) {
  return {
    payload: data,
    exp: expiry
  }
}
//note that this is a temporary work around wrapper for promisfying jwt methods
//as the next version of jwt will allow promises and bluebird's promisfy will not work at thgis time
const signAsPromise = function(data, expiry, jwtSecret) {
  return new Promise((resolve, reject) => {
    jwt.sign(buildPayload(data, expiry), jwtSecret, (err, token) => {
      if(err) {
        //failed to create token
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

const verifyAsPromise = function(token, jwtSecret) {
  return new Promise((resolve, reject) => {
    //authenticate token and return true if valid
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if(err) {
          //either token is invalid or expired
          reject(err);
        } else {
          resolve(decoded);
        }
    });
  });
}

module.exports = function(jwtSecret) {
  return {
    sign: (data, expiry) => signAsPromise(data, expiry, jwtSecret),
    verify: (token) => verifyAsPromise(token, jwtSecret)
  }
}
