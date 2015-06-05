'use strict';
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var https = require('https');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/rsvps', function (req, res) {
  https.get("https://api.meetup.com/2/rsvps?event_id=" + req.query.event_id + "&key=" + req.query.key + "&rsvp=yes&sign=true", function (response) {
    var chunkedResult = "";
    response.on('data', function (chunk) {
      chunkedResult += chunk;
    });

    response.on('end', function () {
      var result = JSON.parse(chunkedResult);
      if (result.results) {
        res.send(result.results);
      } else {
        return res.send(400, result);
      }
    });
  }).on('error', function (e) {
    return res.send(400, {
      message: e.stack
    });
  });
});

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
