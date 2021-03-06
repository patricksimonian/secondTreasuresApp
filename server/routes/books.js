const express = require('express');
const router = express.Router();
const bookHandlers = require('../routeHandlers/bookHandlers.js');

module.exports = (db, cloudinary, jwtSecret) => {
  const jwt = require('../helpers/jwt.js')(jwtSecret);
  const handlers = bookHandlers(db, cloudinary);
  //get all books
  router.get('/', handlers.allBook);
  //find one book
  router.get('/:isbn', handlers.findBook);
  //authenticated actions below...

  //this middleware will filter out any requests with an invalid jwt
  router.use((req, res, next) => {
    //do we have the auth header?
    const token = req.get('AUTHORIZATION');
    if(!token) {
      res.status(401).json({success: false, message: ['Not able to perform this action']});
    } else {
      //check if token is valid
      jwt.verify(token)
      .then(() => next()) //valid token, we aren't binding any data to req as its not needed for app
      .catch(() => res.status(401).json({success: false, message: ['Token invalid or expired']})); //invalid token
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
