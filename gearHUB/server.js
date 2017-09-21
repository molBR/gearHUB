var express = require('express');
var app = express();
var morgan = require('morgan');
var path = require('path');
var os = require('os');


var interfaces = os.networkInterfaces();
interfaces = interfaces.lo[0].address;

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs'); // set up ejs for templating
app.set('views', __dirname + '/views');
console.log(__dirname);
require('./app/routes.js')(app,interfaces);

app.listen(80);	
console.log("Pau ta quebrando GEARHUB")	