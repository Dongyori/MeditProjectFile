
// MYSQL API ERROR CODE
module.exports.TABLE_NOT_EXIST                           = 1146;

// Common Code
module.exports.RESULT_SUCCESS                            = 0;
module.exports.QUERY_ERROR                               = 1;
module.exports.QUERY_NO_RESULT                           = 3;

// AUTH 
module.exports.AUTH_ACCOUNTNO_ERROR                      = -1;
module.exports.AUTH_EMAIL_ERROR                          = -2;
module.exports.AUTH_EMAIL_DB_DATA_ERROR                  = -3;
module.exports.AUTH_PASSWORD_ERROR                       = -4;
module.exports.AUTH_SESSIONKEY_ERROR                     = -5;
module.exports.AUTH_SESSIONKEY_DB_DATA_ERROR             = -6;
module.exports.AUTH_SESSIONKEY_VALUE_ERROR               = -7;

module.exports.TRANSLATE_DATA_TABLE                      = 'translate_data_template';


module.exports.RESULT_MAJORVER_ERROR                     = -100;
module.exports.RESULT_MINORVER_ERROR                     = -101;
module.exports.FILE_TYPE_ERROR                           = -102;
module.exports.LANGUAGE_ERROR                            = -103;


module.exports.VER_TABLE_NOT_EXIST                       = -200;
module.exports.TRANSLATED_EXPORT_DATA_FILETYPE_ERROR     = -201;

// ISSUE
module.exports.ISSUE_TYPE_START                          = 0;
module.exports.ISSUE_TRANSLATE                           = 1;
module.exports.ISSUE_TYPE_END                            = 5;

// ISSUE
module.exports.ISSUE_ISSUENO_ERROR                       = -300;
module.exports.ISSUE_SUBJECT_ERROR                       = -301;
module.exports.ISSUE_TYPE_ERROR                          = -302;
module.exports.ISSUE_TYPE_VALUE_ERROR                    = -303;
module.exports.ISSUE_PRIORITY_ERROR                      = -304;
module.exports.ISSUE_PRIORITY_VALUE_ERROR                = -305;
module.exports.EMAIL_EXIST_ERROR                         = -306;
module.exports.DEADLINE_EXIST_ERROR                      = -307;


module.exports.ISSUE_STATUS_START                        = 0;
module.exports.OPEN                                      = 1;
module.exports.REJECT                                    = 2;
module.exports.CONFIRM                                   = 3;
module.exports.RESOLVED                                  = 4;
module.exports.CLOSE                                     = 5;
module.exports.ISSUE_STATUS_END                          = 6;

// ISSUE_
module.exports.ISSUE_UPDATE_HISTORYNO_ERROR              = -500;
module.exports.ISSUE_UPDATE_HISTORY_NOT_EXIST            = -501;

// ISSUE_COMMENT_CREATE
module.exports.ISSUE_CREATE_COMMENT_ISSUENO_ERROR        = -600;
module.exports.ISSUE_CREATE_COMMENT_COMMENT_ERROR        = -601;

// ISSUE_COMMENT_SELECT
module.exports.ISSUE_SELECT_COMMENT_ISSUENO_ERROR        = -700;

// ISSUE_COMMENT_UPDATE CODE
module.exports.ISSUE_COMMENT_NOT_DELETED                 = 0;
module.exports.ISSUE_COMMENT_DELETED                     = 1;

// ISSUE_COMMENT_UPDATE
module.exports.ISSUE_UPDATE_COMMENT_COMMENTNO_ERROR      = -800;
module.exports.ISSUE_UPDATE_COMMENT_NOT_EXIST_ERROR      = -801;


module.exports.EXPIRETIME                                = 'NOW()+3600';
// ISSUE_HISTORY ACTION
module.exports.ISSUE_HISTORY_ACTION_ADD_ISSUE            = 1;
module.exports.ISSUE_HISTORY_ACTION_MODIFY_SUBJECT       = 2;
module.exports.ISSUE_HISTORY_ACTION_MODIFY_ASSIGNEE      = 3;
module.exports.ISSUE_HISTORY_ACTION_MODIFY_STATUS        = 4;
module.exports.ISSUE_HISTORY_ACTION_ADD_COMMENT          = 5;
module.exports.ISSUE_HISTORY_ACTION_MODIFY_COMMENT       = 6;

    
module.exports.ISSUE_SELECT_HISTORY_ISSUENO_ERROR        = -900;


module.exports.ISSUE_UPDATE_HISTORY_HISTORYNO_ERROR      = -1000;


module.exports.ACCOUNT_NOT_EXIST_EMAIL                   = -1101;
module.exports.ACCOUNT_NOT_EXIST_PASSWORD                = -1102;
module.exports.ACCOUNT_NOT_EXIST_TYPE                    = -1103;
module.exports.ACCOUNT_ALREADY_EXIST_EMAIL               = -1104;