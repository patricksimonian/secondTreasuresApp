const express = require('express');
const router = express.Router();



module.exports = (db, cloudinary) => {
  router.get('/', (req, res) => {
    //get all books
    res.sendStatus(200);
  });

  router.post('/', (req, res) => {
    //adds a particular book
    cloudinary.uploader.upload("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==", (result) => {
      console.log(result)
      res.sendStatus(200);
    });
  });

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
