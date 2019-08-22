// Comment 관련 API

const startUP = require('../../public/javascripts/Common/StartUP');

/*----------------------------------------------------------*/
// CreateComment
// 설명 : 댓글을 생성하는 API함수
// 입력 : accountid, issueid, comment
// 리턴 : result_array
//       {
//           resultCode = 0 (성공) or 실패 데이터
//       }
/*----------------*////////////////////////*----------------*/
exports.CreateComment = async function (req, res)
{
    try
    {
        startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
        var result_array = Object();
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

        const connection = startUP.Connection;

        const insert_string = `issue_comment(\`issueid\`, \`time\`, \`accountid\`, \`comment\`)`;
        const values_string = `(${req.body.issueid}, NOW(), ${req.body.accountid}, '${req.body.comment}')`;
        const query_string = `INSERT INTO ${insert_string} VALUES ${values_string}`;

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
};

/*----------------------------------------------------------*/
// SelectComment
// 설명 : 각 이슈별 댓글을 조회하는 API함수
// 입력 : issueid
// 리턴 : result_array
//       {
//           resultCode
//           data :
//           [
//               {
//                  commentid,
//                  accountid,
//                  time,
//                  comment
//               },
//               ...
//           ]
//       }
/*----------------*////////////////////////*----------------*/
exports.SelectComment = async function (req, res)
{
    try
    {
        startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
        var result_array = Object();
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

        const connection = startUP.Connection;

        const table_string = '`issue_comment`';
        const where_string = `issueid = ${req.body.issueid}`;
        const query_string = `SELECT * FROM ${table_string} WHERE ${where_string}`;
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
// UpdateComment
// 설명 : 댓글을 수정하는 API함수
// 입력 : commentid, accountid, ...
// 리턴 : result_array
//       {
//           resultCode = 0 (성공) or 실패 데이터
//       }
/*----------------*////////////////////////*----------------*/
exports.UpdateComment = async function (req, res)
{
    try
    {
        startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
        var result_array = Object();
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

        const connection = startUP.Connection;
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
// DeleteComment
// 설명 : 댓글을 삭제하는 API함수
// 입력 : commentid, accountid
// 리턴 : result_array
//       {
//           resultCode = 0 (성공) or 실패 데이터
//       }
/*----------------*////////////////////////*----------------*/
exports.DeleteComment = async function (req, res)
{
    try
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

        const connection = startUP.Connection;
        const result = connection.query(`SELECT * FROM \`issue_comment\` WHERE commentid = ${req.body.commentid}`);

        if (result == null)
            res.send(startUP.ErrorResponse(result_array, startUP.ErrorCode.ISSUE_UPDATE_COMMENT_NOT_EXIST_ERROR));

        const table_string = '`issue_comment`';
        const where_string = `commentid = ${req.body.commentid}`;

        const query_string = `DELETE FROM ${table_string} WHERE ${where_string}`;

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

