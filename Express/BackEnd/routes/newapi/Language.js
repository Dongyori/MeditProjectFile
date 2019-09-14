// Issue 관련 API

const startUP = require('../../public/javascripts/Common/StartUP');

/*----------------------------------------------------------*/
// AddLanguage
// 설명 : 언어를 추가하는 API함수
// 입력 : language
// 리턴 : result_array
//       {
//           resultCode
//       }
/*----------------*////////////////////////*----------------*/
exports.AddLanguage = async function (req, res)
{
    startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));

    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;
    try
    {
        // post로 받은 데이터중 필수로 있어야 하는것 체크
        const check = await startUP.CheckBody(req.body, ['language']);
        if (check != true)
        {
            // resultCode에 응답코드를 남긴다
            result_array.resultCode = check;
            res.send(result_array);
            return;
        }

        req.body.language = req.body.language.toLowerCase();

        // 동기 DB
        const connection = startUP.Connection;

        const table_string = `language(name)`;
        const value_string = `('${req.body.language}')`;
        const query_string = `INSERT INTO ${table_string} VALUES ${value_string}`;

        connection.query(query_string);
        }
    catch (err)
    {
        result_array.resultCode = err.code;
        result_array.message = err.message;
    }

    res.send(result_array);
    startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
}

/*----------------------------------------------------------*/
// SelectLanguage
// 설명 : 언어를 읽는 API함수
// 입력 : language
// 리턴 : result_array
//       {
//           resultCode
//           data
//           [
//              language, ....
//           ]   
//       }
/*----------------*////////////////////////*----------------*/
exports.SelectLanguage = async function (req, res)
{
    startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));

    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;
    try
    {
        // 동기 DB
        const connection = startUP.Connection;

        const table_string = `language`;
        const query_string = `SELECT * FROM ${table_string}`;

        const query_result = connection.query(query_string);
        result_array.data = query_result;
    }
    catch (err)
    {
        result_array.resultCode = err.code;
        result_array.message = err.message;
    }

    res.send(result_array);
    startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
}