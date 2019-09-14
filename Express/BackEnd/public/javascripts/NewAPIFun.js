const startUP = require('./Common/StartUP');
const Translate = require('../../routes/newapi/Translate');

module.exports.ExportData = async function (req)
{
    // 일단 먼저 동기DB 사용
    var Connection = startUP.Connection;

    var result_data = [];
    const data = req.body.data;

    // 최신 버전을 먼저 조회 
    try
    {
        // 가장 최신 버전 찾기
        const lated_ver = `SELECT * FROM project_version WHERE projectid = ${req.body.projectid} AND language = '${req.body.language}' AND resourcetype = '${req.body.resourcetype}' ORDER BY majorver DESC, minorver DESC, hotfixver DESC, buildver DESC, revisionver DESC LIMIT 1`;
        const lated_ver_result = Connection.query(lated_ver)[0];


        // 리비전 버전 추가
        const table_string = `transdata_${req.body.projectid}_${req.body.resourcetype}`;
        const where_string = `language = '${req.body.language}' AND majorver = ${lated_ver_result.majorver} AND minorver = ${lated_ver_result.minorver} AND hotfixver = ${lated_ver_result.hotfixver} AND buildver = ${lated_ver_result.buildver} AND revisionver = ${lated_ver_result.revisionver}`;
        var query_string = `SELECT * FROM ${table_string} WHERE ${where_string}`;

        var query_result = Connection.query(query_string);
    }
    catch (err)
    {
        startUP.SystemLog(req.url, req.ip, `${err.code} : ${query_string}`);
    }

    // array안에 있는 요청된 버전 모두 조회
    for (const work of data)
    {
        try
        {
            // 리비전 버전이 없으면 찾아야함
            if (typeof (work.revisionver) == 'undefined')
            {
                const max_revision_query = `SELECT revisionver FROM project_version WHERE majorver = ${work.majorver} AND minover = ${work.minorver} AND hotfixver = ${work.hotfixver} AND buildver = ${work.buildver} ORDER BY revisionver DESC LIMIT 1`;
                work.revisionver = Connection.query(max_revision_query)[0].revisionver;
            }

            // 리비전 버전 추가
            const table_string = `transdata_${req.body.projectid}_${req.body.resourcetype}`;
            const where_string = `language = '${req.body.language}' AND majorver = ${work.majorver} AND minorver = ${work.minorver} AND hotfixver = ${work.hotfixver} AND buildver = ${work.buildver} AND revisionver = ${work.revisionver}`;
            var query_string = `SELECT * FROM ${table_string} WHERE ${where_string}`;

            const query_result = Connection.query(query_string);
            result_data.push(query_result)

        }
        catch (err)
        {
            startUP.SystemLog(req.url, req.ip, `${err.code} : ${query_string}`);
            result_data.push(`error ${work.majorver}.${work.minorver}.${work.hotfixver}.${work.buildver}.${work.revisionver}`);
        }
    }
    // query_result의 범위는 처음에 조회한 최신버전 var query_result
    result_data.push(query_result);

    return result_data;
}


/*----------------------------------------------------------*/
// ImportData
// 설명 : 리소스 파일을 읽어서 데이터베이스에 추가하는 API함수
// 입력 : projectid, majorver, minorver, hotfixver, buildver resourcetype, language, data
// 리턴 : result_array
//       {
//           resultCode = 0 (성공) or 실패 데이터, count
//       }
/*
 * 
 * 
 */
/*----------------*////////////////////////*----------------*/
module.exports.ImportData = async function ImportData (req)
{
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

    try
    {
        var check = await startUP.CheckBody(req.body, ['projectid', 'majorver', 'minorver', 'hotfixver', 'buildver', 'revisionver', 'resourcetype', 'language']);
        if (check != true)
        {
            result_array.resultCode = check;
            res.send(result_array);
            return;
        }

        var connection = startUP.Connection;
        var count = 0;
    }
    catch (err)
    {

    }
}

// Project

/*----------------------------------------------------------*/
// CreateVersion
// 설명 : 버전을 생성하는 API함수
// 입력 : projectid, majorver, minorver, hotfixver, language
// 리턴 : result_array
//       {
//           resultCode = 0 (성공) or 실패 데이터
//       }
/*
 * 요청받은 버전을 추가한다
 * 리비전 버전이 없을경우 해당프로젝트에서 사용하는 모든 언어로 버전을 추가한다
 * 리비전 버전이 있는경우는 해당 버전으로 버전을 추가하며 전 버전의 번역데이터를 최대한 이전한다
 * 리비전 버전이 있는 경우는 리비전 버전이 없는경우로부터 재귀호출된다
 */
