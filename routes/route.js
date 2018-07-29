
exports.main = function(req, res){
    res.render('index.ejs')
};

exports.signup = function(req, res){
    res.render('signup.ejs');
};

exports.login = function(req, res){
    res.render('login.ejs');
};