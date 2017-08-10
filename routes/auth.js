var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

router.post('/login', function (req, res, next) {
	var email = req.body.email;
	var senha = req.body.senha;
	var errors = {};

	if (!email) {
		errors.email = 'É necessário preencher o e-mail.';
	}

	if (!senha) {
		errors.senha = 'É necessário preencher a senha.';
	}

	var usuarios = {
		'fulano@gmail.com': '3858f62230ac3c915f300c664312c63f',
		'carla@gmail.com': '3858f62230ac3c915f300c664312c63f',
		'joao@gmail.com': '3858f62230ac3c915f300c664312c63f'
	};

	if (email && senha && (usuarios.indexOf(usuarios) != -1 || usuarios[email] != senha)) {
		usuarios.email = 'E-mail ou senha não estão incorretos.';
	}

	if (errors.length > 0) {
		res.status(500).json(errors);
	} else {
		var token = jwt.sign({
			sub: 'dasdiasd99asd7'
		}, req.app.get('superSecret'));

		res.json({
			token: token
		});
	}
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

	var emails = [
		'fulano@gmail.com',
		'carla@gmail.com',
		'joao@gmail.com',
	];

	if (email && emails.indexOf(email) >= 0) {
		errors.email = 'Este e-mail já está cadastrado.';
	}	

	if (Object.keys(errors).length > 0) {
		res.status(500).json(errors);
	} else {
		var token = jwt.sign({
			sub: 'dasdiasd99asd7'
		}, req.app.get('superSecret'));

		res.json({
			token: token
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

module.exports = router;