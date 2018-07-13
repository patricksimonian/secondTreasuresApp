require('dotenv').config();
const path = require('path');
const Sequelize = require('sequelize');
const express = require('express');
const app = express();
const db = require('./db/db.js');
const config = require('./config/config.js')();
const port = config.PORT || 3000;
const bodyParser = require('body-parser');

// routers
const bookRoutes = require('./routes/books.js');

app.use('/books', bookRoutes);
// middlewares
// parse json data
app.use(bodyParser.json())
// routes

db.sequelize.sync().then(() => {
  app.listen(config.port, () => {
    console.log('Express listening on port:', config.port);
  });
});
