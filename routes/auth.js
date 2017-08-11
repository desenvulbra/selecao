var express = require('express');
var jwt = require('jsonwebtoken');
var oracledb = require('oracledb');
var config = require('../config');
var router = express.Router();
oracledb.autoCommit = true;

router.post('/login', function (req, res, next) {
	var email = req.body.email;
	var senha = req.body.senha;

	if (!email) {
		renderError(res, 'É necessário preencher o e-mail.');
	}

	if (!senha) {
		renderError(res, 'É necessário preencher a senha.');
	}

	oracledb.getConnection({
		user          : config.user,
		password      : config.password,
		connectString : config.connectString
	}, function(err, connection) {
    if (err) {
      console.error(err.message);
      return;
    }

    connection.execute(
    	"SELECT ID, SENHA " + 
    	"FROM USUARIO WHERE EMAIL = :email",
    	[email],
    	function(err, result) {
        if (err) {
        	doRelease(connection);
					renderError(res, 'E-mail ou senha estão incorretos.');
					return;
        }

        if (result && result.rows.length > 0) {
        	var usuario = result.rows[0];

					if (usuario[1] != senha) {
	        	doRelease(connection);
						renderError(res, 'E-mail ou senha estão incorretos.');
						return;
					}

					var token = jwt.sign({
						sub: usuario[0]
					}, config.secret);

					res.json({
						token: token
					});
        } else {
        	doRelease(connection);
					renderError(res, 'E-mail ou senha estão incorretos.');	
        }
    	});
  });
});

router.post('/register', function (req, res) {
	var email = req.body.email;
	var nome = req.body.nome;
	var senha = req.body.senha;
	var sexo = req.body.sexo;
	var nascimento = req.body.nascimento;
	var errors = {};

	if (!nome) {
		errors.nome = 'É necessário preencher o nome.';
	}

	if (!sexo || ['M', 'F'].indexOf(sexo) == -1) {
		errors.sexo = 'É necessário preencher o sexo.';
	}

	if (nascimento) {
		var dt = new Date(nascimento);
		if (!dt) {
			errors.nascimento = 'A data informado não é válida.';
		} else if (getAge(nascimento) < 18) {
			errors.nascimento = 'É necessário ter 18 anos ou mais para se cadastrar.';
		}
	} else {
		errors.nascimento = 'É necessário preencher a data de nascimento.';
	}

	if (!email) {
		errors.email = 'É necessário preencher o e-mail.';
	} else if (!isEmailValid(email)) {
		errors.email = 'O e-mail informado não é válido.';	
	}

	if (!senha) {
		errors.senha = 'É necessário preencher a senha.';
	}

	if (Object.keys(errors).length > 0) {
		res.status(500).json(errors);
	} else {
		oracledb.getConnection({
			user          : config.user,
			password      : config.password,
			connectString : config.connectString
		}, function(err, connection) {
	    if (err) {
	      console.error(err.message);
	      return;
	    }

	    connection.execute(
	    	"INSERT INTO USUARIO (EMAIL, NOME, SEXO, NASCIMENTO, SENHA) " + 
	    	"VALUES (:email, :nome, :sexo, TO_DATE(:nascimento, 'dd/mm/yyyy'), :senha)",
	    	[email, nome, sexo, nascimento, senha],
	    	function(err, result) {
	        if (err) {
		        doRelease(connection);
	        	res.status(500).json({email: 'Este e-mail já está cadastrado.'});
	        	return;
	        }

			    connection.execute(
			    	"SELECT ID " + 
			    	"FROM USUARIO WHERE EMAIL = :email",
			    	[email],
			    	function(err, result) {
		          doRelease(connection);

							var token = jwt.sign({
								sub: result.rows[0][0]
							}, config.secret);

							res.json({
								token: token
							});
			      });
	    	});
	  });
	}
});

// https://stackoverflow.com/questions/14231381/to-check-if-age-is-not-less-than-13-years-in-javascript
function getAge(birthDateString) {
  var today = new Date();
  var birthDate = new Date(birthDateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  	age--;
  }
  return age;
}

function isEmailValid(email) {
	if (!email || !email.length) {
		return false;
	}
	var re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	return re.test(email);
}

function renderError(res, message) {
	res.status(500).json({message: message});
}

function doRelease(connection) {
  connection.close(function(err) {
    if (err) {
      console.error(err.message);
    }
  });
}

module.exports = router;