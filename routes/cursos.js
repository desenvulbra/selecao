var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

router.use(function(req, res, next) {
	var token = req.headers['authorization'];

	if (token) {
		jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {
			if (err) {
				res.status(403).send({
					message: 'Falha na autenticação.'
				});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		res.status(403).send({
			message: 'Nenhum token foi passado.'
		});
	}
});

router.get('/', function(req, res, next) {
	var cursos = {
		items: [
			{id: '3c177aa7ab62fc701ff7768a32c8d283', curso: 'Oracle'},				
			{id: '236f700633eda0d2097915fe9a4d952b', curso: 'AngularJS'},
			{id: '30229b9151c6cc4f9a6a67a7a58ce67b', curso: 'NodeJS'},
			{id: 'a4ea90406d44c16561ba406c1d6a65ed', curso: 'PL/SQL'}
		]
	};
	res.json(cursos);
});

module.exports = router;