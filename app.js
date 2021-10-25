var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var infoRouter = require('./routes/info');
var statisticsRouter = require('./routes/statistics');

//const bodyParser = require('body-parser');
var busboy = require('connect-busboy');
const formidable = require('express-formidable');
var app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocumentFileName = './swagger.json';
const swaggerDocument = require(swaggerDocumentFileName);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(busboy());
app.use(formidable());

app.use(function (req, res, next) {
  var allowedDomains = [
    'http://localhost:3000',
    'http://localhost:5000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5000',
    'http://192.168.2.185:3000',
    'http://192.168.2.185:5000',
    'http://192.168.2.183:3000',
    'http://192.168.2.183:5000',
    'http://192.168.2.134:5000',
    'http://192.168.2.134:3000',
    'https://coicoin.cc',
  ];
  var origin = req.headers.origin;
  if (allowedDomains.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type, Accept'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', indexRouter);
app.use('/info', infoRouter);
app.use('/statistics', statisticsRouter);

// catch 404 and forward to error handler
app.use(function (_, _, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, _) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
