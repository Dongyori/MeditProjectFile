'use strict';
const express = require('express');
const sync = require('sync');
const router = express.Router();
const startUP = require('../public/javascripts/Common/StartUP');
const bodyparser = require('body-parser');
const DomParser = require('dom-parser');
//const mysql = require('../public/javascripts/Common/DB');

// 시작, 끝에서 로그
//  startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
//  startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));

//async function (connection, result_array, query_string, save = true);
//{
//    try
//    {
//        const data = connection.query(query_string);
//        if (save == true)
//            result_array.data = data;
//        return true;
//    }
//    catch (err)
//    {
//        result_array.resultCode = err.code;
//        result_array.message = err.message;
//        return false;
//    }
//}


/* GET home page. */
router.get('/', function (req, res)
{
    res.render('index', { title: 'Express' });
});

/* POST home page. */
router.post('/', function (req, res)
{
    res.render('index', { title: 'Express' });
});

router.post('/login', async function (req, res)
{
    startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));

    // res로 응답할 내용 초기세팅
    let result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    // post로 받은 데이터중 필수로 있어야 하는것 체크
    const check = await startUP.CheckBody(req.body, ['email', 'password']);
    if (check != true)
    {
        // resultCode에 응답코드를 남긴다
        // ResultCode에 정의한 정수값을 사용할지 string자체를 담을지 결정해야함
        result_array.resultCode = check;
        res.send(result_array);
        return;
    }

    // 동기 DB
    const connection = startUP.DB.sync();

    const query_string = `SELECT accountid, email, position FROM account WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;

    // 동기 쿼리
    try
    {
        var query_result = connection.query(query_string);
        if (query_result.length != 0)
            result_array.data = query_result;
        else
            result_array.resultCode = 'NOT EXIST EMAIL';
    }
    catch (err)
    {
        result_array.resultCode = err.code;
        result_array.errmessage = err.message;
    }
    res.send(result_array);
    startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
});

router.post('/account/create_account', async function (req, res)
{
    // 로그 
    startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
    // res로 응답할 내용 초기세팅
    let result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    // post로 받은 데이터중 필수로 있어야 하는것 체크
    const check = await startUP.CheckBody(req.body, ['email', 'password', 'position']);
    if (check != true)
    {
        // resultCode에 응답코드를 남긴다
        // ResultCode에 정의한 정수값을 사용할지 string자체를 담을지 결정해야함
        result_array.resultCode = check;
        res.send(result_array);
        return;
    }
    // 동기 DB
    const connection = startUP.DB.sync();

    // 쿼리 생성
    const table_string = '`account`(`email`,`password`, `position`)';
    const value_string = `('${req.body.email}', '${req.body.password}', ${req.body.position})`;
    const query_string = `INSERT INTO ${table_string} VALUES ${value_string}`;

    // 동기 쿼리
    try
    {
        connection.query(query_string);
        // auto increment값 가져오기
        // 연결이 끊어지지 않았다면 반드시 성공
        const result_ai = connection.query('SELECT LAST_INSERT_ID() AS AI');
        result_array.accountid = result_ai[0].AI;
    }
    catch (err)
    {
        switch (err.code)
        {
            case 'ER_DUP_ENTRY':
                {

                break;
                }
            default:
                break;
        }
        result_array.resultCode = err.code;
        result_array.message = err.message;
    }
    // 응답
    res.send(result_array);
    // 로그
    startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
});

router.post('/account/select_account', async function (req, res)
{
    // 로그 
    startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
    // res로 응답할 내용 초기세팅
    let result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    // 동기 DB
    const connection = startUP.DB.sync();

    // 쿼리 생성
    const table_string = '`account`';
    const query_string = `SELECT accountid, email, position FROM ${table_string}`;

    // 동기 쿼리
    try
    {
        var query_result = connection.query(query_string);
        result_array.data = query_result;
    }
    catch (err)
    {
        result_array.resultCode = err.code;
        result_array.errmessage = err.message;
    }
    // 응답
    res.send(result_array);
    // 로그
    startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
});

router.post('/account/update_account', async function (req, res)
{
    // 로그 
    startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
    // res로 응답할 내용 초기세팅
    let result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    // post로 받은 데이터중 필수로 있어야 하는것 체크
    const check = await startUP.CheckBody(req.body, ['accountid']);
    if (check != true)
    {
        result_array.resultCode = check;
        res.send(result_array);
        return;
    }

    const connection = startUP.DB.sync();

    var columns = connection.query("show full columns from `account`");

    const table_string = '`account`';
    let update_string = '';
    const where_string = `accountid = ${req.body.accountid}`
    for (var column of columns)
    {
        if (column.Field == 'accountid')
            continue;
        // req에 있는경우
        if (req.body[column.Field] != null)
        {
            update_string += `${column.Field} = `
            if (column.Type == 'int(11)' || column.Type == 'bigint(20)' || column.Type == 'tinyint(4)')
                update_string += `${req.body[column.Field]}, `;
            else
                update_string += `'${req.body[column.Field]}', `;
        }
    }

    // 끝 (, ) 제거
    update_string = update_string.substr(0, update_string.length - 2);
    const query_string = `UPDATE ${table_string} SET ${update_string} WHERE ${where_string}`;

    try
    {
        connection.query(query_string);
    }
    catch (err)
    {
        result_array.resultCode = err.code;
        result_array.errmessage = err.message;
    }
    res.send(result_array);
    startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));

});

router.post('/project/create_project', async function (req, res)
{
    startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
    // res로 응답할 내용 초기세팅
    let result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    // post로 받은 데이터중 필수로 있어야 하는것 체크
    const check = await startUP.CheckBody(req.body, ['projectname']);
    if (check != true)
    {
        // resultCode에 응답코드를 남긴다
        // ResultCode에 정의한 정수값을 사용할지 string자체를 담을지 결정해야함
        result_array.resultCode = check;
        res.send(result_array);
        return;
    }

    // 동기 DB
    const connection = startUP.DB.sync();

    const columns = connection.query("show full columns from `project`");

    // 쿼리 생성을 간편하게 하기위한 초기 subject
    let table_string = 'project(`projectname`';
    let value_string = `('${req.body.projectname}'`;

    // 컬럼 목록을 순회
    for (let column of columns)
    {
        // 쿼리생성을 간편하게 하기위한 코드 -- (,) 처리
        if (column.Field == 'projectname')
            continue;

        // 컬럼중 post로 받은게 있다면 쿼리에 추가
        if (req.body[column.Field] != null)
        {
            table_string += `, \`${column.Field}\``;
            if (column.Type == 'int(11)' || column.Type == 'bigint(20)' || column.Type == 'tinyint(4)')
                value_string += `, ${req.body[column.Field]}`;
            else
                value_string += `, '${req.body[column.Field]}'`;
        }
    }

    // 쿼리 마지막
    table_string += ')';
    value_string += ')';
    const query_string = `INSERT INTO ${table_string} VALUES ${value_string}`;

    try
    {
        connection.query(query_string);
        // auto increment 값 가져오기 (projectid)
        const result_ai = connection.query("SELECT LAST_INSERT_ID() AS AI");
        result_array.projectid = result_ai[0].AI;
    }
    catch (err)
    {
        result_array.resultCode = err.code;
        result_array.errmessage = err.message;
    }
    res.send(result_array);
    startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
});

