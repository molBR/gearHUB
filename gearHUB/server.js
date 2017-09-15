var express = require('express');
var app = express();
var morgan = require('morgan');
var path = require('path');


app.use(morgan('dev'));
app.use(express.static('public'));

require('./app/routes.js')(app);

app.listen(3000);	
console.log("Pau ta quebrando GEARHUB")