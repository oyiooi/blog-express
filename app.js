var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

const mongoose = require('mongoose')
const mongoDB1 = 'mongodb://127.0.0.1:27017/blog';
mongoose.connect(mongoDB1,{ useNewUrlParser: true,useUnifiedTopology: true });
//mongoose.connect(mongoDB,{useNewUrlParser:true, useUnifiedTopology: true,user:'oyiooi',pass: 'wkh123456',auth: false});
mongoose.Promise    = global.Promise;

const db            = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB 连接错误：'));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'static')));


var indexRouter = require('./routes/index');
var articleRouter = require('./routes/article');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});
app.use('/', indexRouter);
app.use('/article', articleRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
