var express = require('express');
var mongoose = require('mongoose');
var ServiceRouter = require('./routes/Service');
var FeedbackRouter = require('./routes/Feedback');
var PackageRouter = require('./routes/Packages');
var BookServiceRouter = require('./routes/BookServices');

var app = express();
const connection = mongoose.connect('mongodb://localhost:27017/Assignment1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var app = express();
connection.then(
  (db) => {
    console.log('Connected correctly to server');
  },
  (err) => {
    console.log(err);
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/package', PackageRouter);
app.use('/feedback', FeedbackRouter);
app.use('/service', ServiceRouter);
app.use('/bookservice', BookServiceRouter);

module.exports = app;
