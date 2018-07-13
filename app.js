require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
// routers
// middlewares
// parse json data
app.use(bodyParser.json())
// routes

app.listen(port, function() {
	console.log('App running at http://localhost:' + port);
});
