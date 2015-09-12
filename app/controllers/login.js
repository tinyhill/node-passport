var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/login', function (req, res) {
    res.render('login', {
        message: req.flash('message')
    });
});

router.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = function (app) {
    app.use('/', router);
};
