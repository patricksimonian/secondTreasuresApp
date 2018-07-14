const express = require('express');
const router = express.Router();
const authenticationHandlers = require('../routeHandlers/authenticationHandlers.js');


module.exports = (db, jwtSecret) => {
  const handlers = authenticationHandlers(db, jwtSecret);

  router.post('/login', handlers.login);

  return router;
}
