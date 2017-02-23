var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');

var app = express();

//common setup
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//log print setup
app.use(logger('dev'));

//router setup 
var routes = require('./routes/index');
var register = require('./routes/register');
var auth = require('./routes/auth');

app.use('/', routes);
app.use('/register', register);
app.use('/auth', auth);

//view engine setup 
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

//static resource setup
app.use(express.static('public'));


var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);

  console.log(err);
  res.render('error', {
    title: 'Wrong!',
    error: err
  });
});


module.exports = app;