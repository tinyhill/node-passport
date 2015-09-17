var express = require('express');
var router = express.Router();
var request = require('request');
var User = require('../models/user');

router.get('/profile/qq', function (req, res) {

    var access_token = req.query.access_token;

    request({
        url: 'https://graph.qq.com/oauth2.0/me?access_token=' + access_token
    }, function (error, response, body) {

        if (error)
            return res.json(error);

        var result = JSON.parse(body.substring(body.indexOf('{'), body.lastIndexOf('}') + 1));

        if (result.error)
            return res.json(result);

        request({
            url: 'https://graph.qq.com/user/get_user_info?format=json' +
            '&access_token=' + access_token +
            '&oauth_consumer_key=' + result.client_id +
            '&openid=' + result.openid
        }, function (error, response, body) {

            if (error)
                return res.json(error);

            var profile = JSON.parse(body);

            if (profile.ret !== 0)
                return res.json(profile);

            User.findOrCreate({
                qq_openid: result.openid
            }, {
                display_name: profile.nickname,
                avatar: profile.figureurl_1,
                gender: profile.gender,
                province: profile.province,
                city: profile.city
            }, function (err, user) {
                res.json(err || user);
            });
        });
    });
});

router.get('/profile/wechat', function (req, res) {

    var access_token = req.query.access_token;
    var openid = req.query.openid;

    request({
        url: 'https://api.weixin.qq.com/sns/userinfo?lang=zh_CN' +
        '&access_token=' + access_token +
        '&openid=' + openid
    }, function (error, response, body) {

        if (error)
            return res.json(error);

        var profile = JSON.parse(body);

        if (profile.errcode)
            return res.json(profile);

        User.findOrCreate({
            wechat_openid: openid
        }, {
            display_name: profile.nickname,
            avatar: profile.headimgurl,
            gender: profile.sex === '2' ? '女' : '男',
            province: profile.province,
            city: profile.city,
            wechat_unionid: profile.unionid
        }, function (err, user) {
            res.json(err || user);
        });
    });
});

router.get('/profile/weibo', function (req, res) {

    var access_token = req.query.access_token;

    request.post({
        form: {
            access_token: access_token
        },
        url: 'https://api.weibo.com/oauth2/get_token_info'
    }, function (error, response, body) {

        if (error)
            return res.json(error);

        var result = JSON.parse(body);

        if (result.error)
            return res.json(result);

        request({
            url: 'https://api.weibo.com/2/users/show.json?access_token=' + access_token +
            '&source=' + result.appkey +
            '&uid=' + result.uid
        }, function (error, response, body) {

            if (error)
                return res.json(error);

            var profile = JSON.parse(body);

            if (profile.error)
                return res.json(profile);

            var loc = profile.location.split(' ');

            User.findOrCreate({
                weibo_id: profile.id
            }, {
                display_name: profile.screen_name,
                avatar: profile.profile_image_url,
                gender: profile.gender === 'f' ? '女' : '男',
                province: loc[0],
                city: loc[1]
            }, function (err, user) {
                res.json(err || user);
            });
        });
    });
});

module.exports = function (app) {
    app.use('/', router);
};
