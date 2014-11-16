'use strict';

module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    app.get('/signout', users.signout);
    app.get('/users/me', users.me);

    //Setting up the users api
    app.post('/users', users.create);

    //Setting the local strategy route
    //The request should have email and password
    app.post('/users/session', function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if (err) { return res.json(200, info); }
        if (!user) { return res.json(200, info); }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.json(200, JSON.stringify(user));
        });
      })(req, res, next);
    });

    // For Future use
    // //Setting the facebook oauth routes
    // app.get('/auth/facebook', passport.authenticate('facebook', {
    //     scope: ['email', 'user_about_me'],
    //     failureRedirect: '/signin'
    // }), users.signin);

    // app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    //     failureRedirect: '/signin'
    // }), users.authCallback);

    // //Setting the github oauth routes
    // app.get('/auth/github', passport.authenticate('github', {
    //     failureRedirect: '/signin'
    // }), users.signin);

    // app.get('/auth/github/callback', passport.authenticate('github', {
    //     failureRedirect: '/signin'
    // }), users.authCallback);

    // //Setting the twitter oauth routes
    // app.get('/auth/twitter', passport.authenticate('twitter', {
    //     failureRedirect: '/signin'
    // }), users.signin);

    // app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    //     failureRedirect: '/signin'
    // }), users.authCallback);

    // //Setting the google oauth routes
    // app.get('/auth/google', passport.authenticate('google', {
    //     failureRedirect: '/signin',
    //     scope: [
    //         'https://www.googleapis.com/auth/userinfo.profile',
    //         'https://www.googleapis.com/auth/userinfo.email'
    //     ]
    // }), users.signin);

    // app.get('/auth/google/callback', passport.authenticate('google', {
    //     failureRedirect: '/signin'
    // }), users.authCallback);

    //Finish with setting up the userId param
    app.param('userId', users.user);

    //Mood Routes
    var moods = require('../app/controllers/moods');
    app.get('/moods', moods.all);
    app.post('/moods', auth.requiresLogin, moods.create);
    app.get('/moods/:moodId', moods.show);
    app.put('/moods/:moodId', auth.requiresLogin, auth.mood.hasAuthorization, moods.update);
    app.del('/moods/:moodId', auth.requiresLogin, auth.mood.hasAuthorization, moods.destroy);

    //Finish with setting up the moodId param
    app.param('moodId', moods.mood);

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

};
