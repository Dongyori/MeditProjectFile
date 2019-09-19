
const startUP = require('../../public/javascripts/Common/StartUP');
const APIFun = require('../../public/javascripts/NewAPIFun');

/*----------------------------------------------------------*/
// CreateProject
// ���� : ������Ʈ�� �����ϴ� API�Լ�
// �Է� : projectname
// ���� : result_array
//       {
//           resultCode = 0 (����) or ���� ������
//       }
/*----------------*////////////////////////*----------------*/
exports.CreateProject = async function (req, res)
{
    // res�� ������ ���� �ʱ⼼��
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;
    try
    {
        startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));

        // post�� ���� �������� �ʼ��� �־�� �ϴ°� üũ
        const check = await startUP.CheckBody(req.body, ['projectname']);
        if (check != true)
        {
            // resultCode�� �����ڵ带 �����
            // ResultCode�� ������ �������� ������� string��ü�� ������ �����ؾ���
            result_array.resultCode = check;
            res.send(result_array);
            return;
        }

        // ���� DB
        const connection = startUP.Connection;

        const columns = connection.query("show full columns from `project`");

        // ���� ������ �����ϰ� �ϱ����� �ʱ� subject
        let table_string = 'project(`projectname`';
        let value_string = `('${req.body.projectname}'`;

        // �÷� ����� ��ȸ
        for (let column of columns)
        {
            // ���������� �����ϰ� �ϱ����� �ڵ� -- (,) ó��
            if (column.Field == 'projectname')
                continue;

            // �÷��� post�� ������ �ִٸ� ������ �߰�
            if (req.body[column.Field] != null)
            {
                table_string += `, \`${column.Field}\``;
                if (column.Type == 'int(11)' || column.Type == 'bigint(20)' || column.Type == 'tinyint(4)')
                    value_string += `, ${req.body[column.Field]}`;
                else
                    value_string += `, '${req.body[column.Field]}'`;
            }
        }

        // ���� ������
        table_string += ')';
        value_string += ')';
        const query_string = `INSERT INTO ${table_string} VALUES ${value_string}`;


        connection.query(query_string);
        // auto increment �� �������� (projectid)
        const result_ai = connection.query("SELECT LAST_INSERT_ID() AS AI");
        result_array.projectid = result_ai[0].AI;
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
// SelectProject
// ���� : ������Ʈ�� ����� ��ȸ�ϴ� API�Լ�
// �Է� :
// ���� : result_array
//       {
//           resultCode
//           data :
//           [
//               {
//                  projectid,
//                  projectname
//               },
//           ]
//       }
/*----------------*////////////////////////*----------------*/
exports.SelectProject = async function (req, res) {
    // res�� ������ ���� �ʱ⼼��
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;
    try {
        startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));

        // ���� DB
        const connection = startUP.Connection;

        const table_string = 'project';
        const query_string = `SELECT projectname AS \`project_name\`, projectid, usebuildver FROM ${table_string}`;


        var query_result = connection.query(query_string);
        result_array.data = query_result;
    }
    catch (err) {
        result_array.resultCode = err.code;
        result_array.message = err.message;
    }

    res.send(result_array);
    startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
};

/*----------------------------------------------------------*/
// DeleteProject
// ���� : ������Ʈ�� �����ϴ� API�Լ�
// �Է� : projectid
// ���� : result_array
//      {
//          resultCode = 0 (����) or ���� ������
//      }
/*----------------*////////////////////////*----------------*/
exports.DeleteProject = async function (req, res) {
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;
    try {
        startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
        // res�� ������ ���� �ʱ⼼��

        const check = await startUP.CheckBody(req.body, ['projectid']);
        if (check != true) {
            result_array.resultCode = check;
            res.send(result_array);
            return;
        }

        // ���� DB
        const connection = startUP.Connection;

        const query_string = `DELETE FROM project WHERE projectid = ${req.body.projectid}`;


        connection.query(query_string);
    }
    catch (err) {
        result_array.resultCode = err.code;
        result_array.message = err.message;
    }

    res.send(result_array);
    startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
};

