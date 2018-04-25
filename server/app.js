const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./configuration/')


mongoose.Promise = global.Promise;


mongoose.connect(config.mongo.url, {
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 5000,
});

const app = express();

// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());

// Routes
app.use('/api/v1/users', require('./routes/users'));

app.use(express.static(path.join(__dirname, './../client/build/')));
app.use('/index', function (req, res) {
  res.sendFile(path.join(__dirname, './../client/build/index.html'));
});

module.exports = app;
