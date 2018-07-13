const express = require('express');
const router = express.Router();
Promise = require('bluebird');
const bookHandlers = require('../routeHandlers/bookHandlers.js');


module.exports = (db, cloudinary) => {
  const handlers = bookHandlers(db, cloudinary);
  router.get('/', (req, res) => {
    //get all books
    res.sendStatus(200);
  });

  //adds a particular book
  router.post('/', handlers.create);

  router.get('/:isbn', (req, res) => {
    //gets a particular book
    res.sendStatus(200);
  });

  router.put('/:isbn', (req, res) => {
    //update book
    res.sendStatus(200);
  });

  router.delete('/:isbn', (req, res) => {
    //delete a book
    res.sendStatus(200);
  });
  return router;
}
