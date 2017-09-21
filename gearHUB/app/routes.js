module.exports = function(app,interfaces){



	app.get('/',function(req,res){
        res.render('index.ejs',{
        	inter : interfaces
        });
	});

	app.get('/bib',function(req,res){
		var dir = "http://"+interfaces+":8080";
		res.redirect(dir);
	});

	app.get('/pyTutor',function(req,res){
		var dir = "http://"+interfaces+":8003/visualize.html";
		res.redirect(dir);
	});


}