require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
//get config by environment
const config = require('./config/config.js')();
const port = config.PORT || 3000;
//initiate server
const app = express();
//get database instance
const db = require('./db/db.js');
//set cloudinary config
cloudinary.config(config.cloudinary);
// routers
const bookRoutes = require('./routes/books.js');

app.use('/books', bookRoutes(db, cloudinary));
// middlewares
// parse json data
app.use(bodyParser.json())
// routes

db.sequelize.sync().then(() => {
  app.listen(config.port, () => {
    console.log('Express listening on port:', config.port);
  });
});
