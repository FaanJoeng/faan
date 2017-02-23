var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');
var hash = require('../utils/pass').hash;

router.post('/', function (req, res, next){
	var pass = req.body.password;
	hash(pass, function (err, salt, hash){
		if(err) throw err;
        userDao.add(req, res, hash, salt);
	});
	res.render('register', {title : 'Register success!'});
});

router.get('/search', function(req, res) {
	userDao.isExisted(req, res);
});

module.exports = router;