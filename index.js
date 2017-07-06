#!/bin/env node

/**
 * Requires
 * Esses módulos são utilizados em nossa aplicação.
 */
const http			= require('http');						// servidor
const express		= require('express');					// framework
const compression	= require('compression');				// compressor
const bodyParser	= require('body-parser');				// body
const md5			= require('md5');						// md5 hash
const session		= require('express-session');			// sessão
const passport		= require('passport');					// login
const LocalStrategy = require('passport-local').Strategy; 	// login local
const ejs			= require('ejs');						// renderizador
const app			= express();							// aplicativo
const server		= http.Server(app);						// instância do servidor
const path			= require('path');						// path
const oracle		= require('oracledb');					// oracle driver


/**
 * Oracle
 * Neste bloco é feita a configuração da conexão com o Banco Oracle.
 */
const senhaOracle = process.env.PWD_ORACLE;					// pega a senha do environment
if(!senhaOracle){											// se não encontrar a senha
	throw new Error('Senha do Oracle não encontrada!');		// gera um erro
}
const knex = require('knex')({								// cria a conexão ao banco
	client: 'oracledb',										// driver utilizado
	connection: {											// dados da conexão
    	host        : '127.0.0.1',							// endereço do servidor
		user        : 'anderson',							// usuário
		password    : process.env.PWD_ORACLE,				// senha
		database    : 'xe',									// banco
    	charset     : 'utf8'								// charset
	}
});
const bookshelf = require('bookshelf')(knex);				// liga o banco ao bookshelf


/**
 * Modelo
 * Este é um modelo básico utilizando no Login do usuário.
 */
const Usuario = bookshelf.Model.extend({					// cria um modelo
	tableName: 'USUARIO',									// nome da tabela dos usuários
	idAttribute: 'id'										// chave primária da tabela
});


/**
 * Configurações
 * Caso esteja rodando no OpenShift, usará o IP deles.
 */
const ip = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0' ;	// endereço ip
const porta = process.env.OPENSHIFT_NODEJS_PORT || 8080;	// porta para servir a aplicação


/**
 * Autenticação
 * Abaixo está as configuração da estratégia de Login
 */
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


/**
 * Middleware
 * No bloco abaixo inserimos e configuramos funcionalidades na nossa Aplicação,
 * Como por exemplo: compressão dos dados trafegados.
 */
app.use(compression());											// compressão dos dados
app.use(bodyParser.urlencoded({ extended: false }));			// permite acesso a parametros POST
app.use(session({												// configurações da sessão
	secret: 's3gr3d0',											// segredo para o cookie
	resave: false,												// só re-salva o cookie se modificado
	saveUninitialized: false,									// não gera cookie até se logar
	cookie: {													// configurações do cookie
		maxAge: 7 * 24 * 60 * 60 * 1000							// 1 semana de duração
	}
}));
app.use(passport.initialize());									// passport
app.use(passport.session());									// liga a sessão ao passport

/**
 * Assets e renderização
 * Este é o código necessário para que a aplicação sirva os arquivos estáticos.
 * É também onde definimos o motor de renderização do ExpressJS.
 */
app.use('/', express.static( path.join(__dirname,'/dist') ));
app.set('views', path.join( __dirname,'dist' ));				// pasta base das views
app.set('view engine', 'html');									// seleciona a extensão das views
app.engine('html', ejs.renderFile);								// passa os html pela engine EJS


/**
 * Rotas
 * Aqui é feita a importação da rotas que ficam em um arquivo separado.
 */
require("./rotas/rotas.js")(app, knex, passport);				// importa as rotas


/**
 * Inicialização/Término
 * O código abaixo é responsável por inicializar e finalizar corretamente nossa Aplicação
 */
exterminador = function(sig){ if(typeof sig === "string"){ process.exit(1); } };

process.on('exit', function() { exterminador(); });
['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM']
.forEach(function(element, index, array) { process.on(element, function() { exterminador(element); }); });

server.listen(porta, ip, function(){							// inicia o servidor
	console.log('Iniciado em %s:%d ...', ip, porta);			// exibe IP e PORTA de escuta
});