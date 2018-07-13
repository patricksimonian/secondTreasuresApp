const express = require('express');
const router = express.Router();
const bookHandlers = require('../routeHandlers/bookHandlers.js');


module.exports = (db, cloudinary) => {
  const handlers = bookHandlers(db, cloudinary);
  //get all books
  router.get('/', handlers.allBook);
  //adds a particular book
  router.post('/', handlers.createBook);

  router.get('/:isbn', handlers.findBook);

  router.put('/:isbn', handlers.updateBook);

  router.delete('/:isbn', handlers.deleteBook);
  return router;
}
