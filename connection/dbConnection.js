var mysql = require('mysql');

var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: "armyse"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected Success!!!");
});

module.exports = con;