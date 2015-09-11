var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var QqStrategy = require('passport-qq').Strategy;
var WechatStrategy = require('passport-wechat').Strategy;
var bCrypt = require('bcrypt-nodejs');
var User = require('../app/models/user');

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}

var Passport = function () {

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('register', new LocalStrategy({
            passReqToCallback: true
        }, function (req, username, password, done) {
            User.findOrCreate({
                username: username
            }, function (err, user) {
                done(null, user);
            });
        }
    ));

    passport.use('login', new LocalStrategy({
            passReqToCallback: true
        }, function (req, username, password, done) {
            User.findOne({
                username: username
            }, function (err, user) {
                if (err)
                    return done(err);
                if (!user)
                    return done(null, false, req.flash('message', 'User Not found.'));
                if (!isValidPassword(user, password)) {
                    return done(null, false, req.flash('message', 'Invalid Password'));
                }
                done(null, user);
            });
        }
    ));

    passport.use(new QqStrategy({
            clientID: '101245023',
            clientSecret: '1a1c76befde401210becdcbb21aa8df7',
            callbackURL: 'http://passport.yougedi.com/auth/qq/callback'
        }, function (accessToken, refreshToken, profile, done) {
            User.findOrCreate({
                qq_id: profile.id
            }, {
                qq_nickname: profile.nickname,
                qq_gender: profile._json.gender,
                qq_province: profile._json.province,
                qq_city: profile._json.city,
                qq_year: profile._json.year,
                qq_figureurl: profile._json.figureurl
            }, function (err, user) {
                if (err) return done(err);
                done(null, user);
            });
        }
    ));

    passport.use(new WechatStrategy({
            appid: 'wx105e1734f66d5246',
            appsecret: '6d5fbee088a2e740fbf3a69160293939',
            callbackURL: 'http://passport.yougedi.com/auth/wechat/callback',
            scope: 'snsapi_base',
            state: true
        }, function (openid, profile, token, done) {
            User.findOrCreate({
                wechat_openid: openid
            }, {
                wechat_nickname: profile.nickname,
                wechat_sex: profile.sex,
                wechat_province: profile.province,
                wechat_city: profile.city,
                wechat_country: profile.country,
                wechat_headimgurl: profile.headimgurl,
                wechat_unionid: profile.unionid
            }, function (err, user) {
                if (err) return done(err);
                done(null, user);
            });
        }
    ));
};

module.exports = Passport;
