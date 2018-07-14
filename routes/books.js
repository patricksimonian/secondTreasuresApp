const express = require('express');
const router = express.Router();
const bookHandlers = require('../routeHandlers/bookHandlers.js');
const jwtAuthCheck = require('../helpers/isAuthenticated.js');

module.exports = (db, cloudinary, jwtSecret) => {
  const handlers = bookHandlers(db, cloudinary);
  //get all books
  router.get('/', handlers.allBook);
  router.get('/:isbn', handlers.findBook);
  //authenticated actions
  router.use((req, res, next) => {
    //do we have the auth header?
    const token = req.get('AUTHORIZATION');
    if(!token) {
      res.status(401).send('AUTHORIZATION header not included');
    } else {
      //check if token is valid
      jwtAuthCheck(token)
      .then(() => next()) //valid token, we aren't binding any data to req as its not needed for app
      .catch(() => res.status(401).send('Token invalid')); //invalid token
    }
  });
  // AUTHENTICATED ROUTES BELOW
  //adds a particular book
  router.post('/', handlers.createBook);
  //updates a book
  router.put('/:isbn', handlers.updateBook);
  //deletes a book
  router.delete('/:isbn', handlers.deleteBook);

  return router;
}
