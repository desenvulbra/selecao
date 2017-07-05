#!/bin/env node
//includes
const fs = require('fs'); //file system
const http = require('http'); //servidor
const express = require('express'); //framework
const compression = require('compression'); //compressor
const bodyParser = require('body-parser'); //body
const md5 = require('md5'); //md5 hash
const session = require('express-session'); //sessão
const passport = require('passport'); //login
const LocalStrategy = require('passport-local').Strategy; //login local
const ejs = require('ejs'); //renderizador
const app = express(); //aplicativo
const server = http.Server(app); //instância do servidor
const path = require('path'); //path
const zlib = require('zlib'); //zlib stream
const oracle = require('oracledb'); //oracle driver


/** BEGIN: ORACLE */
const knex = require('knex')({
	client: 'oracledb',
	connection: {
    	host        : '127.0.0.1',
		user        : 'anderson',
		password    : 'a1b2c3',
		database    : 'xe',
    	charset     : 'utf8'
	}
});
const bookshelf = require('bookshelf')(knex);
/** END: ORACLE */

/** BEGIN: MODELOS */
var Usuario = bookshelf.Model.extend({
    tableName: 'USUARIO',
    idAttribute: 'id'
});
/** END: MODELOS */

/** BEGIN: CONFIGURAÇÕES */
var ip = process.env.OPENSHIFT_NODEJS_IP;
const porta = process.env.OPENSHIFT_NODEJS_PORT || 8080;
/** END: CONFIGURAÇÕES */

/** BEGIN: AUTENTICAÇÃO */
passport.use(new LocalStrategy(function(email, senha, done) {
    new Usuario({EMAIL: email}).fetch().then(function(data) {
        var usuario = data;
        if(usuario === null) {
	        return done(null, false, {message: 'Usuário ou senha incorretos'});
	    } else {
	        usuario = data.toJSON();
	        if(senha !== usuario.SENHA){
                return done(null, false, {message: 'Usuário ou senha incorretos'});
            }else{
                return done(null, usuario);
            }
        }
	});
}));

passport.serializeUser(function(usuario, done) {
    done(null, usuario.EMAIL);
});

passport.deserializeUser(function(usuario, done) {
    new Usuario({EMAIL: usuario}).fetch().then(function(usuario) {
	    done(null, usuario);
	});
});
/** END: AUTENTICAÇÃO */

/** BEGIN: MIDDLEWARE */
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true, keepExtensions:true, uploadDir:path.join(__dirname,'/') }));
app.use(session({ key: 'connect.sid', secret: 'UlbraSecretKEY', resave: true, proxy: true, saveUninitialized: true, cookie: { secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 /*1semana*/ } }));
app.use(passport.initialize());
app.use(passport.session());
/** END: MIDDLEWARE */

/** BEGIN: RENDERIZAÇÃO */
app.use('/bower_components', express.static( path.join(__dirname,'/bower_components') ));
['fonts','images','scripts','styles','partials'].forEach(function(part,index){ app.use('/'+part, express.static( path.join(__dirname,'public',part) )); });
app.set('views', path.join( __dirname,'public' ));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
/** END: RENDERIZAÇÃO */


/** BEGIN: ROTAS */
app.get('/', function(req, res, next) { res.render('index'); });

app.get('/cursos', function(req, res, next) {
	if( !req.isAuthenticated() ){ return res.json({ logado: false }); }
	var cursos = { items: [
						{ id: "3c177aa7ab62fc701ff7768a32c8d283", curso: "Oracle" },
						{ id: "236f700633eda0d2097915fe9a4d952b", curso: "AngularJS" },
						{ id: "30229b9151c6cc4f9a6a67a7a58ce67b", curso: "NodeJS" },
						{ id: "a4ea90406d44c16561ba406c1d6a65ed", curso: "PL/SQL" }
	]};
	return res.json( cursos );
});

