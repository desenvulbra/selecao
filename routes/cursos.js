var express = require('express');
var jwt = require('jsonwebtoken');
var oracledb = require('oracledb');
var config = require('../config');
var router = express.Router();

router.use(function(req, res, next) {
	var token = req.headers['authorization'];

	if (token) {
		jwt.verify(token, config.secret, function(err, decoded) {
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
    	"SELECT * FROM CURSO",
    	{},
    	{ outFormat: oracledb.OBJECT },
    	function(err, result) {
        if (err) {
          doRelease(connection);
		      console.error(err.message);
		      return;
        }

        res.json(result.rows);
    	});
  });
});

function doRelease(connection) {
  connection.close(function(err) {
    if (err) {
      console.error(err.message);
    }
  });
}

module.exports = router;