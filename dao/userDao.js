var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./userSqlMapping');
var $util = require('../utils/util');

var pool = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
	add: function(req, res, hash, salt){
		var username = req.body.username;
        pool.getConnection(function(err, connection){
        	connection.query($sql.add, [username, hash, salt], function(err, result){
        		if(err){
        			console.log(err);
        		}
        		if(result){
        			res.status(200).end('success!');
        		}
        	});
        	connection.release();
        });
	},

    query: function(req, res, fn){
        var username = req.body.username;
        pool.getConnection(function(err, connection){
            connection.query($sql.query, [username], function(err, result){
                if(err)
                    console.log(err);
                if(result){
                    fn(req, res, result);
                }
            });
        });
    }
}