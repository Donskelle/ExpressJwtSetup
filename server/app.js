const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const basicAuth = require('express-basic-auth')

const config = require('./configuration/')


mongoose.Promise = global.Promise;


mongoose.connect(config.mongo.url, {
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 5000,
});

const app = express();




// Middlewares moved morgan into if for clear tests
if (process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}
else {
  app.use(basicAuth({
    users: { 'transportiert': 'NMj368w/hKAzb6%&' },
    challenge: true
  }));
}

app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, './../client/build/')));
// Routes
app.use('/api/v1/users', require('./routes/users'));
app.use('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './../client/build/index.html'));
});

// 


module.exports = app;
