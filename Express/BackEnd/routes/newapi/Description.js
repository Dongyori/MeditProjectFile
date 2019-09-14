const startUP = require('../../public/javascripts/Common/StartUP');



/*----------------------------------------------------------*/
// CreateDescription
// 설명 : Description을 추가하는 API함수
// 입력 : projectid, resourcetype, tree(web), transkey, majorver, minorver, hotfixver, buildver, language, type, content
// 리턴 : result_array
//       {
//           resultCode = 0 (성공) or 실패 데이터
//       }
/*----------------*////////////////////////*----------------*/
exports.CreateDescription = async function (req, res)
{
    startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    try
    {
        // 필수 값 체크
        const check = await startUP.CheckBody(req.body, ['projectid', 'majorver', 'minorver', 'hotfixver', 'buildver', 'resourcetype', 'description']);
        if (check != true)
        {
            result_array.resultCode = check;
            res.send(result_array);
            startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
            return;
        }

        const connection = startUP.Connection;

        // description 추가
        if (req.body.description.length != 0)
        {
            const description = req.body.description;
            let update_desciptioncount_query = '';
            switch (req.body.resourcetype)
            {
                case 'app':
                    {
                        const des_table_string = `transdata_description(projectid, resourcetype, majorver, minorver, hotfixver, buildver, type, transkey,  content, caption)`;
                        let des_value_string = '';
                        for (const item of description)
                        {
                            //item.transkey = item.transkey.replace(/'/gi, "''");
                            //item.content = item.content.replace(/'/gi, "''");
                            des_value_string += `(${req.body.projectid}, '${req.body.resourcetype}', ${req.body.majorver}, ${req.body.minorver}, ${req.body.hotfixver}, ${req.body.buildver}, '${item.type}', '${item.transkey}', '${item.content}', `;
                            if (typeof (item.caption) == 'undefined')
                                des_value_string += `NULL),\n`;
                            else
                            {
                                //item.caption = item.caption.replace(/'/gi, "''");
                                des_value_string += `'${item.caption}'),\n`;
                            }

                            update_desciptioncount_query += `UPDATE transdata_${req.body.projectid}_${req.body.resourcetype} SET descriptioncount = descriptioncount + 1 WHERE transkey = '${item.transkey}' AND majorver = ${req.body.majorver} AND minorver = ${req.body.minorver} AND hotfixver = ${req.body.hotfixver} AND buildver = ${req.body.buildver};`;
                        } 
                        des_value_string = des_value_string.substring(0, des_value_string.length - 2);
                        const query_string = `INSERT INTO ${des_table_string} VALUES ${des_value_string}`;
                        connection.query(query_string);
                        connection.query(update_desciptioncount_query);
                        break;
                    }
                case 'web':
                    {
                        // description map
                        const des_table_string = `transdata_description(projectid, resourcetype, majorver, minorver, hotfixver, buildver, type, transkey,  content, tree, caption)`;
                        let des_value_string = '';
                        for (const item of description)
                        {
                            //item.transkey = item.transkey.replace(/'/gi, "''");
                            //item.content = item.content.replace(/'/gi, "''");
                            des_value_string += `(${req.body.projectid}, '${req.body.resourcetype}', ${req.body.majorver}, ${req.body.minorver}, ${req.body.hotfixver}, ${req.body.buildver}, '${item.type}', '${item.transkey}', '${item.content}', '${item.tree}', `;
                            if (item.caption == null)
                                des_value_string += `NULL),\n`;
                            else
                            {
                                //item.caption = item.caption.replace(/'/gi, "''");
                                des_value_string += `'${item.caption}'),\n`;
                            }
                            update_desciptioncount_query += `UPDATE transdata_${req.body.projectid}_${req.body.resourcetype} SET descriptioncount = descriptioncount + 1 WHERE transkey = '${item.transkey}' AND tree = '${item.tree}' AND majorver = ${req.body.majorver} AND minorver = ${req.body.minorver} AND hotfixver = ${req.body.hotfixver} AND buildver = ${req.body.buildver};`
                        } 
                        des_value_string = des_value_string.substring(0, des_value_string.length - 2);
                        const query_string = `INSERT INTO ${des_table_string} VALUES ${des_value_string}`;
                        connection.query(query_string);
                        connection.query(update_desciptioncount_query);
                        break;
                    }
                default:
                    break;
            }
        }
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
// SelectDescription
// 설명 : Description을 조회 API함수
// 입력 : projectid, resourcetype
// 리턴 : result_array
//       {
//           resultCode = 0 (성공) or 실패 데이터
//       }
/*----------------*////////////////////////*----------------*/
exports.SelectDescription = async function (req, res)
{
    startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    try
    {
        // 필수 값 체크
        const check = await startUP.CheckBody(req.body, ['projectid', 'transkey', 'majorver', 'minorver', 'hotfixver', 'buildver', 'resourcetype']);
        if (check != true)
        {
            result_array.resultCode = check;
            res.send(result_array);
            startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
            return;
        }

        const connection = startUP.Connection;

        const table_string = 'transdata_description';
        const where_string = `projectid = ${req.body.projectid} AND transkey = '${req.body.transkey}' AND majorver = ${req.body.majorver} AND minorver = ${req.body.minorver} AND hotfixver = ${req.body.hotfixver} AND buildver = ${req.body.buildver} AND resourcetype = '${req.body.resourcetype}'`;
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
}

/*----------------------------------------------------------*/
// DeleteDescription
// 설명 : Description을 삭제하는 API함수
// 입력 : descriptionid
// 리턴 : result_array
//       {
//           resultCode = 0 (성공) or 실패 데이터
//       }
/*----------------*////////////////////////*----------------*/
exports.DeleteDescription = async function (req, res)
{
    startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    try
    {
        // 필수 값 체크
        const check = await startUP.CheckBody(req.body, ['descriptionid']);
        if (check != true)
        {
            result_array.resultCode = check;
            res.send(result_array);
            startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
            return;
        }

        const connection = startUP.Connection;

        const table_string = 'transdata_description';
        const where_string = `descriptionid = ${req.body.descriptionid}`;

        const select_string = `SELECT * FROM ${table_string} WHERE ${where_string}`;
        const select_result = connection.query(select_string)[0];

        const decrement_count_string = `UPDATE transdata_${select_result.projectid}_${select_result.resourcetype} SET descriptioncount = descriptioncount - 1 WHERE transkey = '${select_result.transkey}' AND majorver = ${select_result.majorver} AND minorver = ${select_result.minorver} AND hotfixver = ${select_result.hotfixver} AND buildver = ${select_result.buildver}`;
        connection.query(decrement_count_string);


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
}

/*----------------------------------------------------------*/
// UpdateDescription
// 설명 : Description을 수정하는 API함수
// 입력 : descriptionid
// 리턴 : result_array
//       {
//           resultCode = 0 (성공) or 실패 데이터
//       }
/*----------------*////////////////////////*----------------*/
exports.UpdateDescription = async function (req, res)
{
    startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    try
    {
        // 필수 값 체크
        const check = await startUP.CheckBody(req.body, ['descriptionid']);
        if (check != true)
        {
            result_array.resultCode = check;
            res.send(result_array);
            return;
        }

        var connection = startUP.Connection;
        var columns = connection.query("show full columns from `transdata_description`");

        // update set where
        const table_string = '`transdata_description`';
        let update_string = '';
        const where_string = `descriptionid = ${req.body.descriptionid}`
        // 컬럼 목록을 순회
        for (let column of columns)
        {
            // req에 있는경우
            if (req.body[column.Field] != null)
            {
                if (column.Field == 'descriptionid')
                    continue;
                update_string += `${column.Field} = `
                if (column.Type.match('int') == 'int')
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
    }
    catch (err)
    {
        result_array.resultCode = err.code;
        result_array.message = err.message;
    }


    res.send(result_array);
    startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
}