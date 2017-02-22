var sql = {
	add: 'INSERT INTO user(id, username, hash, salt) VALUES (0, ?, ?, ?)',
	isExisted: 'SELECT username from user WHERE username = ?',
	query: 'SELECT * FROM user WHERE username = ?'
}

module.exports = sql;