var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./userSqlMapping');

var pool = mysql.createPool($conf.mysql);

module.exports = {
	add: function (req, res, hash, salt) {
		var username = req.body.username;
        pool.getConnection(function(err, connection) {
        	connection.query($sql.add, username, hash, salt, function(err, result){
        		if(err){
        			console.log(err)
        		}
        		if(result){
        			res.send('success!');
        		}
        	});
        	connection.release();
        });
	}
}