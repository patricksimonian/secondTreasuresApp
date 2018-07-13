const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  //get all books
  res.sendStatus(200);
});

router.post('/', (req, res) => {
  //adds a particular book
  res.sendStatus(200);
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

module.exports = router;
