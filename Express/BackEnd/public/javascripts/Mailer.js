var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'medit378@gmail.com',
        pass: 'apelxm1!'
    }
});

const mailFrom = 'medit378@gmail.com';

module.exports.SendMail = function SendMail(mailOptions)
{
    mailOptions.from = mailFrom;
    transporter.sendMail(mailOptions, (error, info) =>
    {
        if (error)
        {
            console.log(error);
        }
        else
        {
            console.log('Email sent! : ' + info.response);
        }
        transporter.close();
    })
};