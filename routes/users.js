var mongoose = require('mongoose');
var User = mongoose.model('Users');

module.exports = app => {
    app.get("/users/:username", (req, res) => {
        User.findOne({username: req.params.username}, function(err, user) {
            if (err) 
                res.send(err);
            res.json(user);
        });
    });

    app.get("/users/existed/:username", (req, res) => {
        User.findOne({username: req.params.username}, function(err, user) {
            if (err)
                res.send(err);
            if (!user) 
                res.json({existed: false});
            else
                res.json({existed: true});
        });
    });

    app.get("/users/authenticate/:username/:password", (req, res) => {
        User.findOne({username: req.params.username, password: req.params.password}, function(err, user) {
            if (err)
                res.send(err);
            if (!user)
                res.json(user);
            else 
                res.json({username: user.username, likes: user.likes});
        });
    });

    app.post("/users", (req, res) => {
        var newuser = new User(req.body);
        newuser.save(function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    });

    app.put("/users/:username", (req, res) => {
        User.findOneAndUpdate({username: req.params.username}, req.body, {new:true}, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    });
};