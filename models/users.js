'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type:String},
    password: {type:String},
    fullname: {type:String},
    contact: {type:String},
    email: {type:String},
    status: {type:String},
    created: {
        type: Date,
        default: Date.now
    },
    likes: [String]
});

module.exports = mongoose.model('Users', UserSchema);