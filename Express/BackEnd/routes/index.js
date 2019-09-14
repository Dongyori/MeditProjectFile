'use strict';
const express = require('express');
const sync = require('sync');
const router = express.Router();
const startUP = require('../public/javascripts/Common/StartUP');
const bodyparser = require('body-parser');
const DomParser = require('dom-parser');
const fs = require('fs');

// 데이터 요청 모듈
//const account = require('./api/Accout');
//const project = require('./api/Project');
//const issue = require('./api/Issue');
//const translate = require('./api/Translate');
//const comment = require('./api/Comment');
//const description = require('./api/Description');
//const language = require('./api/Language');

// 데이터 요청 모듈 , 5자리 버전 사용
const account = require('./newapi/Accout');
const project = require('./newapi/Project');
const issue = require('./newapi/Issue');
const translate = require('./newapi/Translate');
const comment = require('./newapi/Comment');
const description = require('./newapi/Description');
const language = require('./newapi/Language');


//const mysql = require('../public/javascripts/Common/DB');

// 시작, 끝에서 로그
//  startUP.SystemLog(req.url, req.ip, JSON.stringify(req.body));
//  startUP.SystemLog(req.url, req.ip, JSON.stringify(result_array));

/* GET home page. */
router.get('/', function (req, res)
{
    res.render('index', { title: 'Express' });
});

router.post('/login', account.LoginCheck);

router.post('/account/create_account', account.CreateAccount);
router.post('/account/select_account', account.SelectAccount);
router.post('/account/update_account', account.UpdateAccount);
router.post('/account/delete_account', account.DeleteAccount);

router.post('/project/create_project', project.CreateProject);
router.post('/project/select_project', project.SelectProject);
router.post('/project/delete_project', project.DeleteProject);

router.post('/projectver/create_projectver', project.CreateVersion);
router.post('/projectver/select_projectver', project.SelectVersion);
router.post('/projectver/select_all_projectver', project.SelectAllVersion);
router.post('/projectver/delete_projectver', project.DeleteVersion);

router.post('/projectlang/select_projectlang', project.SelectLanguage);

router.post('/issue/create_issue', issue.CreateIssue);
router.post('/issue/select_issue', issue.SelectIssue);
router.post('/issue/update_issue', issue.UpdateIssue);
router.post('/issue/start_issue', issue.StartIssue);
router.post('/issue/resolve_issue', issue.resolveIssue);
router.post('/issue/reopen_issue', issue.reopenIssue);

router.post('/issue/comment/create_comment', comment.CreateComment);
router.post('/issue/comment/select_comment', comment.SelectComment);
router.post('/issue/comment/update_comment', comment.UpdateComment);
router.post('/issue/comment/delete_comment', comment.DeleteComment);

router.post('/translate/import_data', translate.ImportData);
router.post('/translate/export_data', translate.ExportData);
//router.post('/translate/export_late_data', translate.ExportDataLated);
//router.post('/translate/select_data', translate.SelectData);
router.post('/translate/add_data', translate.AddData);
router.post('/translate/update_data', translate.UpdateData);
router.post('/translate/select_domain', translate.SelectDomain);
router.post('/translate/testURL', translate.TestURL);
router.post('/translate/TID', translate.TestDescriptionData);

router.post('/description/create_description', description.CreateDescription);
router.post('/description/select_description', description.SelectDescription);
router.post('/description/delete_description', description.DeleteDescription);

router.post('/language/add_language', language.AddLanguage);
router.post('/language/select_language', language.SelectLanguage);


router.get('/logview', async function (req, res)
{
    const connection = startUP.Connection;
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
