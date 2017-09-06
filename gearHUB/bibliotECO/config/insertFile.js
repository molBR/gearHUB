//talvez eu termine isso, talvez não
var formidable 		= require('formidable'),
	fs         		= require('fs'),
	path	   		= require('path');
var Document        = require('../app/models/document');



var FileControl = function(req,res){
	
	var form = new formidable.IncomingForm();
	respostas = {} //Objeto vazio
	var key = 'Erros'; //Identificador 
	respostas[key] = []; //Vetor que funciona como lista para inserção de objetos
	var erro = 0;
    form.parse(req, function(err, fields, files) {
    	var file_ext = files.fileToInsert.name.split('.').pop();
    	if(fields.titulo=="")
    	{
    		erro = 1;
    		var resposta = {
    			erroTitulo : 'Titulo esta vazio'
    		};
    		respostas[key].push(resposta);
    	}
    	if(fields.autores==""){
			erro = 1;
    		var resposta = {
    			erroAutores : 'Autores esta vazio'
    		};
    		respostas[key].push(resposta);
    	}
    	if(fields.autores==""){
			erro = 1;
    		var resposta = {
    			erroAutores : 'Autores esta vazio'
    		};
    		respostas[key].push(resposta);
    	}
    	if(fields.orientador==""){
			erro = 1;
    		var resposta = {
    			erroOrientador : 'Orientador esta vazio'
    		};
    		respostas[key].push(resposta);
    	}
    	if(fields.resumo==""){
			erro = 1;
    		var resposta = {
    			erroResumo : 'Resumo esta vazio'
    		};
    		respostas[key].push(resposta);
    	}
    	if(fields.palavrasChave==""){
			erro = 1;
    		var resposta = {
    			erroAutores : 'Palavras Chave esta vazio'
    		};
    		respostas[key].push(resposta);
    	}
    	if(fields.pagelink==""){
			erro = 1;
    		var resposta = {
    			erroLink : 'Page Link está vazio'
    		};
    		respostas[key].push(resposta);
    	}
    	if(files.fileToInsert._writeStream.bytesWritten == 0){
    		erro = 1;
    		var resposta = {
    			erroFile : 'Por favor, envie um arquivo'
    		};
    		respostas[key].push(resposta);
    	}else if (file_ext != 'pdf'){
    		
    		erro = 1;
    		var resposta = {
    			erroFile : 'Por favor, insira um arquivo pdf!'
    		};
    		respostas[key].push(resposta);
    	}
    	if(erro == 1 )
    	{
        	res.status(400);
        	res.json(respostas);	                    
    	}else{
	    	var newDocument = new Document();
            newDocument.infoDoc.blob = fs.readFileSync(files.fileToInsert.path); 
            newDocument.infoDoc.titulo        = fields.titulo;
            newDocument.infoDoc.autores       = fields.autores;
            newDocument.infoDoc.orientador    = fields.orientador;
            newDocument.infoDoc.resumo        = fields.resumo;
            newDocument.infoDoc.palavrasChave = fields.palavrasChave;
            newDocument.infoDoc.tipo          = fields.optradio
            newDocument.infoDoc.ano           = fields.ano;
            newDocument.infoDoc.pageLink      = fields.pageLink;
            newDocument.infoDoc.userSiape     = fields.siape;
            newDocument.infoDoc.dataInsert    = newDocument.getDataInsert();
            newDocument.save(function(err) {
            if (err)
            {
                erro = 1

            }
            if (erro==1){
                res.status(500);
                res.json({'success': false});
            }
            else{
                res.redirect('insertedFile');
            }
            });

    };
    });
}

var EditFile = function(req,callback){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        var file_ext = files.fileToInsert.name.split('.').pop();
        if(files.fileToInsert._writeStream.bytesWritten > 0 && file_ext == 'pdf')
            var binarySend = fs.readFileSync(files.fileToInsert.path);
        else
            var binarySend = null;
        callback(fields,binarySend);
    })



}

module.exports = {FileControl : FileControl,
                  EditFile    : EditFile  };
