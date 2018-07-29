var express = require('express');
var routesApi = require('./routes/route.js')

//using the express module to create an app
var app = express();

//defining the port number
port = process.env.PORT || 8081

//setting the template to ejs
app.set('view engine', 'ejs');
//using the docs from the public folder
app.use(express.static(__dirname + '/public'));



app.get('/', routesApi.main );
app.get('/signup', routesApi.signup);
app.get('/login', routesApi.login);

app.listen(port, function(err, data){
    console.log('server is listening now!')
})