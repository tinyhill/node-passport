var express = require('express');
var request = require('request');
var router = express.Router();
var User = require('../models/user');

router.get('/profile/qq', function (req, res) {
    request.get({
        form: {
            access_token: req.query.access_token
        },
        url: 'https://graph.z.qq.com/moc2/me'
    }, function (err, response, body) {
        if (err) {
            res.json(err);
        } else {
            User.findOne({
                qq_openid: body.replace(/^(.*)\=/, '')
            }, function (err, user) {
                res.json(err || user);
            });
        }
    });
});

router.get('/profile/wechat', function (req, res) {
    request.get({
        form: {
            access_token: req.query.access_token,
            openid: req.query.openid,
            lang: 'zh_CN'
        },
        url: 'https://api.weixin.qq.com/sns/userinfo'
    }, function (err, response, body) {
        if (err) {
            res.json(err);
        } else {
            User.findOne({
                qq_openid: JSON.parse(body).openid
            }, function (err, user) {
                res.json(err || user);
            });
        }
    });
});

router.get('/profile/weibo', function (req, res) {
    request.post({
        form: {
            access_token: req.query.access_token
        },
        url: 'https://api.weibo.com/oauth2/get_token_info'
    }, function (err, response, body) {
        if (err) {
            res.json(err);
        } else {
            User.findOne({
                weibo_id: JSON.parse(body).uid
            }, function (err, user) {
                res.json(err || user);
            });
        }
    });
});

module.exports = function (app) {
    app.use('/', router);
};
