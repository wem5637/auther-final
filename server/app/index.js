'use strict';

var app = require('express')();
var path = require('path');
var passport = require('passport');


//////////
var session = require('express-session');



app.use(session({
  // this mandatory configuration ensures that session IDs are not predictable
  secret: 'tongiscool', // or whatever you like
  // these options are recommended and reduce session concurrency issues
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 60000000}
}));

// place right after the session setup middleware
app.use(function (req, res, next) {
  //console.log('session', req.session);
  next();
});
//////

app.use(passport.initialize());
app.use(passport.session());


// don't forget to install passport-google-oauth
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(
  new GoogleStrategy({
    clientID: '820192177973-e3vpr9hgo5b24ljkultpaj8aaudmiu5p.apps.googleusercontent.com',
    clientSecret: '5xCefbQm8kZ4x0l3eweRXEof',
    callbackURL: 'http://localhost:8080/auth/google/callback'
  },
  // Google will send back the token and profile
  function (token, refreshToken, profile, done) {
    // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
    /*
    --- fill this part in ---

    */
    console.log('---------', 'in verification callback', profile, '---');
    done();
  })
);


// Google authentication and login 
app.get('/auth/google', passport.authenticate('google', { scope: 'email' }));

// handle the callback after Google has authenticated the user
app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/', // or wherever
    failureRedirect: '/' // or wherever
  })
);

// "Enhancing" middleware (does not send response, server-side effects only)
app.use(require('./logging.middleware'));

app.use(require('./body-parsing.middleware'));

app.use(require('./sessions'))



// "Responding" middleware (may send a response back to client)

app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'browser', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./statics.middleware'));

// "Error" middleware

app.use(require('../utils/HttpError')(404).middleware());

app.use(require('./error.middleware'));

module.exports = app;
