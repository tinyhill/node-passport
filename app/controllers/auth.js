var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/auth/qq',
    passport.authenticate('qq')
);

router.get('/auth/qq/callback',
    passport.authenticate('qq', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    })
);

router.get('/auth/wechat',
    passport.authenticate('wechat')
);

router.get('/auth/wechat/callback',
    passport.authenticate('wechat', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    })
);

module.exports = function (app) {
    app.use(router);
};
