
async function MakeValueString(jsonString, treedata, language, majorver, minorver)
{
    let valueString = '';
    for (inner in jsonString)
    {
        if (typeof (jsonString[inner]) == 'object')
        {
            valueString += await MakeValueString(jsonString[inner], treedata + '/' + inner, language, majorver, minorver);
        }
        else
        {
            if (typeof (jsonString[inner]) == 'undefined')
                valueString += `\n("${treedata}", "${inner}", "", "${language}", ${majorver}, ${minorver}),`;
            else
                valueString += `\n("${treedata}", "${inner}", "${jsonString[inner]}", "${language}", ${majorver}, ${minorver}),`;
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


module.exports.MakeValueString = MakeValueString;
module.exports.MakeJsObject = MakeJsObject;