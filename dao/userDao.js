var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./userSqlMapping');
var $util = require('../utils/util');

var pool = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
	add: function(req, res, hash, salt){
		var username = req.body.username;
        var pass = req.body.password;
        console.log(pass);
        pool.getConnection(function(err, connection){
        	connection.query($sql.add, [username, hash, salt, pass], function(err, result){
        		if(err){
        			console.log(err);
        		}
        		if(result){
        			
        		}
        	});
        	connection.release();
        });
	},

    query: function(req, res, fn){
        var username = req.body.username;
        pool.getConnection(function(err, connection){
            connection.query($sql.query, [username], function(err, result){
                if(err){
                    console.log(err);
                }
                if(result){
                    fn(req, res, result);
                }
            });
        });
    },

    isExisted: function(req, res){
        var username = req.query.username;

        pool.getConnection(function(err, connection){
            connection.query($sql.isExisted, [username], function(err, result){
                if(err){
                    console.log(err);
                }
                if(result){
                    if(typeof result[0] === 'undefined'){
                        res.json({"msg" : "Username available"});
                    }else if(result[0].username == username){
                        res.json({"msg" : "Username unavailable"});
                    }
                }
            });
            connection.release();
        });
    }
}