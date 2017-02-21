var crypto = require('crypto');
var len = 50;
var iterations = 1000;


exports.hash = function (pass, salt, fn) {
  if(3 == arguments.length){
    crypto.pbkdf2(pass, salt, iterations, len, function (err, hash) {
      fn(err, hash.toString('base64'));
    });
  }else{
    fn = salt;
    crypto.randomBytes(len, function (err, salt) {
      if(err) return fn(err);
      salt = salt.toString('base64');
      crypto.pbkdf2(pass, salt, iterations, len, function (err, hash) {
        fn(err, salt, hash.toString('base64'));
      });
    });
  }
};