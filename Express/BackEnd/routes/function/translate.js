const startUP = require('../../public/javascripts/Common/StartUP');

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
                const xml_js = require('xml-js');
                const data = await xml_js.xml2js(req.body.data, { compact: true, space: 4 });
                const project_data = connection.query(`SELECT * FROM project WHERE projectid = ${req.body.projectid}`);

                let value_string = ''

                for (let item of data.Translation.String)
                {
                    let tag = item._attributes.ID;
                    let original = item.Original._text;
                    let translated = item.Translated._text;



                    var table_string = `transdata_${project_data[0].projectname}_${req.body.type}` + '(`transkey`, `original`, `translation`, `language`, `majorver`, `minorver`)';
                    value_string += `("${tag}", "${original}", "${translated}", '${req.body.language}', ${req.body.majorver}, ${req.body.minorver}),\n`;
                    count++;
                }
                value_string = value_string.substring(0, value_string.length - 2);
                const query_string = `INSERT INTO ${table_string} VALUES ${value_string}`/* + ` ON DUPLICATE KEY UPDATE original = '${original}', translation = '${translated}'`*/;
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
            result_array.resultCode = FILE_TYPE_ERROR;
    }
    result_array.count = count;
    res.send(result_array);
    //startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));
    connection.dispose();
};

exports.ExportData = async function (req, res)
{
    //startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
    var result_array = Object();
    result_array.resultCode = startUP.ErrorCode.RESULT_SUCCESS;

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
    const where_string = `language = '${req.body.language}' AND majorver = '${req.body.majorver} AND minorver ${req.body.minorver}'`
    const query_string = `SELECT * FROM ${table_string} WHERE ${where_string}`;

    try
    {
        const query_result = connection.query(query_string);
        const xml_writer = require('xml-writer');
        switch (req.body.type)
        {
            case 'app':
                const xw = new xml_writer(true, '\t');
                xw.startDocument('1.0', 'UTF-8', false);
                xw.startElement('Translation');
                xw.writeAttribute('Version', `V${req.body.majorver}.${req.body.minorver}`)
                for (const item of query_result)
                {
                    xw.startElement('String');
                    xw.writeAttribute('ID', item.transkey);
                    xw.startElement('Original');
                    xw.text(`${item.original}`);
                    xw.endElement();
                    xw.startElement('Translated');
                    xw.text(`${item.translation}`);
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

exports.Test = async function (req, res)
{
    res.send(JSON.stringify(req.body));
}; 

