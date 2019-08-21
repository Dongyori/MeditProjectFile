// translate 관련 API

const startUP = require('../../public/javascripts/Common/StartUP');

/*----------------------------------------------------------*/
// ImportData
// 설명 : 리소스 파일을 읽어서 데이터베이스에 추가하는 API함수
// 입력 : projectid, majorver, minorver, type, language, data
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

    var check = await startUP.CheckBody(req.body, ['projectid', 'majorver', 'minorver', 'type', 'language']);
    if (check != true)
    {
        result_array.resultCode = check;
        res.send(result_array);
        return;
    }

    var connection = startUP.DB.sync();
    var count = 0;
    switch (req.body.type)
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
                    trimValues: true,
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

                    var table_string = `transdata_${project_data[0].projectname}_${req.body.type}` + '(`transkey`, `original`, `translation`, `language`, `majorver`, `minorver`)';
                    value_string += `('${tag}', '${original}', '${translated}', '${req.body.language}', ${req.body.majorver}, ${req.body.minorver}),\n`;

                    count++;

                }
                value_string = value_string.substring(0, value_string.length - 2);
                const query_string = `INSERT INTO ${table_string} VALUES ${value_string}`/*` ON DUPLICATE KEY UPDATE original = '${original}', translation = '${translated}'`*/;
                try
                {
                    connection.query(query_string);
                }
                catch (err)
                {
                    if (err.code == 'ER_NO_SUCH_TABLE')
                    {
                        connection.query(`CREATE TABLE transdata_${project_data[0].projectname}_${req.body.type} LIKE transdata_app_template`);
                        connection.query(query_string);
                    }
                    else
                    {
                        result_array.resultCode = err.code;
                        result_array.message = err.message;
                    }
                }
                break;
            }
        case 'web':
            {
               const project_data = connection.query(`SELECT * FROM project WHERE projectid = ${req.body.projectid}`);

                const table_string = `transdata_${project_data[0].projectname}_${req.body.type}(tree, transkey, translation, language, majorver, minorver)`;
                if (typeof (req.body.data) != 'object')
                {
                    const index = req.body.data.IndexOF('=');
                    req.body.data = req.body.data.substring(0, index);
                    req.body.data = JSON.parse(req.body.data);
                }

                let value_string = await startUP.MakeValueString(req.body.data, '', req.body.language, req.body.majorver, req.body.minorver);
                value_string = value_string.substring(0, value_string.length - 1);
                const query_string = `INSERT INTO ${table_string} VALUES ${value_string}` + 'ON DUPLICATE KEY UPDATE translation = VALUES(`translation`)';

                try
                {
                    connection.query(query_string);
                }
                catch (err)
                {
                    if (err.code == 'ER_NO_SUCH_TABLE')
                    {
                        connection.query(`CREATE TABLE transdata_${project_data[0].projectname}_${req.body.type} LIKE transdata_web_template`);
                        connection.query(query_string);
                    }
                    else
                    {
                        result_array.resultCode = err.code;
                        result_array.message = err.message;
                    }
                }
                break;
            }
        default:
            result_array.resultCode = 'FILE_TYPE_ERROR';
    }
    result_array.count = count;
    res.send(result_array);
    //startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
    connection.dispose();
};

/*----------------------------------------------------------*/
// ExportData
// 설명 : 데이터 베이스의 리소스 데이터를 조회하는 API함수
// 입력 : projectid, majorver, minorver, type, language
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
        const check = await startUP.CheckBody(req.body, ['projectid', 'majorver', 'minorver', 'type', 'language']);
        if (check != true)
        {
            result_array.resultCode = check;
            res.send(result_array);
            startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
            return;
        }

        // DB 연결
        var connection = startUP.DB.sync();

        const project_query = connection.query(`SELECT * FROM project WHERE projectid = ${req.body.projectid}`);
        if (project_query.length == 0)
        {
            result_array.resultCode = 'NOT EXIST PROJECT';
            res.send(result_array);
            startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
            return;
        }

        const table_string = `transdata_${project_query[0].projectname}_${req.body.type}`;
        const where_string = `language = '${req.body.language}' AND majorver = ${req.body.majorver} AND minorver = ${req.body.minorver}`;
        const query_string = `SELECT * FROM ${table_string} WHERE ${where_string} ORDER BY TRANSID`;


        const query_result = connection.query(query_string);
        const xml_writer = require('xml-writer');
        switch (req.body.type)
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
                result_array.filename = `${project_query[0].projectname}_${req.body.language}${req.body.majorver}_${req.body.minorver}.lan`;
                break;
            case 'web':
                result_array.data = await startUP.MakeJsObject(query_result);
                result_array.filename = `${project_query[0].projectname}_${req.body.language}${req.body.majorver}_${req.body.minorver}.js`;
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
    connection.dispose();
};

