// translate 관련 API

const startUP = require('../../public/javascripts/Common/StartUP');

/*----------------------------------------------------------*/
// ImportData
// 설명 : 리소스 파일을 읽어서 데이터베이스에 추가하는 API함수
// 입력 : projectid, majorver, minorver, hotfixver, buildver resourcetype, language, data
// 리턴 : result_array
//       {
//           resultCode = 0 (성공) or 실패 데이터, count
//       }
/*----------------*////////////////////////*----------------*/
exports.ImportData = async function (req, res)
{
    //startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    try
    {
        var check = await startUP.CheckBody(req.body, ['projectid', 'majorver', 'minorver', 'hotfixver', 'buildver', 'resourcetype', 'language']);
        if (check != true)
        {
            result_array.resultCode = check;
            res.send(result_array);
            return;
        }

        var connection = startUP.Connection;
        var count = 0;

        // 빌드버전업시 영어만 추가하지말고 현재 그 프로젝트에 존재하는 언어를 추가해줘야함
        const add_list_query = `SELECT DISTINCT \`language\` FROM \`project_version\` WHERE majorver = ${req.body.majorver} AND minorver = ${req.body.minorver} AND hotfixver = ${req.body.hotfixver} AND resourcetype = '${req.body.resourcetype}' AND language != '${req.body.language}'`;
        const add_list_result = connection.query(add_list_query);
        let other_language_value_string = '';

        switch (req.body.resourcetype)
        {
            case 'app':
                {
                    const parser = require('fast-xml-parser');

                    var options = {
                        attributeNamePrefix: "",
                        attrNodeName: "attr", //default is 'false'
                        textNodeName: "#text",
                        ignoreAttributes: false,
                        ignoreNameSpace: false,
                        allowBooleanAttributes: false,
                        parseNodeValue: true,
                        parseAttributeValue: false,
                        trimValues: false,
                        cdataTagName: "__cdata", //default is 'false'
                        cdataPositionChar: "\\c",
                        localeRange: "", //To support non english character in tag/attribute values.
                        parseTrueNumberOnly: false
                        //attrValueProcessor: a => he.decode(a, { isAttributeValue: true }),//default is a=>a
                        //tagValueProcessor: a => he.decode(a) //default is a=>a
                    };

                    if (parser.validate(req.body.data) === true)
                    { //optional (it'll return an object in case it's not valid)
                        var data = parser.parse(req.body.data, options);
                    }


                    //const xml_js = require('xml-js');
                    //const data = await xml_js.xml2js(req.body.data, { compact: true, space: 4 });
                    const project_data = connection.query(`SELECT * FROM project WHERE projectid = ${req.body.projectid}`);
                    var projectname = project_data[0].projectname.replace(/ /gi, '_');

                    let value_string = ''

                    for (let item of data.Translation.String)
                    {
                        let tag = item.attr.ID;
                        var original = item.Original;
                        let translated = item.Translated;

                        if (original != null)
                        {
                            original = original.replace(/'/gi, "\\'");
                            original = original.replace(/\\n/gi, "\\\\n");
                        }

                        if (translated != null)
                            translated = translated.replace(/\\n/gi, "\\\\n");

                        var table_string = `transdata_${req.body.projectid}_${req.body.resourcetype}` + '(`transkey`, `original`, `translation`, `language`, `majorver`, `minorver`, `hotfixver`, `buildver`)';
                        value_string += `('${tag}', '${original}', '${translated}', '${req.body.language}', ${req.body.majorver}, ${req.body.minorver}, ${req.body.hotfixver}, ${req.body.buildver}),\n`;

                        count++;

                        for (const item of add_list_result)
                        {
                            other_language_value_string += `('${tag}', '${original}', '${translated}', '${item.language}', ${req.body.majorver}, ${req.body.minorver}, ${req.body.hotfixver}, ${req.body.buildver}),\n`
                        }
                    }
                    value_string = value_string.substring(0, value_string.length - 2);
                    var query_string = `INSERT INTO ${table_string} VALUES ${value_string}`/*` ON DUPLICATE KEY UPDATE original = '${original}', translation = '${translated}'`*/;
                    connection.query(query_string);
                    other_language_value_string = other_language_value_string.substring(0, other_language_value_string.length - 2);
                    if (add_list_result.length != 0)
                    {
                        const other_language_query_string = `INSERT INTO ${table_string} VALUES ${other_language_value_string}`;
                        connection.query(other_language_query_string);
                    }

                    break;
                }
            case 'web':
                {
                    const project_data = connection.query(`SELECT * FROM project WHERE projectid = ${req.body.projectid}`);
                    var projectname = project_data[0].projectname.replace(/ /gi, '_');

                    const table_string = `transdata_${req.body.projectid}_${req.body.resourcetype}(tree, transkey, translation, language, majorver, minorver, hotfixver, buildver)`;
                    if (typeof (req.body.data) != 'object')
                    {
                        const index = req.body.data.IndexOF('=');
                        req.body.data = req.body.data.substring(0, index);
                        req.body.data = JSON.parse(req.body.data);
                    }

                    let value_string = await startUP.MakeValueString(req.body.data, '', req.body.language, req.body.majorver, req.body.minorver, req.body.hotfixver, req.body.buildver);
                    value_string = value_string.substring(0, value_string.length - 1);
                    var query_string = `INSERT INTO ${table_string} VALUES ${value_string}` + 'ON DUPLICATE KEY UPDATE translation = VALUES(`translation`)';
                    connection.query(query_string);

                    if (add_list_result.length != 0)
                    {
                        for (const item of add_list_result)
                        {
                            other_language_value_string += await startUP.MakeValueString(req.body.data, '', item.language, req.body.majorver,   req.body.minorver, req.body.hotfixver, req.body.buildver);
                        }
                        other_language_value_string = other_language_value_string.substring(0, other_language_value_string.length - 1);
                        const other_language_query_string = `INSERT INTO ${table_string} VALUES ${other_language_value_string}`;
                        connection.query(other_language_query_string);
                    }

                    break;
                }
            default:
                result_array.resultCode = 'FILE_TYPE_ERROR';
        }
    }
    catch (err)
    {
        if (err.code == 'ER_NO_SUCH_TABLE')
        {
            connection.query(`CREATE TABLE transdata_${req.body.projectid}_${req.body.resourcetype} LIKE transdata_${req.body.resourcetype}_template`);
            connection.query(query_string);
        }
        else
        {
            result_array.resultCode = err.code;
            result_array.message = err.message;
        }
    }
    result_array.count = count;
    res.send(result_array);
    //startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
};

/*----------------------------------------------------------*/
// ExportData
// 설명 : 데이터 베이스의 리소스 데이터를 조회하는 API함수
// 입력 : projectid, majorver, minorver, hotfixver, resourcetype, language
// 리턴 : result_array
//       {
//           resultCode
//           data :
//           [
//               {
//                  App 일 경우 string(xml)
//                  Web 일 경우 JsonData
//               },
//           ]
//       }
/*----------------*////////////////////////*----------------*/
exports.ExportData = async function (req, res)
{
    //startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    try
    {
        // 필수 값 체크
        const check = await startUP.CheckBody(req.body, ['projectid', 'majorver', 'minorver', 'hotfixver', 'resourcetype', 'language']);
        if (check != true)
        {
            result_array.resultCode = check;
            res.send(result_array);
            startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
            return;
        }

        // DB 연결
        var connection = startUP.Connection;

        const project_query = connection.query(`SELECT * FROM project WHERE projectid = ${req.body.projectid}`);
        if (project_query.length == 0)
        {
            result_array.resultCode = 'NOT EXIST PROJECT';
            res.send(result_array);
            startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
            return;
        }
        const buildver_subquery_string = '(SELECT MAX(buildver) FROM project_version WHERE ' + `language = '${req.body.language}' AND majorver = ${req.body.majorver} AND minorver = ${req.body.minorver} AND hotfixver = ${req.body.hotfixver} AND projectid = ${req.body.projectid} AND resourcetype = '${req.body.resourcetype}')`;

        const table_string = `transdata_${req.body.projectid}_${req.body.resourcetype}`;
        const where_string = `language = '${req.body.language}' AND majorver = ${req.body.majorver} AND minorver = ${req.body.minorver} AND hotfixver = ${req.body.hotfixver} AND buildver = ${buildver_subquery_string}`;
        const query_string = `SELECT * FROM ${table_string} WHERE ${where_string} ORDER BY transid`;


        const query_result = connection.query(query_string);
        const xml_writer = require('xml-writer');
        switch (req.body.resourcetype)
        {
            case 'app':
                const xw = new xml_writer(true, '\t');
                xw.startDocument('1.0', 'UTF-8', false);
                xw.startElement('Translation');
                //xw.writeAttribute('Version', `V${req.body.majorver}.${req.body.minorver}`);
                xw.writeAttribute('Version', `V1.0`);
                for (const item of query_result)
                {
                    xw.startElement('String');
                    xw.writeAttribute('ID', item.transkey);
                    xw.startElement('Original');
                    if (item.original == 'undefined')
                        xw.text('');
                    else
                        xw.writeRaw(`${item.original}`);
                    xw.endElement();
                    xw.startElement('Translated');
                    if (item.translation == 'undefined')
                        xw.text('');
                    else
                        xw.writeRaw(`${item.translation}`);
                    xw.endElement();
                    xw.endElement();
                }
                xw.endElement();
                xw.endDocument();
                result_array.data = xw.toString();
                result_array.filename = `${req.body.projectid}_${req.body.language}${req.body.majorver}_${req.body.minorver}.lan`;
                break;
            case 'web':
                result_array.data = await startUP.MakeJsObject(query_result);
                result_array.filename = `${req.body.projectid}_${req.body.language}${req.body.majorver}_${req.body.minorver}.js`;
                break;
        }
    }
    catch (err)
    {
        result_array.resultCode = err.code;
        result_array.message = err.message;
    }

    res.send(result_array);
    //startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
};

/*----------------------------------------------------------*/
// SelectData
// 설명 : 리소스 데이터를 조회 하는 API 함수
// 입력 : projectid, majorver, minorver, resourcetype, language
// 리턴 : result_array
//       {
//            data :
//           [
//               {
//                  App 일 경우
//                  transid,
//                  transkey,
//                  original,
//                  translation,
//                  language,
//                  majorver,
//                  minorver
//
//                  Web 일 경우
//                  transid,
//                  tree,
//                  transkey,
//                  translation,
//                  language,
//                  majorver,
//                  minorver
//               },
//           ]
//       }
/*----------------*////////////////////////*----------------*/
exports.SelectData = async function (req, res)
{
    //startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;
    try
    {

        // 필수 값 체크
        const check = await startUP.CheckBody(req.body, ['projectid', 'majorver', 'minorver', 'hotfixver', 'buildver', 'resourcetype', 'language']);
        if (check != true)
        {
            result_array.resultCode = check;
            res.send(result_array);
            startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
            return;
        }

        // DB 연결
        var connection = startUP.Connection;

        const project_data = connection.query(`SELECT * FROM project WHERE projectid = ${req.body.projectid}`);
        if (project_data.length == 0)
        {
            result_array.resultCode = 'NOT EXIST PROJECT';
            res.send(result_array);
            startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
            return;
        }
        var projectname = project_data[0].projectname.replace(/ /gi, '_');

        const buildver_subquery_string = '(SELECT MAX(buildver) FROM project_version WHERE ' + `language = '${req.body.language}' AND majorver = ${req.body.majorver} AND minorver = ${req.body.minorver} AND hotfixver = ${req.body.hotfixver} AND resourcetype = '${req.body.resourcetype}')`;

        const table_string = `transdata_${req.body.projectid}_${req.body.resourcetype}`;
        const where_string = `language = '${req.body.language}' AND majorver = ${req.body.majorver} AND minorver = ${req.body.minorver} AND hotfixver = ${req.body.hotfixver} AND buildver = ${buildver_subquery_string}`;
        const query_string = `SELECT * FROM ${table_string} WHERE ${where_string}`;


        const where_string_old = `language = '${req.body.language}' AND majorver = ${req.body.majorver} AND minorver = ${req.body.minorver} AND hotfixver = ${req.body.hotfixver} AND buildver = ${req.body.buildver}`;
        const query_string_old = `SELECT * FROM ${table_string} WHERE ${where_string_old}`;

        const query_result = connection.query(query_string);
        const query_result_old = connection.query(query_string_old);

        result_array.data = query_result;
        result_array.olddata = query_result_old;
    }
    catch (err)
    {
        result_array.resultCode = err.code;
        result_array.errmessage = err.message;
    }



    res.send(result_array);
    //startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
};

/*----------------------------------------------------------*/
// AddData
// 설명 : 새 언어 데이터를 데이터베이스에 추가하는 API함수
// 입력 : projectid, majorver, minorver, hotfixver, buildver, resourcetype, language, data
// 리턴 : result_array
//       {
//           resultCode = 0 (성공) or 실패 데이터, count
//       }
/*----------------*////////////////////////*----------------*/
exports.AddData = async function (req, res)
{
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    try
    {
        // 필수 값 체크
        const check = await startUP.CheckBody(req.body, ['projectid', 'majorver', 'minorver', 'hotfixver', 'buildver', 'resourcetype', 'language']);
        if (check != true)
        {
            result_array.resultCode = check;
            res.send(result_array);
            startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
            return;
        }

        // DB 연결
        var connection = startUP.Connection;

        const project_query = connection.query(`SELECT * FROM project WHERE projectid = ${req.body.projectid}`);
        if (project_query.length == 0)
        {
            result_array.resultCode = 'NOT EXIST PROJECT';
            res.send(result_array);
            startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
            return;
        }

        const table_string = `transdata_${req.body.projectid}_${req.body.resourcetype}`;
        const where_string = `language = 'english' AND majorver = ${req.body.majorver} AND minorver = ${req.body.minorver} AND hotfixver = ${req.body.hotfixver} AND buildver = ${req.body.buildver}`;
        const query_string = `SELECT * FROM ${table_string} WHERE ${where_string}`;

        const query_result = connection.query(query_string);


        if (query_result.length == 0)
        {
            result_array.resultCode = 'Not Exist Data';
            res.send(result_array);
            return;
        }
        let insert_value_string = '';
        switch (req.body.resourcetype)
        {
            case 'app':
                var insert_table_string = `${table_string}(transkey, original, language, majorver, minorver, hotfixver, buildver)`;
                for (var row of query_result)
                {
                    row.original = row.original.replace(/\\n/gi, "\\\\n");
                    insert_value_string += `("${row.transkey}", "${row.original}", "${req.body.language}", ${req.body.majorver}, ${req.body.minorver}, ${req.body.hotfixver}, ${req.body.buildver}),`;
                }
                break;
            case 'web':
                var insert_table_string = `${table_string}(tree, transkey, language, majorver, minorver, hotfixver, buildver)`;
                for (var row of query_result)
                {
                    insert_value_string += `("${row.tree}", "${row.transkey}", "${req.body.language}", ${req.body.majorver}, ${req.body.minorver}, ${req.body.hotfixver}, ${req.body.buildver}),`;
                }
                break
            default:
                break;
        }
        insert_value_string = insert_value_string.substring(0, insert_value_string.length - 1);
        // other_language_value_string = other_language_value_string.substring(0, other_language_value_string.length - 1);

        const insert_query_string = `INSERT INTO ${insert_table_string} VALUES ${insert_value_string}`;

        connection.query(insert_query_string);

        result_array.count = query_result.length;
    }
    catch (err)
    {
        result_array.resultCode = err.code;
        result_array.errmessage = err.message;
    }

    res.send(result_array);
};

/*----------------------------------------------------------*/
// UpdateData
// 설명 : 언어 데이터를 데이터베이스에 업데이트 API함수
// 입력 : projectid, majorver, minorver, hotfixver, buildver, resourcetype, language, data
// 리턴 : result_array
//       {
//           resultCode = 0 (성공) or 실패 데이터, count
//       }
/*----------------*////////////////////////*----------------*/
exports.UpdateData = async function (req, res)
{
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    try
    {
        // 필수 값 체크
        const check = await startUP.CheckBody(req.body, ['projectid', 'resourcetype', 'language', 'majorver', 'minorver', 'hotfixver', 'buildver']);
        if (check != true)
        {
            result_array.resultCode = check;
            res.send(result_array);
            startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
            return;
        }

        // DB 연결
        var connection = startUP.Connection;

        const project_query = connection.query(`SELECT * FROM project WHERE projectid = ${req.body.projectid}`);
        if (project_query.length == 0)
        {
            result_array.resultCode = 'NOT EXIST PROJECT';
            res.send(result_array);
            startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
            return;
        }

        // for update
        const table_string = `transdata_${req.body.projectid}_${req.body.resourcetype}`;
        let query_string = '';
        switch (req.body.resourcetype)
        {
            case 'app':
                {
                    const data = JSON.parse(req.body.data);
                    for (let item of data)
                    {
                        //item.translation.replace(/'/gi, "''");
                        if (item.translation == null)
                            query_string += `UPDATE ${table_string} SET \`translation\` = NULL WHERE \`transid\` = ${item.transid};\n`;
                        else
                            query_string += `UPDATE ${table_string} SET \`translation\` = '${item.translation}' WHERE \`transid\` = ${item.transid};\n`;
                    }
                    break;
                }
            case 'web':
                {
                    const data = JSON.parse(req.body.data);
                    for (let item of data)
                    {
                        if (item.translation == null)
                            query_string += `UPDATE ${table_string} SET \`translation\` = NULL WHERE transkey = '${item.transkey}' AND language = '${req.body.language}' AND majorver = ${req.body.majorver} AND minorver = ${req.body.minorver};\n`;
                        else
                            query_string += `UPDATE ${table_string} SET \`translation\` = '${item.translation}' WHERE transkey = '${item.transkey}' AND language = '${req.body.language}' AND majorver = ${req.body.majorver} AND minorver = ${req.body.minorver};\n`;
                    }
                }
                break;
            default:
                break;
        }
        query_string = query_string.substring(0, query_string.length - 1);
        connection.query(query_string);
    }
    catch (err)
    {
        result_array.resultCode = err.code;
        result_array.errmessage = err.message;
    }
    res.send(result_array);
}

/*----------------------------------------------------------*/
// Test
// 설명 : Echo 테스트 함수
// 입력 : post 방식의 어떠한 데이터
// 리턴 : 그대로 send
/*----------------*////////////////////////*----------------*/
exports.Test = async function (req, res)
{
    console.log(req);
};

exports.SelectDomain = async function (req, res)
{
    try
    {
        startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));

        var result_array = Object();
        result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

        // post로 받은 데이터중 필수로 있어야 하는것 체크
        const check = await startUP.CheckBody(req.body, ['language']);
        if (check != true)
        {
            // resultCode에 응답코드를 남긴다
            // ResultCode에 정의한 정수값을 사용할지 string자체를 담을지 결정해야함
            result_array.resultCode = check;
            res.send(result_array);
            return;
        }

        // 동기 DB
        const connection = startUP.Connection;

        const table_string = `language_domain`;
        const where_string = `language = '${req.body.language}'`;
        const query_string = `SELECT domain FROM ${table_string} WHERE ${where_string}`;


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

exports.TestURL = async function (req, res)
{
    try
    {
        startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));

        var result_array = Object();
        result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

        // 동기 DB
        const connection = startUP.Connection;

        const table_string = `transdata_description`;
        const where_string = `projectid = '${req.body.projectid}' AND resourcetype = '${req.body.resourcetype}' AND transid = '${req.body.transid}'`;
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

exports.TestDescriptionData = async function (req, res)
{
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;
    try
    {
        startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));

        // 동기 DB
        const connection = startUP.Connection;

        const table_string = `transdata_description(\`projectid\`, \`resourcetype\`, \`transid\`, \`type\`, \`content\`)`;
        const value_string = `(${req.body.projectid}, '${req.body.resourcetype}', ${req.body.transid}, '${req.body.type}', '${req.body.content}')`;
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
};
