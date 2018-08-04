var express = require('express');
var db=require('./models/db.js');
var bodyParser = require('body-parser');
var session = require('express-session');

var jwt = require('express-jwt');
var mongoose = require('mongoose');
var routesApi = require('./routes/route.js');
var userApi = require('./routes/user.js');

var auth = jwt({
    secret: 'my_secret',
    userProperty: 'payload'
});

//using the express module to create an app
var app = express();

//defining the port number
port = process.env.PORT || 8081

//setting the template to ejs
app.set('view engine', 'ejs');
//using the docs from the public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret:"qazwsxedcrfvtgbyhnujm",resave: true, saveUninitialized: true}));



app.get('/', routesApi.main );

//authentication
app.get('/signup', routesApi.signup);
app.get('/login', routesApi.login);
app.get('/logout', userApi.logout);
app.get('/dashboard',routesApi.dashboard);
app.post('/newUser', userApi.createUser );
app.post('/authenticate', userApi.login);


app.listen(port, function(err, data){
    console.log('server is listening now!')
})