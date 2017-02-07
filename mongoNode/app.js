var express = require('express'); //basic
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); //handles input values before getting to express

var index = require('./routes/index');
var users = require('./routes/users');
var survey = require('./routes/survey');

var mongoose = require('mongoose');
var fs = require('fs');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index); //Directs to welcome page
// app.use('/users', users);


//BLOG TUTORIAL

app.get('/', function(req, res){
  res.send('Hello World!')
});

app.use('/survey', survey);

app.post('/quotes', function(req, res){
  console.log(req.body)
});
/*YOUTUBE TUTORIAL
// mongoose.connect('mongodb://55.55.55.5/mongo');
// mongoose.model('users', {name: String});

// fs.readdirSync(__dirname + '/models').forEach(function(filename){
// 	if(~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
// });

// app.get('/users', function(req, res){
// 	mongoose.model('users').find(function(err, users){
// 		res.send(users)
// 	});
// });

// app.get('/posts', function(req, res){
// 	mongoose.model('posts').find({user: req.params.userId}, function(err, posts){
// 		mongoose.model.populate(posts, {path: 'user'}, function(err, posts){
// 			res.send(posts)
// 		});
// 	});
// });
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