router.post('/project/select_project', async function (req, res)
{
    startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
    // res로 응답할 내용 초기세팅
    let result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    // 동기 DB
    const connection = startUP.DB.sync();

    const table_string = 'project';
    const query_string = `SELECT * FROM ${table_string}`;

    try
    {
        var query_result = connection.query(query_string);
        result_array.data = query_result;
    }
    catch (err)
    {
        result_array.resultCode = err.code;
        result_array.message = err.message;
    }

    res.send(result_array);
    startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
});

router.post('/project/delete_project', async function (req, res)
{
    startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
    // res로 응답할 내용 초기세팅
    let result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    const check = await startUP.CheckBody(req.body, ['projectid']);
    if (check != true)
    {
        result_array.resultCode = check;
        res.send(result_array);
        return;
    }

    // 동기 DB
    const connection = startUP.DB.sync();

    const query_string = `DELETE FROM project WHERE projectid = ${req.body.projectid}`;

    try
    {
        connection.query(query_string);
    }
    catch (err)
    {
        result_array.resultCode = err.code; 
        result_array.message = err.message; 
    }

    res.send(result_array);
    startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
});
// 작업중
router.post('/projectver/create_projectver', async function (req, res)
{

});
// 작업중
router.post('/projectver/select_projectver', async function (req, res)
{

});
// 작업중
router.post('/projectver/delete_projectver', async function (req, res)
{

});

