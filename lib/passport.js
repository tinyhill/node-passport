var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var QqStrategy = require('passport-qq').Strategy;
var WechatStrategy = require('passport-wechat').Strategy;
var WeiboStrategy = require('passport-weibo').Strategy;
var bCrypt = require('bcrypt-nodejs');
var User = require('../app/models/user');

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

function isValidPassword(user, password) {
    return user.password ? bCrypt.compareSync(password, user.password) : false;
}

function getQuery(username) {
    if (/^(?:[a-z0-9]+[_\-+.]+)*[a-z0-9]+@(?:([a-z0-9]+-?)*[a-z0-9]+.)+([a-z]{2,})+$/i.test(username)) {
        return {
            email: username
        };
    } else if (/^1[3-9]\d{9}$/.test(username)) {
        return {
            mobile: username
        };
    } else {
        return {
            username: username
        };
    }
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
            User.findOrCreate(getQuery(username), function (err, user, created) {
                if (!created)
                    return done(err, false, req.flash('message', 'User Already Exists.'));
                done(err, user);
            });
        }
    ));

    passport.use('login', new LocalStrategy({
            passReqToCallback: true
        }, function (req, username, password, done) {
            User.findOne(getQuery(username), function (err, user) {
                if (!user)
                    return done(err, false, req.flash('message', 'User Not found.'));
                if (!isValidPassword(user, password))
                    return done(err, false, req.flash('message', 'Invalid Password'));
                done(err, user);
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
                gender: profile._json.gender,
                qq_nickname: profile._json.nickname,
                qq_figureurl: profile._json.figureurl
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
                gender: profile.gender,
                wechat_nickname: profile.nickname,
                wechat_headimgurl: profile.headimgurl,
                wechat_unionid: profile.unionid
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
            User.findOrCreate({
                weibo_id: profile.id
            }, {
                gender: profile._json.gender === 'm' ? '男' : '女',
                weibo_name: profile._json.name,
                weibo_profile_image_url: profile._json.profile_image_url
            }, function (err, user) {
                done(err, user);
            });
        }
    ));
};

module.exports = Passport;
