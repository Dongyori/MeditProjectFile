// Account 관련 API

const startUP = require('../../public/javascripts/Common/StartUP');

/*----------------------------------------------------------*/
// LoginCheck
// 설명 : 계정이 실제 DB의 정보와 동일한지 확인
//        현재 별도의 인증데이터를 사용하지 않음
// 입력 : email, password
// 리턴 : result_array
//      {
//          resultCode = 0 (성공), email(email 없음), password(password없음)     
//      }
/*----------------*////////////////////////*----------------*/
exports.LoginCheck = async function (req, res)
{
    try
    {
        startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));

        // res로 응답할 내용 초기세팅
        var result_array = Object();
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
};

/*----------------------------------------------------------*/
// CreateAccount
// 설명 : 계정을 생성하는 API함수
// 입력 : email, password, position
// 리턴 : result_array
//      {
//          resultCode = 0, or 없는 데이터
//      }
/*----------------*////////////////////////*----------------*/
exports.CreateAccount = async function (req, res)
{
    try
    {
        // 로그 
        startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
        // res로 응답할 내용 초기세팅
        var result_array = Object();
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
}; 

/*----------------------------------------------------------*/
// SelectAccount
// 설명 : 계정목록을 조회하는 API함수
// 입력 : None
// 리턴 : result_array
//      {
//          resultCode
//          data :
//          [
//              {
//                  accountid,
//                  email,
//                  position
//              },
//              ...
//          ]
//      }
/*----------------*////////////////////////*----------------*/
exports.SelectAccount = async function (req, res)
{
    try
    {
        // 로그 
        startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
        // res로 응답할 내용 초기세팅
        var result_array = Object();
        result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

        // 동기 DB
        const connection = startUP.DB.sync();

        // 쿼리 생성
        const table_string = '`account`';
        const query_string = `SELECT accountid, email, position FROM ${table_string}`;

        // 동기 쿼리
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
};

/*----------------------------------------------------------*/
// UpdateAccount
// 설명 : 계정정보를 수정하는 API함수
// 입력 : accountid, ...
// 리턴 : result_array
//      {
//          resultCode
//      }
/*----------------*////////////////////////*----------------*/
exports.UpdateAccount = async function (req, res)
{
    try
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
        // account테이블의 컬럼과 입력받은 데이터중 둘다 있는 것만 Update쿼리로 추가
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

        connection.query(query_string);
    }
    catch (err)
    {
        result_array.resultCode = err.code;
        result_array.errmessage = err.message;
    }
    res.send(result_array);
    startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
};