var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/register', function (req, res) {
    res.render('register', {
        message: req.flash('message')
    });
});

router.post('/register', passport.authenticate('register', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
}));

module.exports = function (app) {
    app.use('/', router);
};
