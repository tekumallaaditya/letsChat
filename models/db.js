var mongoose = require('mongoose');
var chalk = require('chalk');
//var crypto = require('crypto');
//var jwt = require('jsonwebtoken');
var bcrypt=require('bcrypt');
var SALT_WORK_FACTOR = 10;

console.log('I am here')


var dbURL = 'mongodb://localhost/letsChat';

mongoose.connect(dbURL);

mongoose.connection.on('connected', function(){
    console.log(chalk.green('mongoDB connected'));
});

mongoose.connection.on('error', function(err){
    console.log(chalk.red('error occured->' + err));
});

mongoose.connection.on('disconnected', function(){
    console.log(chalk.yellow('mongoDB disconnected'));
});

var userSchema = new mongoose.Schema({
    userName: {type: String},
    email: {type: String, unique: true},
    password: String
    
});

userSchema.pre('save', function(next){
    var user = this;
    console.log('before registering the user');

    if(!user.isModified('password')) return next();

    //generate the salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);

        console.log(salt);
        bcrypt.hash(user.password,salt, function(err, hash){
            if(err) return next(err);

            user.password = hash;
            console.log('hash ->' + hash);
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatepassword, cb){
    bcrypt.compare(candidatepassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


mongoose.model('User', userSchema);


