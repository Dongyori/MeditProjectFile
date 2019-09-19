
const startUP = require('../../public/javascripts/Common/StartUP');
const APIFun = require('../../public/javascripts/NewAPIFun');

/*----------------------------------------------------------*/
// ExportData
// 설명 : 데이터 베이스의 리소스 데이터를 조회하는 API함수
// 입력 : 
//       {
//          projectid,          
//          resourcetype,
//          language,
//          data : 
//          [
//              {
//                  majorver,
//                  minorver,
//                  hotfixver,
//                  buildver,
//                  [option] revisionver
//              },
//              {
//                  ...
//              }
//          ]        
//       }
// 리턴 : result_array
//       {
//           resultCode
//           data :
//           [
//               {
//                  App 일 경우 string(xml)
//                  Web 일 경우 JsonData
//               },
//              ...
//           ]
//       }
/*----------------*////////////////////////*----------------*/
exports.ExportData = async function (req, res)
{
    //startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;
    result_array.data = [];


    if (typeof (req.body.data) !== 'object')
    {
        result_array.resultCode = 'data is not array';
        res.send(result_array);
        startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
        return;
    }
    //req.body에서 검사
    //'projectid','resourcetype', 'language'
    const check = await startUP.CheckBody(req.body, ['projectid', 'resourcetype', 'language']);
    if (check != true) {
        result_array.resultCode = check;
        res.send(result_array);
        startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
        return;
    }


    for (const work of req.body.data)
    {
        // work에서 검사
        const check = await startUP.CheckBody(work, ['majorver', 'minorver', 'hotfixver', 'buildver']);
        if (check != true)
        {
            result_array.resultCode = check;
            res.send(result_array);
            startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
            return;
        }
    }
    try
    {
        // export 실제 기능은 api가 아닌 함수로 분리한다
        result_array.data = await APIFun.ExportData(req);
    }
    catch (err)
    {
        result_array.resultCode = err.code;
        result_array.resultCode = err.code;
    }

    res.send(result_array);
};


