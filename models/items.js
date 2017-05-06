'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    name: {type: String},
    description: {type:String},
    item_cat: {type:String},
    belongs_to: {type:String},
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Items', ItemSchema);