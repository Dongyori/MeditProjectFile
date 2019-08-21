// Issue 관련 API

const startUP = require('../../public/javascripts/Common/StartUP');

/*----------------------------------------------------------*/
// CreateIssue
// 설명 : 이슈를 생성하는 API함수
// 입력 : subject, projectid, creater, assignor, type, priority, description, majorver, minorver, resourcetype, link 
// 리턴 : result_array
//       {
//           resultCode = 0 (성공) or 실패 데이터
//       }
/*----------------*////////////////////////*----------------*/
exports.CreateIssue = async function (req, res) 
{
    try
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

        req.body['deadline'] = req.body['deadline'].replace(/\//gi, '-');

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
    connection.dispose();
};

/*----------------------------------------------------------*/
// SelectIssue
// 설명 : 이슈를 조회하는 API함수
// 입력 : accountid
// 리턴 : result_array
//       {
//           resultCode
//           data :
//           [
//               {
//                  subject,
//                  projectid,
//                  creater,
//                  assignor,
//                  type,
//                  priority,
//                  description,
//                  majorver,
//                  minorver,
//                  resourcetype,
//                  link,
//                  stasus,
//                  createTime,
//                  startTime,
//                  deadline,
//                  EndTime,
//                  reopenTime
//               },
//           ]
//       }
/*----------------*////////////////////////*----------------*/
exports.SelectIssue = async function (req, res)
{
    try
    {
        startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
        var result_array = Object();
        result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

        const check = await startUP.CheckBody(req.body, ['accountid']);
        if (check != true)
        {
            result_array.resultCode = check;
            res.send(result_array);
            return;
        }

        var connection = startUP.DB.sync();

        const table_string = '`issue` LEFT JOIN `account` ON issue.assignor = account.accountid';
        const where_string_create = `\`creator\` = ${req.body.accountid}`;
        const where_string_assign = `\`assignor\` = ${req.body.accountid}`;
        const select_string = 'issueid, subject, projectid, creator, assignor, type, priority, description, majorver, minorver, language, resourcetype, link, status, createtime, starttime, deadline, endtime, reopentime, email';
        const query_string_create = `SELECT ${select_string} FROM ${table_string} WHERE ${where_string_create}`;
        const query_string_assign = `SELECT ${select_string} FROM ${table_string} WHERE ${where_string_assign}`;


        var query_result_create = connection.query(query_string_create);
        var query_result_assign = connection.query(query_string_assign);
        result_array.data_create = query_result_create;
        result_array.data_assign = query_result_assign;
    }
    catch (err)
    {
        result_array.resultCode = err.code;
        result_array.errmessage = err.message;
    }
    res.send(result_array);
    startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
    connection.dispose();
};


/*----------------------------------------------------------*/
// UpdateIssue
// 설명 : 이슈를 수정하는 API함수
// 입력 : issueid
// 리턴 : result_array
//       {
//           resultCode = 0 (성공) or 실패 데이터
//       }
/*----------------*////////////////////////*----------------*/
exports.UpdateIssue = async function (req, res)
{
    try
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

        var connection = startUP.DB.sync();
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


        connection.query(query_string);
        result_array.issueid = req.body.issueid;
    }
    catch (err)
    {
        result_array.resultCode = err.code;
        result_array.errmessage = err.message;
    }
    res.send(result_array);
    startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
    connection.dispose();
};


/*----------------------------------------------------------*/
// StartIssue
// 설명 : 이슈를 시작하는 API함수
// 입력 : issueid
// 리턴 : result_array
//       {
//           resultCode = 0 (성공) or 실패 데이터
//       }
/*----------------*////////////////////////*----------------*/
exports.StartIssue = async function (req, res)
{
    try
    {
        startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
        var result_array = Object();
        result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

        const check = await startUP.CheckBody(req.body, ['issueid']);
        if (check != true)
        {
            result_array.resultCode = check;
            res.send(result_array);
            return;
        }
        var connection = startUP.DB.sync();

        const table_string = '`issue`';
        let update_string = '`status` = 1 , `starttime` = CURRENT_TIME()';
        const where_string = `issueid = ${req.body.issueid}`

        var query_string = `UPDATE ${table_string} SET ${update_string} WHERE ${where_string}`;
        connection.query(query_string);
    }
    catch (err)
    {
        result_array.resultCode = err.code;
        result_array.errmessage = err.message;
    }
   

    res.send(result_array);
};


/*----------------------------------------------------------*/
// resolveIssue
// 설명 : 이슈를 완료하는 API함수
// 입력 : issueid
// 리턴 : result_array
//       {
//           resultCode = 0 (성공) or 실패 데이터
//       }
/*----------------*////////////////////////*----------------*/
exports.resolveIssue = async function (req, res)
{
    try
    {
    startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    const check = await startUP.CheckBody(req.body, ['issueid']);
    if (check != true)
    {
        result_array.resultCode = check;
        res.send(result_array);
        return;
    }
    var connection = startUP.DB.sync();

    const table_string = '`issue`';
    let update_string = '`status` = 2 , `EndTime` = CURRENT_TIME()';
    const where_string = `issueid = ${req.body.issueid}`

    var query_string = `UPDATE ${table_string} SET ${update_string} WHERE ${where_string}`;
    connection.query(query_string);
    }
    catch (err)
    {
        result_array.resultCode = err.code;
        result_array.errmessage = err.message;
    }
    res.send(result_array);
};


/*----------------------------------------------------------*/
// reopenIssue
// 설명 : 이슈를 재시작하는 API함수
// 입력 : issueid
// 리턴 : result_array
//       {
//           resultCode = 0 (성공) or 실패 데이터
//       }
/*----------------*////////////////////////*----------------*/
exports.reopenIssue = async function (req, res)
{
    try
    {
    startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    const check = await startUP.CheckBody(req.body, ['issueid']);
    if (check != true)
    {
        result_array.resultCode = check;
        res.send(result_array);
        return;
    }
    var connection = startUP.DB.sync();

    const table_string = '`issue`';
    let update_string = '`status` = 3 , `reopenTime` = CURRENT_TIME()';
    const where_string = `issueid = ${req.body.issueid}`

    var query_string = `UPDATE ${table_string} SET ${update_string} WHERE ${where_string}`;
    connection.query(query_string);
     }
    catch (err)
    {
        result_array.resultCode = err.code;
        result_array.errmessage = err.message;
    }
    res.send(result_array);
};