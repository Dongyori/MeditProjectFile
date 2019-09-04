﻿
async function MakeValueString(table, jsonString, treedata, language, majorver, minorver, hotfixver, buildver, noteng = false)
{
    let valueString = '';
    for (inner in jsonString)
    {
        if (typeof (jsonString[inner]) == 'object')
        {
            valueString += await MakeValueString(table, jsonString[inner], treedata + '/' + inner, language, majorver, minorver, hotfixver, buildver, noteng);
        }
        else
        {
            const subquery = `(SELECT IFNULL(MAX(descriptioncount),0) FROM ${table} temp WHERE tree = '${treedata}' AND transkey = '${inner}' ORDER BY majorver DESC, minorver DESC, hotfixver DESC, buildver DESC LIMIT 1)`;
            if (typeof (jsonString[inner]) == 'undefined' || noteng)
                valueString += `\n('${treedata}', '${inner}', NULL, '${language}', ${majorver}, ${minorver}, ${hotfixver}, ${buildver}, ${subquery}),\n`;
            else
                valueString += `\n('${treedata}', '${inner}', '${jsonString[inner]}', "${language}", ${majorver}, ${minorver},${hotfixver},${buildver}, ${subquery}),\n`;
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


module.exports.MakeValueString = MakeValueString;
module.exports.MakeJsObject = MakeJsObject;
module.exports.MakeDescriptionValueString = MakeDescriptionValueString;