router.post('/issue/create_issue', async function (req, res) 
{
    // 로그
    startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
    // res로 응답할 내용 초기세팅
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    // post로 받은 데이터중 필수로 있어야 하는것 체크
    const check = await startUP.CheckBody(req.body, ['email', 'subject', 'type', 'priority']);
    if (check != true)
    {
        result_array.resultCode = check;
        res.send(result_array);
        return;
    }

    // DB 연결
    var connection = startUP.DB.sync();

    // DB issue 테이블의 컬럼 목록을 가져와 insert문을 생성한다
    // 이렇게 하면 컬럼이 추가되도 이부분을 수정하지 않아도 됨
    var columns = connection.query("show full columns from `issue`");

    // 쿼리 생성을 간편하게 하기위한 초기 subject
    var table_string = "issue(`subject`";
    var value_string = `('${req.body.subject}'`;

    // 컬럼 목록을 순회
    for (let column of columns)
    {
        // 쿼리생성을 간편하게 하기위한 코드 -- (,) 처리
        if (column.Field == 'subject')
            continue;

        // creator만 별도로 email로 처리
        if (column.Field == 'creator')
        {
            table_string += `, \`${column.Field}\``;
            value_string += `, '${req.body.email}'`;
            continue;
        }

        // 컬럼중 post로 받은게 있다면 쿼리에 추가
        if (req.body[column.Field] != null)
        {
            table_string += `, \`${column.Field}\``;
            if (column.Type == 'int(11)')
                value_string += `, ${req.body[column.Field]}`;
            else
                value_string += `, '${req.body[column.Field]}'`;
        }
    }
    // 쿼리 마지막
    table_string += ", `status`)";
    value_string += `, 1)`;

    const query_string = `INSERT INTO ${table_string} VALUES ${value_string}`;

    try
    {
        connection.query(query_string);
        // auto increment 값 가져오기 (issueid)
        const result_ai = connection.query("SELECT LAST_INSERT_ID() AS AI");
        result_array.issueid = result_ai[0].AI;
    }
    catch (err)
    {
        result_array.resultCode = err.code;
        result_array.errmessage = err.message;
    }
    res.send(result_array);
    startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
});

router.post('/issue/select_issue', async function (req, res)
{
    startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    const check = await startUP.CheckBody(req.body, ['email']);
    if (check != true)
    {
        result_array.resultCode = check;
        res.send(result_array);
        return;
    }

    var connection = mysql.sync();

    const table_string = '`issue`';
    const where_string_creat = `\`creator\` = ${req.body.email}`;
    const where_string_assign = `\`assignor\` = ${req.body.assginor}`;
    const query_string_creat = `SELECT * FROM ${table_string} WHERE ${where_string_creat}`;
    const query_string_assign = `SELECT * FROM ${table_string} WHERE ${where_string_assign}`;

    try
    {
        var query_result_creat = connection.query(query_string_creat);
        var query_result_assign = connection.query(query_string_assign);
        result_array.data_creat = query_result_creat;
        result_array.data_assign = query_result_assign;
    }
    catch (err)
    {
        result_array.resultCode = err.code;
        result_array.errmessage = err.message;
    }
    res.send(result_array);
    startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
});

router.post('/issue/update_issue', async function (req, res)
{
    startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    // 필수 값 체크
    const check = await startUP.CheckBody(req.body, ['issueid']);
    if (check != true)
    {
        result_array.resultCode = check;
        res.send(result_array);
        return;
    }

    var connection = mysql.sync();
    var columns = connection.query("show full columns from `issue`");
    
    // update set where
    const table_string = '`issue`';
    let update_string = '';
    const where_string = `issueid = ${req.body.issueid}`
    // 컬럼 목록을 순회
    for (let column of columns)
    {
        // req에 있는경우
        if (req.body[column.Field] != null)
        {
            if (column.Field == 'issueid')
                continue;
            update_string += `${column.Field} = ` 
            if (column.Type == 'int(11)')
                update_string += `${req.body[column.Field]}, `;
            else
                update_string += `'${req.body[column.Field]}', `;
        }
    }

    // 끝 (, ) 제거
    update_string = update_string.substr(0, update_string.length - 2);

    var query_string = `UPDATE ${table_string} SET ${update_string} WHERE ${where_string}`;

    try
    {
        var update_result = connection.query(query_string);
        result_array.issueid = req.body.issueid;
    }
    catch (err)
    {
        result_array.resultCode = err.code;
        result_array.errmessage = err.message;
    }
    res.send(result_array);
    startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
});

