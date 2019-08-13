'use strict';
const express = require('express');
const sync = require('sync');
const router = express.Router();
const startUP = require('../public/javascripts/Common/StartUP');
const bodyparser = require('body-parser');
const DomParser = require('dom-parser');
const fs = require('fs');

// 데이터 요청 모듈
const account = require('./function/accout');
const project = require('./function/project');
const issue = require('./function/issue');
const translate = require('./function/translate');
const comment = require('./function/comment');

//const mysql = require('../public/javascripts/Common/DB');

// 시작, 끝에서 로그
//  startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
//  startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));

//async function (connection, result_array, query_string, save = true);
//{
//    try
//    {
//        const data = connection.query(query_string);
//        if (save == true)
//            result_array.data = data;
//        return true;
//    }
//    catch (err)
//    {
//        result_array.resultCode = err.code;
//        result_array.message = err.message;
//        return false;
//    }
//}


/* GET home page. */
router.get('/', function (req, res)
{
    res.render('index', { title: 'Express' });
});

/* POST home page. */
router.post('/', function (req, res)
{
    res.render('index', { title: 'Express' });
});

router.post('/login', account.LoginCheck);

router.post('/account/create_account', account.CreateAccount);
router.post('/account/select_account', account.SelectAccount);
router.post('/account/update_account', account.UpdateAccount);


router.post('/project/create_project', project.CreateProject);
router.post('/project/select_project', project.SelectProject);
router.post('/project/delete_project', project.DeleteProject);

router.post('/projectver/create_projectver', project.CreateVersion);
router.post('/projectver/select_projectver', project.SelecteVersion);
router.post('/projectver/delete_projectver', project.DeleteVersion);

router.post('/issue/create_issue', issue.CreateIssue);
router.post('/issue/select_issue', issue.SelectIssue);
router.post('/issue/update_issue', issue.UpdateIssue);

router.post('/translate/import_data', translate.ImportData);
router.post('/translate/export_data', translate.ExportData);

router.post('/issue/comment/create_comment', comment.CreateComment);
router.post('/issue/comment/select_comment', comment.SelectComment);
router.post('/issue/comment/update_comment', comment.UpdateComment);
router.post('/issue/comment/delete_comment', comment.DeleteComment);

router.get('/logview', async function (req, res)
{
    const connection = startUP.DB.sync();
    try
    {
        const date = new Date().yyyymm();
        var logdata = connection.query(`SELECT * FROM systemlog_${date} ORDER BY \`no\` DESC LIMIT 100`);
    }
    catch (err)
    {
        return;
    }
    //res.render('logview', { data: logdata })

    let result_object = Object();
    result_object.data = logdata;
    res.send(result_object);

});

router.post('/test', translate.Test);

module.exports = router;
