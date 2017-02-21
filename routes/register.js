var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');
var hash = require('../utils/pass');

router.post('/', function (req, res, next) {
	console.log(req.body);
	var pass = req.body.password;
	hash(pass, function (err, salt, hash) \{
		if(err) throw err;
        userDao.add(req, res, salt, hash);
	})
	res.end();
});

module.exports = router;