router.post('/translate/import_data', async function (req, res)
{
    startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    var check = await startUP.CheckBody(req.body, ['projectid', 'majorver', 'minorver', 'type', 'language']);
    if (check != true)
    {
        switch (check)
        {
            case 'email':
                res.send(startUP.ErrorResponse(result_array, startUP.ErrorCode.AUTH_EMAIL_ERROR));
                break;
            case 'majorver':
                res.send(startUP.ErrorResponse(result_array, startUP.ErrorCode.RESULT_MAJORVER_ERROR));
                break;
            case 'minorver':
                res.send(startUP.ErrorResponse(result_array, startUP.ErrorCode.RESULT_MINORVER_ERROR));
                break;
            case 'type':
                res.send(startUP.ErrorResponse(result_array, startUP.ErrorCode.FILE_TYPE_ERROR));
                break;
            case 'language':
                res.send(startUP.ErrorResponse(result_array, startUP.ErrorCode.LANGUAGE_ERROR));
                break;
            default:
        }
        return;
    }

    var connection = mysql.sync();
    var count = 0;
    switch (req.body.type)
    {
        case 'app':
            {
                const xml_js = require('xml-js');
                const data = xml_js.xml2js(req.body.data, { compact: true, space: 4 });
                
                for (let item of data.Translation.String)
                {
                    const project_data = connection.query(`SELECT * FROM project WHERE projectid = ${req.body.projectid}`);
                    const tag = item._attributes.ID;
                    const original = item.Original._text;
                    const translated = item.Translated._text;

                    const table_string = `translate_data_${projectname}` + '(`tag`, `original`, `translated`, `language`, `majorver`, `minorver`)'; 
                    const value_string = `('${tag}', '${original}', '${translated}', '${req.body.language}', ${req.body.majorver}, ${req.body.minorver})`;
                    const query_string = `INSERT INTO ${table_string} VALUES ${value_string}` + `ON DUPLICATE KEY UPDATE original = '${original}', translated = '${translated}'`;
                    try
                    {
                        await connection.query(query_string)
                    }
                    catch(err)
                    {
                        if (err.code == 'ER_NO_SUCH_TABLE')
                        {
                            connection.query(`CREATE TABLE translate_data_${req.body.majorver}_${req.body.minorver} LIKE translate_data_template`);
                            connection.query(query_string);
                        }
                        else
                        {
                            SystemLog(req.url, req.ip, err.message);
                            count--;
                        }
                    }
                    count++;
                }
                break;
            }
        case 'web':
            {
                var import_data = JSON.parse(req.body.data);
                break;
            }
        default:
            result_array.resultCode = FILE_TYPE_ERROR;
    }
    result_array.count = count;
    res.send(result_array);
    startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
});

router.post('/translate/export_data', async function (req, res)
{
    startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    // 필수 값 체크
    const check = await startUP.CheckBody(req.body, ['majorver', 'minorver', 'type', 'language']);
    if (check != true)
    {
        result_array.resultCode = check;
        res.send(result_array);
        return;
    }

    var table_string = `translate_data_${req.body.majorver}_${req.body.minorver}`;
    var where_string = `language = '${req.body.language}'`
    var query_string = `SELECT * FROM ${table_string} WHERE ${where_string}`;

    // DB 연결
    var connection = mysql.sync();
    connection .query(query_string);

    switch (req.body.type)
    {
        case 'xml':

            break;

    }
    res.send(result_array);
    startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
});

