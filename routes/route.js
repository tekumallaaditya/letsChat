var mongoose = require('mongoose');
var User = mongoose.model('User');



exports.main = function(req, res){
    res.render('index.ejs', {session: req.session})
};

exports.signup = function(req, res){
    res.render('signup.ejs', {session: req.session});  


};

exports.login = function(req, res){
    res.render('login.ejs', {session: req.session});
};

exports.dashboard = function(req, res){
    res.render('dashboard.ejs' ,{session: req.session});
}

