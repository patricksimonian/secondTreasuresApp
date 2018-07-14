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
const authRoutes = require('./routes/auth.js');
// middlewares
// parse json data
app.use(bodyParser.json())
// routes
app.use('/api/books', bookRoutes(db, cloudinary, config.jwt.secret));
app.use('/api', authRoutes(db, config.jwt.secret));

db.sequelize.sync().then(() => {
  app.listen(config.port, () => {
    console.log('Express listening on port:', config.port);
  });
});
