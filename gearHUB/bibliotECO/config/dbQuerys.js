var Document 	= require('../app/models/document')
var User 		= require('../app/models/users')
var insFile     = require('./insertFile');


var queryAllUsers = function(callback){
	var q = User.find({});
	q.exec(function(err,infoUser){
		callback(infoUser);
	})
}

var deleteUser = function(id,callback){
	var q = User.remove({_id : id})
	q.exec(function(err){
		if(!err){
			callback({status : "Success"});
		}else{
			callback({status : "Fail",
					  message    : err });
		}	
	});
}

var queryDocument = function(callback){

	var q = Document.find({});
	q.exec(function(err,infoDoc){
		callback(infoDoc);
	});
};

var queryDocFiltered = function(callback){

	var q = Document.find({},{"infoDoc.blob" : 0});
	q.exec(function(err,infoDoc){
		callback(infoDoc);
	});
};


var getDocument = function(id,callback){
	var q = Document.find({ _id : id });
	q.exec(function(err,infoDoc){
		callback(infoDoc);
	});
};

var editDocument = function(doc,binaryDoc,callback){
	
	var q = Document.findOne({ _id	: doc.id});
	
	q.exec(function(err,infoDoc){
		infoDoc.infoDoc.titulo = doc.titulo;
		infoDoc.infoDoc.autores   = doc.autores;
		infoDoc.infoDoc.orientador = doc.orientador;
		infoDoc.infoDoc.resumo = doc.resumo;
		infoDoc.infoDoc.palavrasChave = doc.palavrasChave;
		infoDoc.infoDoc.ano = doc.ano;
		infoDoc.infoDoc.pageLink = doc.pageLink;
		infoDoc.infoDoc.tipo = doc.optradio;
		if(binaryDoc != null)
			infoDoc.infoDoc.blob = binaryDoc;
		infoDoc.save();
		callback(infoDoc);	
	});
}

var deleteDocument = function(doc,callback){
	var q = Document.remove({ _id : doc.id});
	q.exec(function(err,infoDoc2){
		if(!err){
			callback({status : "Success"});
		}else{
			callback({status : "Fail",
					  message    : err });
		}	
	});
}



module.exports = {queryAllUsers : queryAllUsers,
				  deleteUser	: deleteUser,
				  queryDocument : queryDocument,
				  getDocument 	: getDocument,
				  editDocument	: editDocument,
				  deleteDocument : deleteDocument,
				  queryDocFiltered : queryDocFiltered};

