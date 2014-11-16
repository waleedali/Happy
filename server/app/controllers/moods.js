'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Mood = mongoose.model('Mood'),
    _ = require('lodash');


/**
 * Find mood by id
 */
exports.mood = function(req, res, next, id) {
    Mood.load(id, function(err, mood) {
        if (err) return next(err);
        if (!mood) return next(new Error('Failed to load mood ' + id));
        req.mood = mood;
        next();
    });
};

/**
 * Create a mood
 */
exports.create = function(req, res) {
    var mood = new Mood(req.body);
    mood.user = req.user;

    mood.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                mood: mood
            });
        } else {
            res.jsonp(mood);
        }
    });
};

/**
 * Update a mood
 */
exports.update = function(req, res) {
    var mood = req.mood;

    mood = _.extend(mood, req.body);

    mood.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                mood: mood
            });
        } else {
            res.jsonp(mood);
        }
    });
};

/**
 * Delete an mood
 */
exports.destroy = function(req, res) {
    var mood = req.mood;

    mood.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                mood: mood
            });
        } else {
            res.jsonp(mood);
        }
    });
};

/**
 * Show an mood
 */
exports.show = function(req, res) {
    res.jsonp(req.mood);
};

/**
 * List of moods
 */
exports.all = function(req, res) {
    Mood.find().sort('-created').populate('user', 'name username').exec(function(err, moods) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(moods);
        }
    });
};