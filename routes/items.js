var mongoose = require('mongoose');
var Item = mongoose.model('Items');
var User = mongoose.model('Users');

module.exports = app => {
    //Routing
    //Get items list that login user likes
    app.get("/items/:username", (req, res) => {
        User.findOne({username: req.params.username}, function(err, user) {
            if (err)
                res.send(err);
            var interests = user.likes;

            if (typeof interests === 'undefined' || interests === null)
                interests = ['test'];

            Item.find({belongs_to: {'$ne': req.params.username}, 
            item_cat:{'$in': interests}}, function(err, items) {
                if (err)
                    res.send(err);
                res.json(items);
            });
        });
    });

    //Get login user's items that matched item_cat
    app.get("/myitems/:myusername/:username", (req, res) => {
        User.findOne({username: req.params.username}, function(err, user) {
            if (err)
                res.send(err);
            var interests = user.likes;

            if (!interests)
                interests = [];

            Item.find({belongs_to: req.params.myusername,
            item_cat:{'$in': interests}}, function(err, items) {
                if(err) 
                    res.send(err);
                res.json(items);
            });
        });
    });

    //Get all login user's items
    app.get("/myitems/:myusername", (req, res) => {
        Item.find({belongs_to: req.params.myusername}, function(err, items) {
            if (err)
                res.send(err);
            res.json(items);
        });
    });

    app.get("/item/:itemid", (req, res) => {
        Item.findById(req.params.itemid, function(err, item) {
            if (err)
                res.send(err);
            res.json(item);
        });
    });

    app.post("/items", (req, res) => {
        var newitem = new Item(req.body);
        newitem.save(function(err, item) {
            if (err) 
                res.send(err);
            res.json(item);
        });
    });

    app.put("/items/:itemid", (req, res) => {
        User.findByIdAndUpdate(req.params.itemid, req.body, {new:true}, function(err, item) {
            if (err)
                res.send(err);
            res.json(item);
        });
    });

}