/*----------------------------------------------------------*/
// CreateVersion
// ���� : ������ �����ϴ� API�Լ�
// �Է� : projectid, majorver, minorver, hotfixver, buildver, [revisionver], language
// ���� : result_array
//       {
//           resultCode = 0 (����) or ���� ������
//       }
/*----------------*////////////////////////*----------------*/
exports.CreateVersion = async function (req, res) 
{
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;
    try 
    {
        startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));

        // post�� ���� �������� �ʼ��� �־�� �ϴ°� üũ
        const check = await startUP.CheckBody(req.body, ['projectid', 'language', 'resourcetype', 'majorver', 'minorver', 'hotfixver', 'buildver']);
        if (check != true) 
        {
            result_array.resultCode = check;
            res.send(result_array);
            return;
        }

        result_array.revisionver = await APIFun.CreateVersion(req);
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
// SelectVersion
// ���� : ������ ��ȸ�ϴ� API�Լ�
// �Է� : projectid
// ���� : result_array
//       {
//           resultCode
//           data :
//           [
//               {
//                  versionid,
//                  majorver,
//                  minorver
//               },
//           ]
//       }
/*----------------*////////////////////////*----------------*/
exports.SelectVersion = async function (req, res) 
{
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;
    try {
        startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));


        // post�� ���� �������� �ʼ��� �־�� �ϴ°� üũ
        const check = await startUP.CheckBody(req.body, ['projectid', 'resourcetype']);
        if (check != true) {
            // resultCode�� �����ڵ带 �����
            // ResultCode�� ������ �������� ������� string��ü�� ������ �����ؾ���
            result_array.resultCode = check;
            res.send(result_array);
            return;
        }

        // ���� DB
        const connection = startUP.Connection;

        const table_string = `project_version JOIN project ON project_version.projectid = project.projectid`;
        const where_string = `project_version.projectid = ${req.body.projectid} AND resourcetype = '${req.body.resourcetype}'`;
        const query_string = `SELECT DISTINCT majorver, minorver, hotfixver, buildver, revisionver FROM ${table_string} WHERE ${where_string} ORDER BY majorver DESC, minorver DESC, hotfixver DESC, buildver DESC`;

        const query_string1 = `SELECT DISTINCT majorver, minorver, hotfixver, buildver FROM ${table_string} WHERE ${where_string} ORDER BY majorver DESC, minorver DESC, hotfixver DESC, buildver DESC`;

        const query_result = connection.query(query_string);
        const query_result1 = connection.query(query_string1);

        result_array.data = query_result;
        result_array.data2 = query_result1;
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
// SelectAllVersion
// ���� : ��� ������ ��ȸ�ϴ� API�Լ�
// �Է� : 
// ���� : result_array
//       {
//           resultCode
//           data :
//           [
//               {
//                  
//                  
//                  
//               },
//           ]
//       }
/*----------------*////////////////////////*----------------*/
exports.SelectAllVersion = async function (req, res) {
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;
    try {
        startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));

        // ���� DB
        const connection = startUP.Connection;

        const table_string = `project_version JOIN project ON project_version.projectid = project.projectid`;
        const query_string = `SELECT * FROM ${table_string}`;


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

/*----------------------------------------------------------*/
// SelectLanguage
// ���� : ������ �� ��ȸ�ϴ� API�Լ�
// �Է� : projectid, majorver, minorver, hotfixver
// ���� : result_array
//       {
//           resultCode
//           data :
//           [
//               {
//                  language
//               },
//           ]
//       }
/*----------------*////////////////////////*----------------*/
exports.SelectLanguage = async function (req, res) {
    try {
        startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));

        var result_array = Object();
        result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

        // post�� ���� �������� �ʼ��� �־�� �ϴ°� üũ
        const check = await startUP.CheckBody(req.body, ['projectid', 'resourcetype', 'majorver', 'minorver', 'hotfixver', 'buildver']);
        if (check != true) {
            // resultCode�� �����ڵ带 �����
            // ResultCode�� ������ �������� ������� string��ü�� ������ �����ؾ���
            result_array.resultCode = check;
            res.send(result_array);
            return;
        }

        // ���� DB
        const connection = startUP.Connection;

        const table_string = `project_version`;
        const where_string = `projectid = ${req.body.projectid} AND resourcetype = '${req.body.resourcetype}' AND majorver = ${req.body.majorver} AND minorver = ${req.body.minorver} AND hotfixver = ${req.body.hotfixver} AND buildver = ${req.body.buildver}`;
        const query_string = `SELECT DISTINCT language FROM ${table_string} WHERE ${where_string}`;


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

/*----------------------------------------------------------*/
// DeleteVersion (���, ���� ����ȭ�� ���� ���Ұ�)
// ���� : ������ �����ϴ� API�Լ�
// �Է� : projectid, majorver, minorver, hotfixver, language
// ���� : result_array
//       {
//           resultCode = 0 (����) or ���� ������
//       }
/*----------------*////////////////////////*----------------*/
exports.DeleteVersion = async function (req, res) {
    return;
    try {
        startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));

        var result_array = Object();
        result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

        // post�� ���� �������� �ʼ��� �־�� �ϴ°� üũ
        const check = await startUP.CheckBody(req.body, ['projectid', 'majorver', 'minorver', 'language']);
        if (check != true) {
            // resultCode�� �����ڵ带 �����
            // ResultCode�� ������ �������� ������� string��ü�� ������ �����ؾ���
            result_array.resultCode = check;
            res.send(result_array);
            return;
        }

        // ���� DB
        const connection = startUP.Connection;

        const table_string = `project_version`;
        const where_string = `projectid = ${req.body.projectid} AND majorver = ${req.body.majorver} AND minorver = ${$req.body.minorver} AND language ;${req.body.language}'`;
        const query_string = `DELETE FROM ${table_string} WHERE ${where_string}`;


        connection.query(query_string);
    }
    catch (err) {
        result_array.resultCode = err.code;
        result_array.message = err.message;
    }

    res.send(result_array);
    startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
};