/*----------------------------------------------------------*/
// SelectData
// 설명 : 리소스 데이터를 조회 하는 API 함수
// 입력 : projectid, majorver, minorver, type, language
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
        const check = await startUP.CheckBody(req.body, ['projectid', 'majorver', 'minorver', 'type', 'language']);
        if (check != true)
        {
            result_array.resultCode = check;
            res.send(result_array);
            startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
            return;
        }

        // DB 연결
        var connection = startUP.DB.sync();

        const project_query = connection.query(`SELECT * FROM project WHERE projectid = ${req.body.projectid}`);
        if (project_query.length == 0)
        {
            result_array.resultCode = 'NOT EXIST PROJECT';
            res.send(result_array);
            startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
            return;
        }

        const table_string = `transdata_${project_query[0].projectname}_${req.body.type}`;
        const where_string = `language = '${req.body.language}' AND majorver = ${req.body.majorver} AND minorver = ${req.body.minorver}`;
        const query_string = `SELECT * FROM ${table_string} WHERE ${where_string}`;

        var query_result = connection.query(query_string);
        result_array.data = query_result;
    }
    catch (err)
    {
        result_array.resultCode = err.code;
        result_array.errmessage = err.message;
    }



    res.send(result_array);
    //startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));

    connection.dispose();
};

/*----------------------------------------------------------*/
// AddData
// 설명 : 새 언어 데이터를 데이터베이스에 추가하는 API함수
// 입력 : projectid, majorver, minorver, type, language, data
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
        const check = await startUP.CheckBody(req.body, ['projectid', 'majorver', 'minorver', 'type', 'language']);
        if (check != true)
        {
            result_array.resultCode = check;
            res.send(result_array);
            startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
            return;
        }

        // DB 연결
        var connection = startUP.DB.sync();

        const project_query = connection.query(`SELECT * FROM project WHERE projectid = ${req.body.projectid}`);
        if (project_query.length == 0)
        {
            result_array.resultCode = 'NOT EXIST PROJECT';
            res.send(result_array);
            startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
            return;
        }

        const table_string = `transdata_${project_query[0].projectname}_${req.body.type}`;
        const where_string = `language = 'english' AND majorver = ${req.body.majorver} AND minorver = ${req.body.minorver}`;
        const query_string = `SELECT * FROM ${table_string} WHERE ${where_string}`;

        const query_result = connection.query(query_string);

        if (query_result.length == 0)
        {
            result_array.resultCode = 'Not Exist Data';
            res.send(result_array);
            connection.dispose();
            return;
        }
        let insert_value_string = '';
        switch (req.body.type)
        {
            case 'app':
                var insert_table_string = `${table_string}(transkey, original, language, majorver, minorver)`;
                for (var row of query_result)
                {
                    insert_value_string += `("${row.transkey}", "${row.original}", "${req.body.language}", ${req.body.majorver}, ${req.body.minorver}),`;
                }
                break;
            case 'web':
                var insert_table_string = `${table_string}(tree, transkey, language, majorver, minorver)`;
                for (var row of query_result)
                {
                    insert_value_string += `("${row.tree}", "${row.transkey}", "${req.body.language}", ${req.body.majorver}, ${req.body.minorver}),`;
                }
                break
            default:
                break;
        }

        insert_value_string = insert_value_string.substring(0, insert_value_string.length - 1);

        const insert_query_string = `INSERT INTO ${insert_table_string} VALUES ${insert_value_string}`;
        connection.query(insert_query_string);

        result_array.count = query_result.length;
        //result_array.data = query_result;
    }
    catch (err)
    {
        result_array.resultCode = err.code;
        result_array.errmessage = err.message;
    }

    res.send(result_array);
    connection.dispose();
};

/*----------------------------------------------------------*/
// Test
// 설명 : Echo 테스트 함수
// 입력 : post 방식의 어떠한 데이터
// 리턴 : 그대로 send
/*----------------*////////////////////////*----------------*/
exports.UpdateData = async function (req, res)
{
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    try
    {
        // 필수 값 체크
        const check = await startUP.CheckBody(req.body, ['projectid', 'type', 'language', 'majorver' ,'minorver']);
        if (check != true)
        {
            result_array.resultCode = check;
            res.send(result_array);
            startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
            return;
        }

        // DB 연결
        var connection = startUP.DB.sync();

        const project_query = connection.query(`SELECT * FROM project WHERE projectid = ${req.body.projectid}`);
        if (project_query.length == 0)
        {
            result_array.resultCode = 'NOT EXIST PROJECT';
            res.send(result_array);
            startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
            return;
        }

        // for update
        const table_string = `transdata_${project_query[0].projectname}_${req.body.type}`;
        let query_string = '';
        switch (req.body.type)
        {
            case 'app':
                {
                    const data = JSON.parse(req.body.data);
                    for (let item of data)
                    {
                        //item.translation.replace(/'/gi, "''");
                        query_string += `UPDATE ${table_string} SET \`translation\` = '${item.translation} ' WHERE \`transid\` = ${item.transid};\n`;
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
    connection.dispose();
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

