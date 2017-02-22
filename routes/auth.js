var express = require('express');
var router = express.Router();
var session = require('express-session');
var userDao = require('../dao/userDao');
var hash = require('../utils/pass').hash;

router.use(session({
  resave: false, 
  saveUninitialized: false, 
  secret: 'shhhh, very secret',
  cookie: {maxAge: 1209600000}
}));


router.post('/', function(req, res, next){
	userDao.query(req, res, function(req, res, result){
        if(typeof result[0] === 'undefined'){
        	res.json({'msg' : 'The username or password is wrong.'});
        }else{
        	hash(req.body.password, result[0].salt, function(err, hashedPassword){
                if(result[0].hash === hashedPassword){
                	req.session.regenerate(function(){
                        console.log('auth ok');
                        req.session.user = result[0].username;
                        req.session.success = 'Auth Success.';
                        res.redirect('/auth/restricted');
                	});
                }else{
                    console.log('auth fail');
                	req.session.error = 'Auth Fail.';
                	res.redirect('/');
                }
        	});
        }
	});
});

router.get('/restricted', restricted, function(req, res, next){
    console.log('ress');
    res.render('restrict', {title: 'Restricted'});
});


router.get('/logout', function(req, res){
    req.session.destroy(function(){
        res.redirect('/');
    });
});


function restricted(req, res, next){
    if(req.session.user){
        next();
    }else{
        res.redirect('/');
    }
}


module.exports = router;