router.post('/issue/comment/create_comment', async function (req, res)
{
    startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
    let result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    const check = await startUP.CheckBody(req.body, ['accountid', 'issueid']);
    if (check != true)
    {
        switch (check)
        {
            case 'email':
                res.send(startUP.ErrorResponse(result_array, startUP.ErrorCode.AUTH_EMAIL_ERROR));
                break;
            case 'issueid':
                res.send(startUP.ErrorResponse(result_array, startUP.ErrorCode.ISSUE_CREATE_COMMENT_issueid_ERROR));
                break;
            default:

        }
        return;
    }

    const connection = startUP.DB.sync();

    const insert_string = `issue_comment(\`issueid\`, \`time\`, \`accountid\`, \`comment\`)`;
    const values_string = `(${req.body.issueid}, NOW(), ${req.body.accountid}, '${req.body.comment}')`;
    const query_string = `INSERT INTO ${insert_string} VALUES ${values_string}`;

    try
    {
        connection.query(query_string);
        var result_ai = connection.query('SELECT LAST_INSERT_ID() AS AI');
        result_array.commentid = result_ai[0].AI;
    }
    catch (err)
    {
        result_array.resultCode = err.code;
        result_array.message = err.message;
    }
    res.send(result_array);
    startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
});

router.post('/issue/comment/select_comment', async function (req, res)
{
    startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
    let result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    const check = await startUP.CheckBody(req.body, ['issueid']);
    if (check != true)
    {
        switch (check)
        {
            case 'email':
                res.send(startUP.ErrorResponse(result_array, startUP.ErrorCode.AUTH_EMAIL_ERROR));
                break;
            case 'issueid':
                res.send(startUP.ErrorResponse(result_array, startUP.ErrorCode.ISSUE_SELECT_COMMENT_issueid_ERROR));
                break;
            default:

        }
        return;
    }

    const connection = startUP.DB.sync();

    const table_string = '`issue_comment`';
    const where_string = `issueid = ${req.body.issueid}`;
    const query_string = `SELECT * FROM ${table_string} WHERE ${where_string}`;
    try
    {
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
});

router.post('/issue/comment/update_comment', async function (req, res)
{
    startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
    let result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;
    const check = await startUP.CheckBody(req.body, ['commentid']);
    if (check != true)
    {
        switch (check)
        {
            case 'accountid':
                res.send(startUP.ErrorResponse(result_array, startUP.ErrorCode.AUTH_ACCOUNTNO_ERROR));
                break;
            case 'commentid':
                res.send(startUP.ErrorResponse(result_array, startUP.ErrorCode.ISSUE_UPDATE_COMMENT_commentid_ERROR));
                break;
            default:

        }
        return;
    }

    const connection = startUP.DB.sync();
    const result = connection.query(`SELECT * FROM \`issue_comment\` WHERE commentid = ${req.body.commentid}`);

    if (result == null)
        res.send(startUP.ErrorResponse(result_array, startUP.ErrorCode.ISSUE_UPDATE_COMMENT_NOT_EXIST_ERROR));

    const table_string = '`issue_comment`';
    let update_string = ``;
    const where_string = `commentid = ${req.body.commentid}`;

    const columns = connection.query('show full columns from `issue_comment`');
    for (let column of columns)
    {
        // req에 있는경우
        if (req.body[column.Field] != null)
        {
            if (column.Field == 'accountid')
                continue;
            if (column.Field == 'commentid')
                continue;
            update_string += `${column.Field} = `;
            if (column.Type == 'int(11)')
                update_string += `${req.body[column.Field]}, `;
            else
                update_string += `'${req.body[column.Field]}', `;
        }
    }

    update_string = update_string.substr(0, update_string.length - 2);
    const query_string = `UPDATE ${table_string} SET ${update_string} WHERE ${where_string}`;

    try
    {
        connection.query(query_string);
    }
    catch (err)
    {
        result_array.resultCode = err.code;
        result_array.message = err.message;
    }
    res.send(result_array);
    startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
});
// 작업중
router.post('/issue/comment/delete_comment', async function (req, res)
{
});

router.get('/logview', async function (req, res)
{
    const connection = startUP.DB.sync();
    try
    {
        const date = new Date().yyyymm();
        var logdata = connection.query(`SELECT * FROM systemlog_${date} ORDER BY \`no\` DESC LIMIT 100`);
    }
    catch (err)
    {
        return;
    }
    //res.render('logview', { data: logdata })

    let result_object = Object();
    result_object.data = logdata;
    res.send(result_object);

});

router.post('/test', async function (req, res)
{
    res.send(JSON.stringify(req.body));
}); 
module.exports = router;
