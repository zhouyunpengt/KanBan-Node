var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');

var app = express();

//allow custom header and CORS
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }
  else {
    next();
  }
});

app.use(cookieParser());
(function () {
  var keys = [];
  for (var i = 0; i < 100000; i++) {
    keys[i] = 'a_' + Math.random();
  }
  app.use(session({
    name: 'sess_id',
    secret: keys,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: true
  }));
})();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
//login
app.use('/session', require('./routes/login/session.js')());
app.use('/login', require('./routes/login/login.js')());
//load
app.use('/job', require('./routes/load/job.js')());
app.use('/load', require('./routes/load/load.js')());
app.use('/load-journal', require('./routes/load/journal.js')());
//update
app.use('/head', require('./routes/update/head.js')());
app.use('/move', require('./routes/update/move.js')());
app.use('/move-class', require('./routes/update/class.js')());
//insert
app.use('/ins-img', require('./routes/insert/img.js')());
app.use('/ins-project', require('./routes/insert/project.js')());
app.use('/ins-class', require('./routes/insert/class.js')());
app.use('/ins-content', require('./routes/insert/content.js')());
app.use('/ins-comment', require('./routes/insert/comment.js')());
app.use('/ins-journal', require('./routes/insert/journal.js')());
//delete
app.use('/del-session', require('./routes/delete/session.js')());
app.use('/del-project', require('./routes/delete/project.js')());
app.use('/del-class', require('./routes/delete/class.js')());
app.use('/del-content', require('./routes/delete/content.js')());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
