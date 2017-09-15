module.exports = function(app){



	app.get('/',function(req,res){

		res.sendFile('index.html');
	});

	app.get('/bib',function(req,res){
		res.redirect("http://127.0.0.1:8080")
	});


}