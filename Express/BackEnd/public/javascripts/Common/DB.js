var mysql2 = require('mysql2');
var mysql = require('sync-mysql');
//const bluebird = require('bluebird');

const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: 'medit_project'
});

module.exports.connection = connection;

module.exports.sync = () => new mysql({
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: 'medit_project',
    multipleStatements: true,
    dateStrings: 'date'
});

//module.exports.DB = new DB(config.DB_HOST, config.DB_USER, config.DB_PASSWORD,config.DB_SCHEMA, config.DB_PORT);
