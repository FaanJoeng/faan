var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao');
var hash = require('../utils/pass').hash;

//handle register request
router.post('/', function (req, res, next){
	var pass = req.body.password;
	hash(pass, function (err, salt, hash){
		if(err) throw err;
        userDao.add(req, res, hash, salt, pass);
	});
	res.render('register', {title : 'Register success!'});
});

//check whether the username is available
router.get('/search', function(req, res) {
	userDao.isExisted(req, res);
});

module.exports = router;