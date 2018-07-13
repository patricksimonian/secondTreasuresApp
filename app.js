require('dotenv').config();
const path = require('path');
const Sequelize = require('sequelize');
const express = require('express');
const app = express();
const config = require('./config/config.js')();
const port = config.PORT || 3000;
const bodyParser = require('body-parser');
// routers
// middlewares
// parse json data
app.use(bodyParser.json())
// routes
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
app.listen(port, function() {
	console.log('App running at http://localhost:' + port);
});
