var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var coffees=require('./routes/coffees');
var favourites=require('./routes/favourites');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/users', users);
app.get('/coffees',coffees.getAll);
app.get('/favourites',favourites.getAll);
app.get('/favourites/:email',favourites.findUserFavourites);
app.get('/favourites/:email/:coffee_id',favourites.findCoffeeInUserFavourites);
app.get('/my_coffees/:email',coffees.findUserCoffee);
app.get('/coffees/:id',coffees.getSingleCoffee);
app.post('/coffees',coffees.addCoffee);
app.post('/favourites',favourites.addFavourite);
app.put('/coffees/:id/stars',coffees.incrementStars);
app.put('/coffees/:id',coffees.updateCoffee);
app.delete('/coffees/:id',coffees.deleteCoffee);
app.delete('/favourites/:id',favourites.deleteFavourite);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
