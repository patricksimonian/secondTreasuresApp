require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
const chalk = require('chalk');
//get config by environment
const config = require('./config/config.js')();
const port = config.PORT || 3000;
//initiate server
const app = express();
console.log(config);
//get database instance
const db = require('./db/db.js')(config);
//set cloudinary config
cloudinary.config(config.cloudinary);
// routers
const bookRoutes = require('./routes/books.js');
const authRoutes = require('./routes/auth.js');
// middlewares
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../', '/client/build')));
// parse json data
app.use(bodyParser.json());
//ensure content type is always application/json
app.use('/api', (req, res, next) => {
  if(req.method !== 'GET' && !req.is('application/json')) {
    res.sendStatus(415);
  } else {
    next();
  }
});
// routes
app.use('/api/books', bookRoutes(db, cloudinary, config.jwt.secret));
app.use('/api', authRoutes(db, config.jwt.secret));

//main end point for react app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '../client/build/index.html'));
});

db.sequelize.sync().then(() => {
  app.listen(config.port, () => {
    console.log('Express listening on port:', config.port);
  });
}).catch(err => console.log(err));
