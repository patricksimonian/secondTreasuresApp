const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

module.exports = (token) => {
  return new Promise((resolve, reject) => {
    //authenticate token and return true if valid
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if(err) {
          //either token is invalid or expired
          reject(err);
        }
        resolve(decoded);
    });
  });
}
