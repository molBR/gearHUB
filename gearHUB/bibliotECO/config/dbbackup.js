var mongoose = require('mongoose');

var db = mongoose.connection;

db.on('error',console.error);
db.once('open', function(){
	console.log('Conectado ao Mongo DB.')
});

mongoose.createConnection('mongodb://localhost/test');
