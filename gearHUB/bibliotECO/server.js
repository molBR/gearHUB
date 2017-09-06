// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var forms	 = require('formidable')
var favicon  = require('serve-favicon');


var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser'); //trocado
var json		 = require('express-json'); //por esse
var session      = require('express-session');
var configDB = require('./config/database.js');

// configuration ===============================================================
app.use(favicon(__dirname + '/views/favicon.ico'));
app.use(express.static(__dirname + '/node_modules/'));
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms //tive que trocar por..

app.set('view engine', 'ejs'); // set up ejs for templating
app.set('views', __dirname + '/views');
// required for passport
app.use(session({ secret: 'testetestado' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


// launch ======================================================================
app.listen(port);
console.log('Pau ta quebrando na porta: ' + port);
