var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.createUser = function(req, res){
    var user = new User();

    user.userName = req.body.userName;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(function(err, savedUser){
        if (err){
            console.log('error occured while registering the new user');
            var message = 'error occured while registering the new user';
            res.render('signup', {errorMessage: message});
        } else {
            console.log('registration successfull' + user.userName);
            res.render('newUser', {session: req.session, user: user.userName});
        }
    })
    

}

exports.login = function(req, res){
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email: email}, function(err, user){
        if (user == null){
            console.log('no such user exists');
            var message = 'no such user exists';
            res.render('login', {errorMessage: message});
            return;
        }

        user.comparePassword(password, function(err, isMatch){
            if(isMatch && isMatch == true){
                console.log('Login successfull');
                req.session.userName = user.userName;
                req.session.loggedIn = true;
                console.log('inside the compare password block -> ' +req.session.userName)
                res.render('dashboard', {session: req.session});
            } else{
                console.log('Login Failed');
                var message = 'Invalid login or password';
                res.render('login', {errorMessage: message});
                return;
            }
        })
    })
}

exports.logout = function(req, res){
    console.log('inside the logout function in user.js');
    var loggedoutUser = req.session.userName;
    req.session.destroy();
    console.log('Logged out'+ loggedoutUser);
    res.render('login', {session: req.session});
}