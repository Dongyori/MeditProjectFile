const DB = require('./DB');
const ErrorCode = require('./ResultCode');
const Fun = require('../function')

//DB.Connect();

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
function SystemLog(url, ip, message)
{
    const connection = DB.connection;
    var table_string = `systemlog_` + (new Date()).yyyymm();
    table_string += `(date, AccountNo, Action, Message)`

    if (message.length > 1000)
        message = message.substring(0, 1000);

    var values_string = `(NOW(), '${ip}', '${url}', '${message}')`;
    var query_string = `INSERT INTO ${table_string} VALUES ${values_string}`;
    connection.query(query_string,function (err, results, fields)
    {
        if (err)
        {
            connection.query(`CREATE TABLE ${table_string} LIKE systemlog_template`);
            connection.query(query_string);
        }
    });
}

Date.prototype.yyyymm = function ()
{
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString();
    return yyyy + (mm[1] ? mm : '0' + mm[0]);
}

module.exports.MakeValueString = Fun.MakeValueString;
module.exports.MakeJsObject = Fun.MakeJsObject;
module.exports.Query = DB.query;
module.exports.DB = DB;
module.exports.ErrorCode = ErrorCode;
module.exports.ErrorResponse = ErrorResponse;
module.exports.CheckBody = CheckBody;
module.exports.SystemLog = SystemLog;