/*----------------------------------------------------------*/
// ImportData
// 설명 : 리소스 파일을 읽어서 데이터베이스에 추가하는 API함수
// 입력 : projectid, majorver, minorver, hotfixver, buildver, revisionver, resourcetype, language, data
// 리턴 : result_array
//       {
//           resultCode = 0 (성공) or 실패 데이터, count
//       }
/*----------------*////////////////////////*----------------*/
exports.ImportData = async function (req)
{
    //startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    try
    {
        var check = await startUP.CheckBody(req.body, ['projectid', 'majorver', 'minorver', 'hotfixver', 'buildver', 'revisionver', 'resourcetype', 'language']);
        if (check != true)
        {
            result_array.resultCode = check;
            return;
        }

        var connection = startUP.Connection;
        var count = 0;


        // 전 버전을 구하기위해 정렬된 전체버전 SELECT
        const pre_ver_query = `SELECT * FROM project_version WHERE language = '${req.body.language}' AND resourcetype = '${req.body.resourcetype}' AND projectid = ${req.body.projectid} ORDER BY majorver DESC, minorver DESC, hotfixver DESC, buildver DESC, revisionver DESC`;
        const ver_list = connection.query(pre_ver_query);

        // 전 버전 구하기
        const pre_ver = startUP.FindPreVer(ver_list, req.body.majorver, req.body.minorver, req.body.hotfixver, req.body.buildver, req.body.revisionver);
        var add_list_result = ``;
        let other_language_value_string = '';
        
        if (pre_ver != null)
        {
            // 빌드버전업시 영어만 추가하지말고 현재 그 프로젝트에 존재하는 언어를 추가해줘야함
            const add_list_query = `SELECT DISTINCT \`language\` FROM \`project_version\` WHERE projectid = ${req.body.projectid} AND resourcetype = '${pre_ver.resourcetype}' AND language != '${pre_ver.language}' AND majorver = ${pre_ver.majorver} AND minorver = ${pre_ver.minorver} AND hotfixver = ${pre_ver.hotfixver} AND buildver = ${pre_ver.buildver} AND revisionver = ${pre_ver.revisionver}`;
            add_list_result = connection.query(add_list_query);
        }
        // 변환한 값을 담을 객체
        var pre_ver_object = Object();

        switch (req.body.resourcetype)
        {
            case 'app':
                {
                    //const parser = require('fast-xml-parser');

                    //var options = {
                    //    attributeNamePrefix: "",
                    //    attrNodeName: "attr", //default is 'false'
                    //    textNodeName: "#text",
                    //    ignoreAttributes: false,
                    //    ignoreNameSpace: false,
                    //    allowBooleanAttributes: false,
                    //    parseNodeValue: true,
                    //    parseAttributeValue: false,
                    //    trimValues: false,
                    //    cdataTagName: "__cdata", //default is 'false'
                    //    cdataPositionChar: "\\c",
                    //    localeRange: "", //To support non english character in tag/attribute values.
                    //    parseTrueNumberOnly: false
                    //};
                    //if (parser.validate(req.body.data) === true)
                    //{ //optional (it'll return an object in case it's not valid)
                    //    var data = parser.parse(req.body.data, options);
                    //}

                    //const project_data = connection.query(`SELECT * FROM project WHERE projectid = ${req.body.projectid}`);
                    //var projectname = project_data[0].projectname.replace(/ /gi, '_');

                    if (pre_ver != null)
                    {
                        for (const language of add_list_result)
                        {
                            // 전 버전의 번역 데이터를 새로운 버전의 데이터에 덮어씌우기 위해 SELECT
                            const pre_ver_where_string = `language = '${language.language}' AND majorver = ${pre_ver.majorver} AND minorver = ${pre_ver.minorver} AND hotfixver = ${pre_ver.hotfixver} AND buildver = ${pre_ver.buildver} AND revisionver = ${pre_ver.revisionver}`;
                            const pre_ver_language_query = `SELECT * FROM transdata_${req.body.projectid}_${req.body.resourcetype} WHERE ${pre_ver_where_string}`;
                            const pre_ver_language = connection.query(pre_ver_language_query);

                            var laguage_object = Object();
                            // Key로 접근하기 위해 Array -> Key : Value의 객체로 변환
                            for (const item of pre_ver_language)
                            {
                                laguage_object[item.transkey] = item.translation;
                            }
                            pre_ver_object[language.language] = laguage_object;
                        }
                    }

                    // 받은 데이터를 원본으로 하며 전 버전의 번역데이터를 참고하여 INSERT

                    let value_string = '';
                    for (let item of req.body.data)
                    {
                        let tag = item.transkey;
                        if (typeof (item.original) != 'undefined')
                        {
                            var original = item.original;
                            original = original.replace(/'/gi, "\\'");
                            original = original.replace(/\\n/gi, "\\\\n");
                        }

                        var translation = null;
                        if (typeof (item.translation) != 'undefined')
                        {
                            translated = item.translation;
                            translated = translated.replace(/'/gi, "\\'");
                            translated = translated.replace(/\\n/gi, "\\\\n");
                            translated = "'" + translated + "'";
                        }
                            

                        var table_string = `transdata_${req.body.projectid}_${req.body.resourcetype}` + '(`transkey`, `original`, `translation`, `language`, `majorver`, `minorver`, `hotfixver`, `buildver`, `revisionver`, `descriptioncount`)';

                        const subquery = `(SELECT IFNULL(MAX(descriptioncount), 0) FROM transdata_${req.body.projectid}_${req.body.resourcetype} temp WHERE language = '${req.body.language}' AND transkey = '${tag}' ORDER BY majorver DESC, minorver DESC, hotfixver DESC, buildver DESC, revisionver DESC LIMIT 1)`;
                        value_string += `('${tag}', '${original}', ${translation}, '${req.body.language}', ${req.body.majorver}, ${req.body.minorver}, ${req.body.hotfixver}, ${req.body.buildver}, ${req.body.revisionver}, ${subquery}),\n`;

                        count++;

                        // 다른 언어도 insert
                        for (const item of add_list_result)
                        {
                            translated = null
                            // 이전버전의 같은 키의 번역이 있다면 덮어 씌운다
                            if (typeof (pre_ver_object[item.language]) != 'undefined')
                            {
                                const language_pre_data = pre_ver_object[item.language];
                                if (typeof (language_pre_data[tag]) != 'undefined')
                                {
                                    translated = language_pre_data[tag];
                                    translated = translated.replace(/'/gi, "''");
                                    translated = translated.replace(/\\n/gi, "\\\\n");
                                    translated = "'" + translated + "'";
                                }
                            }

                            other_language_value_string += `('${tag}', '${original}', ${translated}, '${item.language}', ${req.body.majorver}, ${req.body.minorver}, ${req.body.hotfixver}, ${req.body.buildver}, ${req.body.revisionver}, (${subquery})),\n`;
                        }
                    }

                    value_string = value_string.substring(0, value_string.length - 2);
                    var query_string = `INSERT INTO ${table_string} VALUES ${value_string}`/*` ON DUPLICATE KEY UPDATE original = '${original}', translation = '${translated}'`*/;
                    //console.log(query_string);
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

                    const table_string = `transdata_${req.body.projectid}_${req.body.resourcetype}(tree, transkey, translation, language, majorver, minorver, hotfixver, buildver, revisionver, descriptioncount)`;


                    // 프론트에서 가공되지 않은 파일을 보냈을때
                    // 벡엔드에서 트리순회를 하기위한 확인작업
                    //if (typeof (req.body.data) != 'object')
                    //{
                    //    const index = req.body.data.IndexOF('=');
                    //    req.body.data = req.body.data.substring(0, index);
                    //    req.body.data = JSON.parse(req.body.data);
                    //}

                    if (pre_ver != null)
                    {
                        for (const language of add_list_result)
                        {
                            // 전 버전의 번역 데이터를 새로운 버전의 데이터에 덮어씌우기 위해 SELECT
                            const pre_ver_where_string = `language = '${language.language}' AND majorver = ${pre_ver.majorver} AND minorver = ${pre_ver.minorver} AND hotfixver = ${pre_ver.hotfixver} AND buildver = ${pre_ver.buildver} AND revisionver = ${pre_ver.revisionver}`;
                            const pre_ver_language_query = `SELECT * FROM transdata_${req.body.projectid}_${req.body.resourcetype} WHERE ${pre_ver_where_string}`;
                            const pre_ver_language = connection.query(pre_ver_language_query);

                            var laguage_object = Object();
                            // Key로 접근하기 위해 Array -> Key : Value의 객체로 변환
                            for (const item of pre_ver_language)
                            {
                                laguage_object[item.transkey] = item.translation;
                            }
                            pre_ver_object[language.language] = laguage_object;
                        }
                    }
                    // 백엔드에서 트리순회할때 코드
                    //let value_string = await startUP.MakeValueString(`transdata_${req.body.projectid}_${req.body.resourcetype}`, req.body.data, '', req.body.language, req.body.majorver, req.body.minorver, req.body.hotfixver, req.body.buildver, req.body.revisionver);

                    let value_string = '';
                    for (const item of req.body.data)
                    {
                        if (typeof (item.transkey) != 'undefined')
                        {
                            item.transkey = item.transkey.replace(/'/gi, "''");
                            item.transkey = item.transkey.replace(/\\n/gi, "\\\\n");
                        }
                        if (typeof (item.translation) != 'undefined')
                        {
                            item.translation = item.translation.replace(/'/gi, "''");
                            item.translation = item.translation.replace(/\\n/gi, "\\\\n");
                            item.translation = "'" + item.translation + "'";
                        }
                        else
                            item.translation = null;
                        const subquery = `(SELECT IFNULL(MAX(descriptioncount),0) FROM transdata_${req.body.projectid}_${req.body.resourcetype} temp WHERE tree = '${item.tree}' AND transkey = '${item.transkey}' ORDER BY majorver DESC, minorver DESC, hotfixver DESC, buildver DESC, revisionver DESC LIMIT 1)`;
                        value_string += `('${item.tree}', '${item.transkey}', ${item.translation}, '${req.body.language}', ${req.body.majorver}, ${req.body.minorver}, ${req.body.hotfixver}, ${req.body.buildver}, ${req.body.revisionver}, ${subquery}),\n`;
                        count++;
                    }
                    value_string = value_string.substring(0, value_string.length - 2);
                    var query_string = `INSERT INTO ${table_string} VALUES ${value_string}` + 'ON DUPLICATE KEY UPDATE translation = VALUES(`translation`)';
                    connection.query(query_string);

                    // 다른 언어도 추가
                    if (add_list_result.length != 0)
                    {
                        for (const language of add_list_result)
                        {
                            const language_data = pre_ver_object[language.language];
                            for (const item of req.body.data)
                            {
                                let translation = null;
                                if (typeof (language_data[item.transkey]) != 'undefined')
                                {
                                    translation = language_data[item.transkey];
                                    translation = translation.replace(/'/gi, "''");
                                    translation = translation.replace(/\\n/gi, "\\\\n");
                                    translation = "'" + translation + "'";
                                }
                                const subquery = `(SELECT IFNULL(MAX(descriptioncount),0) FROM transdata_${req.body.projectid}_${req.body.resourcetype} temp WHERE tree = '${item.tree}' AND transkey = '${item.transkey}' ORDER BY majorver DESC, minorver DESC, hotfixver DESC, buildver DESC, revisionver DESC LIMIT 1)`;

                                other_language_value_string += `('${item.tree}', '${item.transkey}', ${translation}, '${language.language}', ${req.body.majorver}, ${req.body.minorver}, ${req.body.hotfixver}, ${req.body.buildver}, ${req.body.revisionver}, ${subquery}),\n`;
                            }
                            //other_language_value_string += await startUP.MakeValueString(`transdata_${req.body.projectid}_${req.body.resourcetype}`, req.body.data, '', item.language, req.body.majorver, req.body.minorver, req.body.hotfixver, req.body.buildver, true, pre_ver_object);
                        }
                        other_language_value_string = other_language_value_string.substring(0, other_language_value_string.length - 2);
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
    //startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
};

/*----------------------------------------------------------*/
// SelectData
// 설명 : 리소스 데이터를 조회 하는 API 함수
// 가장 최신 buildver을 보내준다
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
//                  minorver,
//                  hotfixver,
//                  buildver
//
//                  Web 일 경우
//                  transid,
//                  tree,
//                  transkey,
//                  translation,
//                  language,
//                  majorver,
//                  minorver
//                  hotfixver,
//                  buildver
//               },
//           ]
//       }
/*----------------*////////////////////////*----------------*/
exports.SelectData = async function (req, res) {
    //startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;
    try {

        // 필수 값 체크
        const check = await startUP.CheckBody(req.body, ['projectid', 'majorver', 'minorver', 'hotfixver', 'buildver', 'resourcetype', 'language']);
        if (check != true) {
            result_array.resultCode = check;
            res.send(result_array);
            startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
            return;
        }

        // DB 연결
        var connection = startUP.Connection;

        const project_data = connection.query(`SELECT * FROM project WHERE projectid = ${req.body.projectid}`);
        if (project_data.length == 0) {
            result_array.resultCode = 'NOT EXIST PROJECT';
            res.send(result_array);
            startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
            return;
        }
        var projectname = project_data[0].projectname.replace(/ /gi, '_');

        const buildver_subquery_string = '(SELECT MAX(buildver) FROM project_version WHERE ' + `language = '${req.body.language}' AND majorver = ${req.body.majorver} AND minorver = ${req.body.minorver} AND hotfixver = ${req.body.hotfixver} AND resourcetype = '${req.body.resourcetype}' AND projectid = ${req.body.projectid})`;

        const table_string = `transdata_${req.body.projectid}_${req.body.resourcetype}`;
        //const where_string = `language = '${req.body.language}' AND majorver = ${req.body.majorver} AND minorver = ${req.body.minorver} AND hotfixver = ${req.body.hotfixver} AND buildver = ${buildver_subquery_string}`;
        //const query_string = `SELECT * FROM ${table_string} WHERE ${where_string}`;


        const where_string = `language = '${req.body.language}' AND majorver = ${req.body.majorver} AND minorver = ${req.body.minorver} AND hotfixver = ${req.body.hotfixver} AND buildver = ${req.body.buildver}`;
        const query_string = `SELECT * FROM ${table_string} WHERE ${where_string}`;

        const query_result = connection.query(query_string);

        result_array.data = query_result; // 관리자가 등록한 최신버전 ->  이슈 테이블에 등록된 버전
        //result_array.olddata = query_result_old; // 이슈 테이블에 등록된 버전 -> 위의 전 버전, 근데 0일경우?

        const premax_ver_query = `SELECT * FROM project_version WHERE language = '${req.body.language}' AND resourcetype = '${req.body.resourcetype}' AND projectid = ${req.body.projectid} ORDER BY majorver DESC, minorver DESC, hotfixver DESC`;
        const ver_list = connection.query(premax_ver_query);

        var premax_ver = null;
        var checked = false;
        for (const ver in ver_list) {
            if (checked == true) {
                premax_ver = ver_list[ver];
                break;
            }
            if (ver_list[ver].majorver == req.body.majorver) {
                if (ver_list[ver].minorver == req.body.minorver) {
                    if (ver_list[ver].hotfixver == req.body.hotfixver) {
                        if (ver_list[ver].buildver == req.body.buildver)
                            checked = true;
                    }
                }
            }
        }

        if (premax_ver != null) {
            const where_string_old = `language = '${req.body.language}' AND majorver = ${premax_ver.majorver} AND minorver = ${premax_ver.minorver} AND    hotfixver = ${premax_ver.hotfixver} AND buildver = ${premax_ver.buildver}`;
            const query_string_old = `SELECT * FROM ${table_string} WHERE ${where_string_old}`;
            const query_result_old = connection.query(query_string_old);
            result_array.olddata = query_result_old;
        }

    }
    catch (err) {
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
exports.AddData = async function (req) 
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
            startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
            return;
        }

        // DB 연결
        var connection = startUP.Connection;

        // 실제로 존재하는 프로젝트인지 확인
        const project_query = connection.query(`SELECT * FROM project WHERE projectid = ${req.body.projectid}`);
        if (project_query.length == 0) 
        {
            result_array.resultCode = 'NOT EXIST PROJECT';
            res.send(result_array);
            startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
            return;
        }

        // 추가되는 언어의 영어버전 데이터 SELECT
        const table_string = `transdata_${req.body.projectid}_${req.body.resourcetype}`;
        const where_string = `language = 'english' AND majorver = ${req.body.majorver} AND minorver = ${req.body.minorver} AND hotfixver = ${req.body.hotfixver} AND buildver = ${req.body.buildver} AND revisionver = ${req.body.revisionver}`;
        const query_string = `SELECT * FROM ${table_string} WHERE ${where_string}`;

        const query_result = connection.query(query_string);

        // 영어버전 데이터가 없는경우
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
                if (typeof (req.body.data) != 'undefined') 
                {
                    //var parser = require('fast-xml-parser');
                    //var options =
                    //{
                    //    attributeNamePrefix: "",
                    //    attrNodeName: "attr", //default is 'false'
                    //    textNodeName: "#text",
                    //    ignoreAttributes: false,
                    //    ignoreNameSpace: false,
                    //    allowBooleanAttributes: false,
                    //    parseNodeValue: true,
                    //    parseAttributeValue: false,
                    //    trimValues: false,
                    //    cdataTagName: "__cdata", //default is 'false'
                    //    cdataPositionChar: "\\c",
                    //    localeRange: "", //To support non english character in tag/attribute values.
                    //    parseTrueNumberOnly: false
                    //}

                    //if (parser.validate(req.body.data) === true)
                    //    var data = parser.parse(req.body.data, options);
                }

                var insert_table_string = `${table_string}(transkey, original, language, majorver, minorver, hotfixver, buildver, revisionver, descriptioncount, translation)`;

                // 영어 버전 데이터를 루프
                for (var row of query_result) 
                {
                    row.original = row.original.replace(/\\n/gi, "\\\\n");
                    var translation = null;

                    // 파일을 첨부한 경우
                    if (typeof (req.body.data) != 'undefined') 
                    {
                        for (const transitem of req.body.data) 
                        {
                            translation = null;
                            if (transitem.transkey == row.transkey) 
                            {
                                if (transitem.translation != null) 
                                {
                                    translation = transitem.translation.replace(/\\n/gi, "\\\\n");
                                    translation = translation.replace(/'/gi, "''");
                                    translation = "'" + translation + "'";
                                }
                                break;
                            }
                        }
                    }
                    insert_value_string += `("${row.transkey}", "${row.original}", "${req.body.language}", ${req.body.majorver}, ${req.body.minorver}, ${req.body.hotfixver}, ${req.body.buildver}, ${req.body.revisionver}, ${row.descriptioncount}, ${translation}),\n`;
                }
                break;
            case 'web':
                var insert_table_string = `${table_string}(tree, transkey, language, majorver, minorver, hotfixver, buildver, revisionver, descriptioncount, translation)`;

                // 바디에 담긴데이터를 key value 객체로 변환               
                if (typeof (req.body.data) != 'undefined') 
                {
                    var transdata_language = Object();
                    for (const row of req.body.data)
                    {
                        transdata_language[row.transkey] = row.translation;
                    }
                }

                // 영어 버전 데이터 루프
                for (var row of query_result) 
                {
                    var translation = null;
                    if (typeof (req.body.data) != 'undefined') 
                    {
                        if (typeof (transdata_language[row.transkey]) != 'undefined')
                        {
                            translation = transdata_language[row.transkey];
                            translation = translation.replace(/\\n/gi, "\\\\n");
                            translation = translation.replace(/'/gi, "''");
                            translation = "'" + translation + "'";
                        }
                    //    var target = req.body.data;
                    //    translation = 'NULL';
                    //    const treearray = row.tree.split('/');
                    //    for (const treeitem of treearray) 
                    //    {
                    //        if (treeitem == '')
                    //            continue;
                    //        if (typeof (target[treeitem]) == 'undefined')
                    //            break;
                    //        target = target[treeitem];
                    //    }

                    //    if (target != req.body.data) 
                    //    {
                    //        if (target[row.transkey] != null) 
                    //        {
                    //            translation = target[row.transkey];
                    //            translation = translation.replace(/\\n/gi, "\\\\n");
                    //            translation = translation.replace(/'/gi, "''");
                    //        }
                    //    }
                    }
                    insert_value_string += `("${row.tree}", "${row.transkey}", "${req.body.language}", ${req.body.majorver}, ${req.body.minorver}, ${req.body.hotfixver}, ${req.body.buildver}, ${req.body.revisionver}, ${row.descriptioncount}, ${translation}),\n`;
                }
                break
            default:
                break;
        }
        insert_value_string = insert_value_string.substring(0, insert_value_string.length - 2);
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
                        if (item.translation == null)
                            query_string += `UPDATE ${table_string} SET \`translation\` = NULL WHERE \`transid\` = ${item.transid};\n`;
                        else {
                            item.translation = item.translation.replace(/'/gi, "''");
                            item.translation = item.translation.replace(/\\n/gi, "\\\\n");
                            query_string += `UPDATE ${table_string} SET \`translation\` = '${item.translation}' WHERE \`transid\` = ${item.transid};\n`;
                        }
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
exports.Test = async function (req, res) {
    console.log(req);
};

exports.SelectDomain = async function (req, res) {
    try {
        startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));

        var result_array = Object();
        result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

        // post로 받은 데이터중 필수로 있어야 하는것 체크
        const check = await startUP.CheckBody(req.body, ['language']);
        if (check != true) {
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
    catch (err) {
        result_array.resultCode = err.code;
        result_array.message = err.message;
    }

    res.send(result_array);
    startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
};

exports.TestURL = async function (req, res) {
    try {
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
    catch (err) {
        result_array.resultCode = err.code;
        result_array.message = err.message;
    }

    res.send(result_array);
    startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
};

exports.TestDescriptionData = async function (req, res) {
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;
    try {
        startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));

        // 동기 DB
        const connection = startUP.Connection;

        const table_string = `transdata_description(\`projectid\`, \`resourcetype\`, \`transid\`, \`type\`, \`content\`)`;
        const value_string = `(${req.body.projectid}, '${req.body.resourcetype}', ${req.body.transid}, '${req.body.type}', '${req.body.content}')`;
        const query_string = `INSERT INTO ${table_string} VALUES ${value_string}`;

        connection.query(query_string);
    }
    catch (err) {
        result_array.resultCode = err.code;
        result_array.message = err.message;
    }

    res.send(result_array);
    startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
};