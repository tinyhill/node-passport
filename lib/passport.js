var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var QqStrategy = require('passport-qq').Strategy;
var WechatStrategy = require('passport-wechat').Strategy;
var WeiboStrategy = require('passport-weibo').Strategy;
var User = require('../app/models/user');

var Passport = function () {

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new QqStrategy({
            clientID: '101245023',
            clientSecret: '1a1c76befde401210becdcbb21aa8df7',
            callbackURL: 'http://passport.yougedi.com/auth/qq/callback'
        }, function (accessToken, refreshToken, profile, done) {
            User.findOrCreate({
                qq_openid: profile.id
            }, {
                display_name: profile._json.nickname,
                avatar: profile._json.figureurl_1,
                gender: profile._json.gender,
                province: profile._json.province,
                city: profile._json.city
            }, function (err, user) {
                done(err, user);
            });
        }
    ));

    passport.use(new WechatStrategy({
            appid: 'wx60baa04c2ac7240e',
            appsecret: '86b0a8aafda790643415c29a9aa81a8d',
            callbackURL: 'http://passport.yougedi.com/auth/wechat/callback',
            scope: 'snsapi_base',
            state: true
        }, function (openid, profile, token, done) {
            User.findOrCreate({
                wechat_openid: openid
            }, {
                display_name: profile._json.nickname,
                avatar: profile._json.headimgurl,
                gender: profile._json.sex === '2' ? '女' : '男',
                province: profile._json.province,
                city: profile._json.city,
                wechat_unionid: profile._json.unionid
            }, function (err, user) {
                done(err, user);
            });
        }
    ));

    passport.use(new WeiboStrategy({
            clientID: '2476287589',
            clientSecret: '5687798bb4b18a61ec1b5beaded751ba',
            callbackURL: 'http://passport.yougedi.com/auth/weibo/callback'
        },
        function (accessToken, refreshToken, profile, done) {

            var loc = profile._json.location.split(' ');

            User.findOrCreate({
                weibo_id: profile.id
            }, {
                display_name: profile._json.screen_name,
                avatar: profile._json.profile_image_url,
                gender: profile._json.gender === 'f' ? '女' : '男',
                province: loc[0],
                city: loc[1]
            }, function (err, user) {
                done(err, user);
            });
        }
    ));
};

module.exports = Passport;
