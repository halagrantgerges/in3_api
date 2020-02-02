
const express = require('express');
const path = require('path');

// eslint-disable-next-line
const bodyParser = require('body-parser');

// eslint-disable-next-line
const cors = require('cors');
// eslint-disable-next-line

const sqlinjection = require('sql-injection');
const app = express();
const Tasks = require('./routes');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('json spaces', 4);
app.use(require('express-status-monitor')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/API/V1/Tasks', Tasks);
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// eslint-disable-next-line
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
