var express = require('express');
var router = express.Router();
var Email = require('email').Email;
var User = require('../models/user');

router.get('/verify', function (req, res) {

    User.findOrCreate({
        email: req.query.email
    }, function (err, user, created) {

        var email = new Email({
            from: '有个地<support@yougedi.com>',
            to: req.query.email,
            subject: 'test',
            body: 'test123'
        });

        if (created) {
            return email.send(function (err, reply) {
                res.send('{"status":"success","data":200,"message":"确认邮件已经发送到您的邮箱"}');
            });
        }

        if (!user.password) {
            return email.send(function (err, reply) {
                res.send('{"status":"success","data":300,"message":"该邮箱等待验证"}');
            });
        }

        res.send('{"status":"fail","data":400,"message":"该邮箱已经注册"}');
    });
});

module.exports = function (app) {
    app.use('/', router);
};
