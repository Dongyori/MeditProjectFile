// project 관련 API

const startUP = require('../../public/javascripts/Common/StartUP');

/*----------------------------------------------------------*/
// CreateProject
// 설명 : 프로젝트를 생성하는 API함수
// 입력 : projectname
// 리턴 : result_array
//       {
//           resultCode = 0 (성공) or 실패 데이터
//       }
/*----------------*////////////////////////*----------------*/
exports.CreateProject = async function (req, res)
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
};

/*----------------------------------------------------------*/
// SelectProject
// 설명 : 프로젝트를 목록을 조회하는 API함수
// 입력 :
// 리턴 : result_array
//       {
//           resultCode
//           data :
//           [
//               {
//                  projectid,
//                  projectname
//               },
//           ]
//       }
/*----------------*////////////////////////*----------------*/
exports.SelectProject = async function (req, res)
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
};

/*----------------------------------------------------------*/
// DeleteProject
// 설명 : 프로젝트를 삭제하는 API함수
// 입력 : projectid
// 리턴 : result_array
//      {
//          resultCode = 0 (성공) or 실패 데이터
//      }
/*----------------*////////////////////////*----------------*/
exports.DeleteProject = async function (req, res)
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
};

/*----------------------------------------------------------*/
// CreateVersion
// 설명 : 버전을 생성하는 API함수
// 입력 : projectid, majorver, minorver, language
// 리턴 : result_array
//       {
//           resultCode = 0 (성공) or 실패 데이터
//       }
/*----------------*////////////////////////*----------------*/
exports.CreateVersion = async function (req, res)
{
    startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));

    let result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    // post로 받은 데이터중 필수로 있어야 하는것 체크
    const check = await startUP.CheckBody(req.body, ['projectid', 'majorver', 'minorver', 'language']);
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

    const table_string = `project_version(\`projectid\`, \`majorver\`, \`minorver\`, \`language\`)`;
    const value_string = `(${req.body.projectid}, ${req.body.majorver}, ${req.body.minorver}, '${req.body.language}')`;
    const query_string = `INSERT INTO ${table_string} VALUES ${value_string}`;

    try
    {
        connection.query(query_string);
    }
    catch (err)
    {
        result_array.resultCode = err.code;
        result_array.message = err.message;
    }

    res.send(result_array);S
    startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
};

/*----------------------------------------------------------*/
// SelectVersion
// 설명 : 버전을 조회하는 API함수
// 입력 : projectid
// 리턴 : result_array
//       {
//           resultCode
//           data :
//           [
//               {
//                  versionid,
//                  majorver,
//                  minorver
//               },
//           ]
//       }
/*----------------*////////////////////////*----------------*/
exports.SelectVersion = async function (req, res)
{
    startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));

    let result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    // post로 받은 데이터중 필수로 있어야 하는것 체크
    const check = await startUP.CheckBody(req.body, ['projectid']);
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

    const table_string = `project_version`;
    const where_string = `projectid = ${req.body.projectid}`;
    const query_string = `SELECT DISTINCT majorver, minorver FROM ${table_string} WHERE ${where_string}`;

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
};

/*----------------------------------------------------------*/
// SelectLanguage
// 설명 : 버전을 조회하는 API함수
// 입력 : projectid, majorver, minorver
// 리턴 : result_array
//       {
//           resultCode
//           data :
//           [
//               {
//                  language
//               },
//           ]
//       }
/*----------------*////////////////////////*----------------*/
exports.SelectLanguage = async function (req, res)
{
    startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));

    let result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    // post로 받은 데이터중 필수로 있어야 하는것 체크
    const check = await startUP.CheckBody(req.body, ['projectid'], ['majorver'], ['minorver']);
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

    const table_string = `project_version`;
    const where_string = `projectid = ${req.body.projectid} AND majorver = ${req.body.majorver} AND minorver = ${req.body.minorver}`;
    const query_string = `SELECT language FROM ${table_string} WHERE ${where_string}`;

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
};

/*----------------------------------------------------------*/
// DeleteVersion
// 설명 : 버전을 삭제하는 API함수
// 입력 : projectid, majorver, minorver, language
// 리턴 : result_array
//       {
//           resultCode = 0 (성공) or 실패 데이터
//       }
/*----------------*////////////////////////*----------------*/
exports.DeleteVersion = async function (req, res)
{
    startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));

    let result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    // post로 받은 데이터중 필수로 있어야 하는것 체크
    const check = await startUP.CheckBody(req.body, ['projectid', 'majorver', 'minorver', 'language']);
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

    const table_string = `project_version`;
    const where_string = `projectid = ${req.body.projectid} AND majorver = ${req.body.majorver} AND minorver = ${$req.body.minorver} AND language ;${req.body.language}'`;
    const query_string = `DELETE FROM ${table_string} WHERE ${where_string}`;

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
};