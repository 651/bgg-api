module.exports = () => {
    var mongoose = require('mongoose');

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/bgg-db');

    return mongoose;
};