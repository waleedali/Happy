'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Mood Schema
 */
var MoodSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    mood: {
        type: String,
        default: '',
        trim: true
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
MoodSchema.path('mood').validate(function(title) {
    return title.length;
}, 'Mood cannot be blank');

/**
 * Statics
 */
MoodSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Mood', MoodSchema);
