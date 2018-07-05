var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

var index = require('./routes/index');

var app = express();

require('./config/passport')(passport);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret: 'podasednkasdrwefflse',
	resave: true,
	saveUninitialized: true
 } )); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use('/', index);

module.exports = app;
