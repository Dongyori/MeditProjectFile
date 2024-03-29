﻿const DB = require('./DB');
const ErrorCode = require('./ResultCode');
const Fun = require('../Function');
const Mailer = require('../Mailer');

//DB.Connect();
const VueAddress = 'localhost:8080';

function ErrorResponse(array, code)
{
    array.resultCode = code;
    return array;
}

async function CheckBody(req_body, checklist)
{
    for (var checkitem of checklist)
    {
        if (req_body[checkitem] == null)
            return checkitem;
    }
    return true;
}

// SystemLog(req.url, req.body);
async function SystemLog(url, ip, message)
{
    // return;
    const connection = DB.sync();
    var table_string = `systemlog_` + (new Date()).yyyymm();
    var insert_table_string = table_string + `(date, AccountNo, Action, Message)`;

    if (message.length > 1000)
        message = message.substring(0, 1000);

    message = message.replace(/'/gi, "''");

    var values_string = `(NOW(), '${ip}', '${url}', '${message}')`;
    var query_string = `INSERT INTO ${insert_table_string} VALUES ${values_string}`;
    try
    {
        console.log(query_string);
        connection.query(query_string);
    }
    catch (err)
    {
        var abc = 1;
    }
}

function log_result(err, results)
{
    if (err)
    {
        if (err.code == 'ER_NO_SUCH_TABLE')
        {
            const connection = DB.connection;
            const table_string = `systemlog_` + (new Date()).yyyymm();
            //const insert_table_string = table_string + `(date, AccountNo, Action, Message)`;
            connection.query(`CREATE TABLE ${table_string} LIKE systemlog_template`, log_result);
            //connection.query(query_string, log_result);
        }
    }
}

Date.prototype.yyyymm = function ()
{
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString();
    return yyyy + (mm[1] ? mm : '0' + mm[0]);
}


module.exports.VueAddress = VueAddress;
var AsyncConnection = DB.connection;
var connection = DB.sync();
module.exports.MakeValueString = Fun.MakeValueString;
module.exports.MakeJsObject = Fun.MakeJsObject;
module.exports.MakeDescriptionValueString = Fun.MakeDescriptionValueString;
module.exports.FindPreVer = Fun.FindPreVer;
module.exports.Query = DB.query;
module.exports.DB = DB;
module.exports.Connection = connection;
module.exports.AsyncConnection = AsyncConnection;
module.exports.ErrorCode = ErrorCode;
module.exports.ErrorResponse = ErrorResponse;
module.exports.CheckBody = CheckBody;
module.exports.SystemLog = SystemLog;
module.exports.SendMail = Mailer.SendMail;