
async function MakeValueString(table, jsonString, treedata, language, majorver, minorver, hotfixver, buildver, revisionver, noteng = false, pre_ver_data = null)
{
    let valueString = '';
    for (inner in jsonString)
    {
        if (typeof (jsonString[inner]) == 'object')
        {
            valueString += await MakeValueString(table, jsonString[inner], treedata + '/' + inner, language, majorver, minorver, hotfixver, buildver, revisionver, noteng, pre_ver_data);
        }
        else
        {
            const subquery = `(SELECT IFNULL(MAX(descriptioncount),0) FROM ${table} temp WHERE tree = '${treedata}' AND transkey = '${inner}' ORDER BY majorver DESC, minorver DESC, hotfixver DESC, buildver DESC, revisionver DESC LIMIT 1)`;

            var translation = 'NULL';
            if (typeof (jsonString[inner]) == 'undefined' || noteng)
            {
                if (typeof (pre_ver_data[language]) != 'undefined')
                {
                    const language_data = pre_ver_data[language];
                    if (typeof (language_data[inner]) != 'undefined')
                    {
                        translation = language_data[inner];
                        translation = translation.replace(/'/gi, "''");
                        translation = translation.replace(/\\n/gi, "\\\\n");
                        translation = `'${translation}'`;
                    }
                }
            }
            else
            {
                translation = `'${jsonString[inner]}'`;
            }
            
            valueString += `\n('${treedata}', '${inner}', ${translation}, "${language}", ${majorver}, ${minorver}, ${hotfixver},${buildver}, ${revisionver}, ${subquery}),\n`;
        }
    }
    return valueString;
}

async function MakeJsObject(DBdata)
{
    let return_data = Object();
    for (const item of DBdata)
    {
        let moving_target = return_data;
        const tree = item.tree.split('/');
        for (const treeitem of tree)
        {
            if (treeitem == '')
                continue;
            if (typeof(moving_target[treeitem]) == 'undefined')
                moving_target[treeitem] = {};
            moving_target = moving_target[treeitem];
        }
        moving_target[item.transkey] = item.translation;
    }
    return return_data;
}

async function MakeDescriptionValueString(jsonString, treedata, valuepart)
{
    let valueString = '';
    for (const inner in jsonString)
    {
        if (typeof (jsonString[inner]) == 'object')
        {
            valueString += await MakeDescriptionValueString(jsonString[inner], treedata + '/' + inner, valuepart);
        }
        else
        {
            jsonString.transkey = jsonString.transkey.replace(/'/gi, "''");
            jsonString.content = jsonString.content.replace(/'/gi, "''");
            jsonString.caption = jsonString.caption.replace(/'/gi, "''");
            valueString += `(${valuepart}, '${jsonString.transkey}', '${jsonString.content}', '${jsonString.caption}', '${treedata}'),\n`
            return valueString;
        }
    }
    return valueString;
}

function FindPreVer(ver_list, majorver, minorver, hotfixver, buildver, revision = null)
{
    var premax_ver = null;
    var checked = false;
    for (const ver of ver_list)
    {
        if (checked == true)
        {
            premax_ver = ver;
            break;
        }
        if (ver.majorver == majorver)
        {
            if (ver.minorver == minorver)
            {
                if (ver.hotfixver ==hotfixver)
                {
                    if (ver.buildver == buildver)
                    {
                        if (revision == null)
                            checked = true;
                        else
                        {
                            if (ver.revisionver == revision)
                                checked = true;
                        }    
                    }
                }
            }
        }
    }
    return premax_ver;
}


module.exports.MakeValueString = MakeValueString;
module.exports.MakeDescriptionValueString = MakeDescriptionValueString;
module.exports.MakeJsObject = MakeJsObject;
module.exports.FindPreVer = FindPreVer;