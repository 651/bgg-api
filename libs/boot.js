module.exports = app => {
    var mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/bggdb');

    app.listen(app.get("port"), () => {
        console.log(`bgg API - Port ${app.get("port")}`);
    });
};