var LocalStrategy = require('passport-local').Strategy;
var db = require('./connection');
// expose this function to our app using module.exports
module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
		done(null, user._key);
    });

    // used to deserialize the user
    passport.deserializeUser(function(_key, done) {
        var Query = `For x IN user FILTER x._key == ${_key} RETURN x`;

        db.query(Query).then(
            cursor => cursor.all()
        ).then(
            (keys) => {
                if(keys.length != 0) {
                    done(err, keys[0]);
                }
          },
            err => done(err)
        ).catch(err=>console.log('Err in deserializeUser', err));
    });
	

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        var Query = `For x IN user FILTER x.email == '${email}' RETURN x`;

        db.query(Query).then(
            cursor => cursor.all()
        ).then(
            (keys) => {
                if(keys.length > 0) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                }else{

                    var newUser = new Object();
                    
                    newUser.email    = email;
                    newUser.password = password; 

                    var collection = db.collection('user');
                    collection.save({
                        email: newUser.email,
                        password: newUser.password,
                        ldap: false
                    }, function(err, user) {
                        newUser._key = user._key;
                        return done(null, newUser);
                    })
                }
          },
            err => done(err)
        ).catch(err=>console.log('Err in register', err));
    }));


    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        var Query = `For x IN user FILTER x.email == '${email}' RETURN x`;

        db.query(Query).then(
            cursor => cursor.all()
        ).then(
            (keys) => {
                if(keys.length == 0) {
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }
                if(keys[0].password != password) {
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                }
                return done(null, keys[0]);		
          },
            err => done(err)
        ).catch(err=>console.log('Err in login', err));

    }));

};