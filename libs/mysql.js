var db = {};
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'board'
});

db.query = function (sql, callback) {

    if (!sql) {
        callback();
        return;
    }
    pool.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        };

        callback(null, rows, fields);
    });
}
module.exports = db; 