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
        const check = await startUP.CheckBody(req.body, ['projectid', 'majorver', 'minorver', 'hotfixver', 'buildver', 'language', 'resourcetype', 'description']);
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
            switch (req.body.resourcetype)
            {
                case 'app':
                    {
                        const des_table_string = `transdata_description(projectid, resourcetype, majorver, minorver, hotfixver, buildver, language, type, transkey,  content, caption)`;
                        let des_value_string = '';
                        for (const item of description)
                        {
                            //item.transkey = item.transkey.replace(/'/gi, "''");
                            //item.content = item.content.replace(/'/gi, "''");
                            des_value_string += `(${req.body.projectid}, '${req.body.resourcetype}', ${req.body.majorver}, ${req.body.minorver}, ${req.body.hotfixver}, ${req.body.buildver}, '${req.body.language}', '${item.type}', '${item.transkey}', '${item.content}', `;
                            if (item.caption == null)
                                des_value_string += `NULL),\n`;
                            else
                            {
                                //item.caption = item.caption.replace(/'/gi, "''");
                                des_value_string += `'${item.caption}'),\n`;
                            }
                        } 
                        des_value_string = des_value_string.substring(0, des_value_string.length - 2);
                        const query_string = `INSERT INTO ${des_table_string} VALUES ${des_value_string}`;
                        connection.query(query_string);
                        break;
                    }
                case 'web':
                    {
                        // description map
                        const des_table_string = `transdata_description(projectid, resourcetype, majorver, minorver, hotfixver, buildver, language, type, transkey,  content, tree, caption)`;
                        let des_value_string = '';
                        for (const item of description)
                        {
                            //item.transkey = item.transkey.replace(/'/gi, "''");
                            //item.content = item.content.replace(/'/gi, "''");
                            des_value_string += `(${req.body.projectid}, '${req.body.resourcetype}', ${req.body.majorver}, ${req.body.minorver}, ${req.body.hotfixver}, ${req.body.buildver}, '${req.body.language}', '${item.type}', '${item.transkey}', '${item.content}', '${item.tree}', `;
                            if (item.caption == null)
                                des_value_string += `NULL),\n`;
                            else
                            {
                                //item.caption = item.caption.replace(/'/gi, "''");
                                des_value_string += `'${item.caption}'),\n`;
                            }
                        } 
                        //const valuepart = `${req.body.projectid}, '${req.body.resourcetype}', ${req.body.majorver}, ${req.body.minorver}, #${req.body.hotfixver}, ${req.body.buildver}, '${req.body.language}', '${req.body.type}'`;
                        //des_value_string = await startUP.MakeDesciptionValueString(description, '', valuepart);
                        des_value_string = des_value_string.substring(0, des_value_string.length - 2);
                        const query_string = `INSERT INTO ${des_table_string} VALUES ${des_value_string}`;
                        connection.query(query_string);
                        break;
                    }
                default:
                    break;
            }
        }
        //switch (req.body.resourcetype)
        //{
        //    case 'app':
        //        {
        //            const table_string = `transdata_description(projectid, resourcetype, transkey, majorver, minorver, hotfixver, buildver, language, type, content, caption)`;
        //            const value_string = `(${req.body.projectid}, '${req.body.resourcetype}', '${req.body.transkey}', ${req.body.majorver}, ${req.body.minorver}, ${req.body.hotfixver}, ${req.body.buildver}, '${req.body.language}', '${req.body.type}', '${req.body.content}',  '${req.body.caption}')`;
        //            const query_string = `INSERT INTO ${table_string} VALUES ${value_string}`;

        //            connection.query(query_string);
        //            break;
        //        }
        //    case 'web':
        //        {
        //            const table_string = `transdata_description(projectid, resourcetype, tree, transkey, majorver, minorver, hotfixver, buildver, language, type, content, caption)`;
        //            const value_string = `(${req.body.projectid}, '${req.body.resourcetype}', '${req.body.tree}', '${req.body.transkey}', ${req.body.majorver}, ${req.body.minorver}, ${req.body.hotfixver}, ${req.body.buildver}, '${req.body.language}', '${req.body.type}', '${req.body.content}',  '${req.body.caption}')`;

        //            connection.query(query_string);
        //            break;
        //        }
        //    default:
        //        break;
        //}
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
// 입력 : projectid, transid, resourcetype
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
        const check = await startUP.CheckBody(req.body, ['projectid', 'transid', 'resourcetype']);
        if (check != true)
        {
            result_array.resultCode = check;
            res.send(result_array);
            startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
            return;
        }

        const connection = startUP.Connection;

        const table_string = 'transdata_description';
        const where_string = `projectid = ${projectid} AND transid = ${req.body.transid} AND resourcetype = '${req.body.resourcetype}'`;
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