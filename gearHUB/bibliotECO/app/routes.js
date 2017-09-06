var insFile         = require('../config/insertFile');
var bd              = require('../config/dbQuerys');

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================


    app.get('/', function(req, res) {
        bd.queryDocument(function(resposta){ //query vazio para pegar todos os arquivos
            res.render('index.ejs',{
                query : resposta,
                user : req.user
            });
        });
    });


    // =====================================
    // LOGIN ===============================
    // =====================================    
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login',{
        successRedirect : '/', //redirect to the secure profile section 
        failureRedirect : '/login', //redirect to the signup page if there is an error
        failureFlash : true //allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup',isLoggedIn,function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', //redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true //allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)]


    app.get('/upload/',function(req, res) {
        aux = req._parsedUrl.query.substring(req._parsedUrl.query.indexOf("=")+1,
            req._parsedUrl.query.length );
        but = aux.substring(aux.indexOf("=")+1,aux.length);
        aux = aux.substring(0,aux.indexOf("&"));
        if(but=='ver')
        {
            bd.getDocument(aux,function(resposta){
                res.render('ver.ejs',{
                    query : resposta[0],
                });
            });
        }else if(but=="editar"){
            bd.getDocument(aux,function(resposta){ 
                res.render('editar.ejs',{
                    query : resposta[0],
                    user : req.user 
                });
            });          
    }
    });

    app.post('/upload/',isLoggedIn,function(req, res) {
        delete app.bodyParser; //sinceramente nao sei como nao buga, mas funciona
        insFile.EditFile(req,function(fields,binaryDoc){
            if(fields.botao == "enviar"){
                bd.editDocument(fields,binaryDoc,function(resposta){
                   /* res.set({"Content-Disposition": 'attachment; filename="'+resposta.infoDoc.titulo+'.pdf"'})
                    res.send(resposta.infoDoc.blob);*/
                    res.redirect('/');
                });
            }else if(fields.botao == "deletar"){
                bd.deleteDocument(fields,function(resposta){
                    res.redirect('/');
                });
            }          
        });
    });

    app.post('/ver/',function(req, res){
        bd.getDocument(req.body.id,function(infoDoc){
            console.log(infoDoc);
            res.set({"Content-Disposition": 'attachment; filename="'+infoDoc[0].infoDoc.titulo+'.pdf"'})
            res.send(infoDoc[0].infoDoc.blob);
        });
    });

    app.get('/upload', isLoggedIn, function(req, res) {
        res.render('upload.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.post('/upload', isLoggedIn,(function(req,res){
        delete app.bodyParser; //pensei que ia bugar mas não bugou, talvez bugue :(
        insFile.FileControl(req,res);
    }));

    app.get('/insertedFile',isLoggedIn,function(req,res){
        res.render('insertedFile.ejs');
    });




    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};




// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
};


