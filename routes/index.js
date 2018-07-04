var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/secret', isLoggedIn, function(req, res, next) {
  res.render('secret', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect : '/secret', 
  failureRedirect : '/login', 
  failureFlash : true
}),
function(req, res) {
  res.redirect('/secret');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', passport.authenticate('local-signup', {
  successRedirect : '/secret', 
  failureRedirect : '/register',
  failureFlash : true 
}));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

module.exports = router;
