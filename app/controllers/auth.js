var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/auth/qq',
    passport.authenticate('qq')
);

router.get('/auth/qq/callback',
    passport.authenticate('qq', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

router.get('/auth/wechat',
    passport.authenticate('wechat')
);

router.get('/auth/wechat/callback',
    passport.authenticate('wechat', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

router.get('/auth/weibo',
    passport.authenticate('weibo')
);

router.get('/auth/weibo/callback',
    passport.authenticate('weibo', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

module.exports = function (app) {
    app.use('/', router);
};
