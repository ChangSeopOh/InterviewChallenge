require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const indexRouter = require('./routes/index');

const seedPosts = require('./seeds');
seedPosts();  // Test data generation


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);  
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//DB connection mongodb://localhost:27017/helpful-human
mongoose.connect(process.env.DATABASEURL, {
  useNewUrlParser:true, 
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(()=>{
  console.log('Conntected to DB!');
}).catch(err =>{
  console.log('DB Error : ', err.message);
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