/*----------------*////////////////////////*----------------*/
module.exports.CreateVersion = async function CreateVersion (req)
{
    try
    {
        const check = await startUP.CheckBody(req.body, ['projectid', 'language', 'resourcetype', 'majorver', 'minorver', 'hotfixver', 'buildver']);
        if (check != true)
        {
            return;
        }

        var Connection = startUP.Connection;

        var revision = null;
        if (typeof(req.body.revisionver) == 'number')
        {
            // 리비전이 담긴것은 영어버전이 들어온 후 그곳에서 재귀호출 되거나
            // 기타 등등 사유로 딱 이 버전만 추가하면 되는경우
            // 번역데이터는 추가하지 않음
            revision = req.body.revisionver;

            // project_version 테이블에 새로운 빌드버전을 포함해서 Insert
            const table_string = `project_version(\`projectid\`, \`majorver\`, \`minorver\`, \`language\`, \`resourcetype\`, \`hotfixver\`, \`buildver\`, \`revisionver\`)`;
            const value_string = `(${req.body.projectid}, ${req.body.majorver}, ${req.body.minorver}, '${req.body.language}', '${req.body.resourcetype}', ${req.body.hotfixver}, ${req.body.buildver}, ${revision})`;
            const query_string = `INSERT INTO ${table_string} VALUES ${value_string}`;

            Connection.query(query_string);
        }
        else
        {
            // 영어가 아닌경우 영어의 리비전 번호 값을 가지고 작업해야함
            if (req.body.language != 'english')
            {
                const select_revisionver_query = `(SELECT revisionver FROM (SELECT IFNULL(MAX(revisionver), 0) AS revisionver FROM project_version WHERE projectid = ${req.body.projectid} AND language = 'english' AND resourcetype = '${req.body.resourcetype}' AND majorver = ${req.body.majorver} AND minorver = ${req.body.minorver} AND hotfixver = ${req.body.hotfixver} AND buildver = ${req.body.buildver}) temp)`;
                revisionver_result = Connection.query(select_revisionver_query);

                revision = revisionver_result[0].revisionver;
                req.body.revisionver = revision;
                // 리비전 버전 넣고 재귀호출
                await this.CreateVersion(req);
                // 영어가 아닌경우 데이터를 추가해줘야하므로
                Translate.AddData(req)
            }
            else
            {
                // 영어가 들어왔음
                // 리비전 버전이 올라가야 함
                // 다른언어도 따라와야함
                // 리비전 버전 넣고 재귀호출로 다른언어버전 추가 

                // 리비전 버전 구하기
                const select_revisionver_query = `(SELECT revisionver FROM (SELECT IFNULL(MAX(revisionver) + 1, 0) AS revisionver FROM project_version WHERE projectid = ${req.body.projectid} AND language = '${req.body.language}' AND resourcetype = '${req.body.resourcetype}' AND majorver = ${req.body.majorver} AND minorver = ${req.body.minorver} AND hotfixver = ${req.body.hotfixver} AND buildver = ${req.body.buildver}) temp)`;

                const revision_result = Connection.query(select_revisionver_query);

                revision = revision_result[0].revisionver;

                // project_version 테이블에 새로운 리비전버전을 포함해서 Insert
                const table_string = `project_version(\`projectid\`, \`majorver\`, \`minorver\`, \`language\`, \`resourcetype\`, \`hotfixver\`, \`buildver\`, \`revisionver\`)`;
                const value_string = `(${req.body.projectid}, ${req.body.majorver}, ${req.body.minorver}, '${req.body.language}', '${req.body.resourcetype}', ${req.body.hotfixver}, ${req.body.buildver}, ${revision})`;
                const query_string = `INSERT INTO ${table_string} VALUES ${value_string}`;

                Connection.query(query_string);
                Translate.ImportData(req);

                // 프로젝트에서 사용되는 영어 외 언어를 구한다
                // 사용이 된다는건 전버전의 번역 데이터가 존재함을 의미한다
                const language_list_query = `SELECT DISTINCT \`language\` FROM \`project_version\` WHERE projectid = ${req.body.projectid} AND resourcetype = '${req.body.resourcetype}' AND language != '${req.body.language}'`;

                const language_list_result = Connection.query(language_list_query);

                // 리비전버전을 포함해서 재귀호출
                for (const language of language_list_result)
                {
                    req.body.language = language;
                    this.CreateVersion(req);
                }
            }
        }
    }
    catch (err)
    {
        startUP.SystemLog(req.url, req.ip, err.code);
    }
    return revision;
}

