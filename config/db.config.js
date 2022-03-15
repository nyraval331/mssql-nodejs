'use strict'
//const mysql = require('mysql');
var sql = require("mssql");
var config = {
    user: 'USERNAME',
    password: 'PASSWORD',
    server: 'SERVERNAME',
    database: 'DATABASENAME',
    trustServerCertificate: true
};

 sql.connect(config, function (err) {

    if (err) {
        console.log('not connected: ', err)
    }
    else {
        console.log("Database Connected");
    }
});

module.exports = sql;