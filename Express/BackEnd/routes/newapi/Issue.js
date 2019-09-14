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
        const check = await startUP.CheckBody(req.body, ['email', 'projectid', 'subject', 'type', 'priority', 'majorver', 'minorver', 'hotfixver', 'buildver', 'language', 'resourcetype', 'deadline']);
        if (check != true)
        {
            result_array.resultCode = check;
            res.send(result_array);
            return;
        }

        req.body['deadline'] = req.body['deadline'].replace(/\//gi, '-');

        // DB 연결
        var connection = startUP.Connection;

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
                {
                    req.body[column.Field] = req.body[column.Field].replace(/'/gi, "''");
                    value_string += `, '${req.body[column.Field]}'`;
                }
            }
        }

        const revision_subquery_string = `(SELECT IFNULL(MAX(revisionver), 0) AS revisionver FROM project_version WHERE projectid = ${req.body.projectid} AND resourcetype = '${req.body.resourcetype}' AND majorver = ${req.body.majorver} AND minorver = ${req.body.minorver} AND hotfixver = ${req.body.hotfixver} AND buildver = ${req.body.buildver})`;

        // 쿼리 마지막
        table_string += `, \`status\`, \`revisionver\`)`;
        value_string += `, 0, ${revision_subquery_string})`;

        const query_string = `INSERT INTO ${table_string} VALUES ${value_string}`;
        var revisionver = connection.query(revision_subquery_string)[0];

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

    // mail for assignor
    const email = connection.query(`SELECT email FROM account WHERE accountid = ${req.body.assignor}`)[0].email;
    const projectname = connection.query(`SELECT projectname FROM project where projectid = ${req.body.projectid}`)[0].projectname;
    //console.log(projectname);
    var option =
    {
        to: `${email}`,
        subject: `[Medit Ling] 이슈 ${req.body.subject}가 생성되었습니다`,
        text: `Project : ${projectname}\nVerSion : ${req.body.majorver}.${req.body.minorver}.${req.body.hotfixver}.${req.body.buildver} \nLanguage : ${req.body.language}\n`
    }
    // mail for reference
    if (typeof (req.body.reference) != 'undefined')
    {
        option.to += `, ${req.body.reference}`;
    }
    startUP.SendMail(option);
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
//                  hotfixver,
//                  buildver,
//                  revisionver,
//                  resourcetype,
//                  link,
//                  stasus,
//                  createTime,
//                  startTime,
//                  deadline,
//                  EndTime,
//                  reopenTime
//                  transid_min
//                  transid_max
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

        var connection = startUP.Connection;

        const table_string = '`issue` LEFT JOIN (SELECT accountid, email, position FROM `account`) temp ON issue.assignor = temp.accountid';
        const where_string_create = `\`creator\` = ${req.body.accountid}`;
        const where_string_assign = `\`assignor\` = ${req.body.accountid}`;
        //const select_string = 'issueid, subject, projectid, creator, assignor, type, priority, description, majorver, minorver, hotfixver, language, resourcetype AS `resource_type`, link, status, createtime, starttime, deadline, endtime, reopentime, email, transid_min, transid_max';
        const select_string = '*, resourcetype AS `resource_type`';
        const query_string_create = `SELECT ${select_string} FROM ${table_string} WHERE ${where_string_create} ORDER BY issueid DESC`;
        const query_string_assign = `SELECT ${select_string} FROM ${table_string} WHERE ${where_string_assign} ORDER BY deadline`;


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

        var connection = startUP.Connection;
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
                {
                    req.body[column.Field] = req.body[column.Field].replace(/'/gi, "''");
                    update_string += `'${req.body[column.Field]}', `;
                }
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

    // mail for assignor
    const email = connection.query(`SELECT email FROM account WHERE accountid = ${req.body.assignor}`)[0].email;
    var option =
    {
        to: `${email}`,
        subject: `이슈 ${req.body.subject}가 업데이트되었습니다`,
        text: `majorver : ${req.body.majorver}\nminorver : ${req.body.minorver}\nhotfixver : ${req.body.hotfixver}\n\ndeadline : ${req.body.deadline}`
    }
    // mail for reference
    if (typeof (req.body.reference) != 'undefined')
    {
        option.to += `, ${req.body.reference}`;
    }
    startUP.SendMail(option);
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
        var connection = startUP.Connection;

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

    // mail for assignor.
    const issue_info = connection.query(`SELECT * FROM issue WHERE issueid = ${req.body.issueid}`)[0];
    if (issue_info.length != 0)
    {
        const email = connection.query(`SELECT email FROM account WHERE accountid = ${issue_info.assignor}`)[0].email;
        var option =
        {
            to: `${email}`,
            subject: `이슈 ${issue_info.subject}가 Start상태가 되었습니다.`,
            text: `majorver : ${issue_info.majorver}\nminorver : ${issue_info.minorver}\nhotfixver : ${issue_info.hotfixver}\n\ndeadline :  ${issue_info.deadline}`
        }
        // mail for reference
        if (typeof (issue_info.reference) != 'undefined')
        {
            option.to += `, ${issue_info.reference}`;
        }
    }
    startUP.SendMail(option);
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
        var connection = startUP.Connection;

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

    // mail for assignor.
    const issue_info = connection.query(`SELECT * FROM issue WHERE issueid = ${req.body.issueid}`)[0];
    if (issue_info.length != 0)
    {
        const email = connection.query(`SELECT email FROM account WHERE accountid = ${issue_info.assignor}`)[0].email;
        var option =
        {
            to: `${email}`,
            subject: `이슈 ${issue_info.subject}가 Resolve상태가 되었습니다.`,
            text: `majorver : ${issue_info.majorver}\nminorver : ${issue_info.minorver}\nhotfixver : ${issue_info.hotfixver}\n\ndeadline :  ${issue_info.deadline}`
        }
        // mail for reference
        if (typeof (issue_info.reference) != 'undefined')
        {
            option.to += `, ${issue_info.reference}`;
        }
    }
    startUP.SendMail(option);
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
        var connection = startUP.Connection;

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

    // mail for assignor.
    const issue_info = connection.query(`SELECT * FROM issue WHERE issueid = ${req.body.issueid}`)[0];
    if (issue_info.length != 0)
    {
        const email = connection.query(`SELECT email FROM account WHERE accountid = ${issue_info.assignor}`)[0].email;
        var option =
        {
            to: `${email}`,
            subject: `이슈 ${issue_info.subject}가 Reopen상태가 되었습니다.`,
            text: `majorver : ${issue_info.majorver}\nminorver : ${issue_info.minorver}\nhotfixver : ${issue_info.hotfixver}\n\ndeadline :  ${issue_info.deadline}`
        }
        // mail for reference
        if (typeof (issue_info.reference) != 'undefined')
        {
            option.to += `, ${issue_info.reference}`;
        }
    }
    startUP.SendMail(option);
};