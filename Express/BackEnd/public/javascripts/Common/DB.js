var mysql2 = require('mysql2');
var mysql = require('sync-mysql');
//const bluebird = require('bluebird');

//const connection = mysql2.createConnection({
//    host: 'localhost',
//    user: 'root',
//    password: '0000',
//    database: 'medit_project',
//    multipleStatements: true,
//    dateStrings: 'date'
//});

//module.exports.connection = connection;

const sync_mysql = new mysql({
    host: '172.25.4.117',
    user: 'root',
    password: '0000',
    database: 'medit_project',
    multipleStatements: true,
    dateStrings: 'date'
});

function handleDisconnect(client)
{

    client.on('error', function (error)
    {
        if (!error.fatal)
            return;

        if (error.code !== 'PROTOCOL_CONNECTION_LOST')
            throw err;

        console.error('> Re-connecting lost MySQL connection: ' + error.stack);

        // NOTE: This assignment is to a variable from an outer scope; this is extremely important
        // If this said `client =` it wouldn't do what you want. The assignment here is implicitly changed
        // to `global.mysqlClient =` in node.
        sync_mysql = new mysql({
            host: 'localhost',
            user: 'root',
            password: '0000',
            database: 'medit_project',
            multipleStatements: true,
            dateStrings: 'date'
        });
        handleDisconnect(sync_mysql);
    });
};

module.exports.sync = () => sync_mysql;
//handleDisconnect(sync_mysql);

//module.exports.DB = new DB(config.DB_HOST, config.DB_USER, config.DB_PASSWORD,config.DB_SCHEMA, config.DB_PORT);