app.get('/logado', function(req, res, next) {
	if( !req.isAuthenticated() ){ return res.json({ logado: false }); }
	return res.json({ logado: true });
	/*knex.select('nusuario','nome','email').from('ctb_usuario').where({ funcao: 1 }).orderBy( 'nome' ).then(function(rows) {
		return res.json({ logado: true, nome: req.session.passport.nome, email: req.session.passport.user, token: req.session.passport.token, id: req.user.id, foto: req.session.passport.foto, funcao: req.session.passport.funcao, programadores: rows });
	}).catch(function(error) {
		return res.json({ logado: true, nome: req.session.passport.nome, email: req.session.passport.user, token: req.session.passport.token, id: req.user.id, foto: req.session.passport.foto, funcao: req.session.passport.funcao, programadores: [] });
	});*/
});

app.post('/login', function(req, res, next) {
	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login'}, function(err, user, info) {
		
	    if(err || !user) {
	        return res.json({erro: 'Dados de login não conferem!1' });
	    }
	    return req.logIn(user, function(err) {
	        if(err) {
	            return res.json({erro: 'Dados de login não conferem!2' });
	        } else {
				req.session.passport.nome = user.NOME;
				res.json({ sucesso: 'sim' });
	        }
	    });
	})(req, res, next);
});

app.put('/cadastrar', function(req, res, next) {
	['email', 'password', 'sexo', 'nome', 'nascimento'].forEach(function(part, index){
		if( !(part in req.body) ){
			return res.json({ erro: 'Erro! Verifique os dados preenchidos e tente novamente.' });
		}
	});
	var email = req.body.email;
	var senha = req.body.password;
	var sexo = req.body.sexo;
	var nome = req.body.nome;
	var nasc = req.body.nascimento;

	if( senha.length < 8 ){
		return res.json({ erro: 'Erro! A senha deve possuir no mínimo 8 caracteres.' });
	}

	if( sexo !== 'M' && sexo !== 'F' ){
		return res.json({ erro: 'Erro! Verifique o sexo selecionado.' });
	}

	if( nome.toString().trim().length === 0 ){
		return res.json({ erro: 'Erro! Nome não pode ficar em branco.' });
	}

	nasc = nasc.split('/').reverse().join('-');
  	var nascimento = +new Date( nasc );
  	var idade = ~~((Date.now() - nascimento) / (31557600000));
  	if( idade < 18 ){
		return res.json({ erro: 'Erro! A idade mínima para cadastro é de 18 anos.' });
	}

	senha = md5(senha);

	console.log(req.body);
	knex('USUARIO')
	.insert({ EMAIL: email, NOME: nome, SEXO: sexo, NASCIMENTO: nasc, SENHA: senha })
	.then(
		function(){
			console.log('salvou!');
		}
	);
	/*if(typeof req.body.email !== 'undefined'){
		
		//procura no banco por alguem com esse email
		//insere o email no banco, usando a senha
		return res.json({ sucesso: 'sim' });
		
	}else{
		return res.json({ erro: 'Erro! Tente novamente mais tarde.' });
	}*/
	return res.sendStatus(200);
	
});

app.get('/sair', function(req, res, next) {
	if(!req.isAuthenticated()) { res.redirect('/'); } else { res.clearCookie('login'); req.logout(); res.redirect('/'); }
});



app.use(function(req, res, next) { res.status(404); res.redirect('/#/404');  });
/** END: ROTAS */


/** BEGIN: INICIALIZÃO E TÉRMINO */
exterminador = function(sig){ if(typeof sig === "string"){ process.exit(1); } };

process.on('exit', function() { exterminador(); });
['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM']
.forEach(function(element, index, array) { process.on(element, function() { exterminador(element); }); });

if (typeof ip === "undefined") {//app on
    console.warn('Faltando -> OPENSHIFT_NODEJS_IP');
    ip = "0.0.0.0";
};

server.listen(porta, ip, function(){ console.log('Iniciado em %s:%d ...', ip, porta); });
/** END: INICIALIZÃO E TÉRMINO */