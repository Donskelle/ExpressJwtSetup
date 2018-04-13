const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');


mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/demoapp');
} else {
  mongoose.connect('mongodb://demouser:RSD0yNk0kfujfsrs@demotrans-shard-00-00-qdhwv.mongodb.net:27017,demotrans-shard-00-01-qdhwv.mongodb.net:27017,demotrans-shard-00-02-qdhwv.mongodb.net:27017/test?ssl=true&replicaSet=demotrans-shard-0&authSource=admin');
}

const app = express();

// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());

// Routes
app.use('/api/users', require('./routes/users'));
//app.use('/index.html', require('../../client/build/index.html'));
app.use(express.static(path.join(__dirname, './../client/build/')));
app.use('/index', function (req, res) {
  res.sendFile(path.join(__dirname, './../client/build/index.html'));
});

module.exports = app;
