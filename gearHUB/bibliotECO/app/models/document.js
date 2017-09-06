var mongoose = require('mongoose');

var documentSchema = mongoose.Schema({

	infoDoc				: {
		titulo			: String,
		autores			: String,
		orientador		: String,
		resumo			: String,
		palavrasChave	: String,
		tipo			: String,
		ano				: String,
		pageLink		: String,
		userSiape		: String,
		dataInsert		: String,
		storageName		: String,
		blob			: Buffer
	},



});

documentSchema.methods.getDataInsert = function(){
	var date = new Date()
	var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    resposta = year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
	return resposta
}

module.exports = mongoose.model('Document', documentSchema);