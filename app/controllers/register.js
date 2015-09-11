var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/register', function (req, res) {
    res.render('register');
});

router.post('/register', passport.authenticate('register', {
    successRedirect: '/home',
    failureRedirect: '/login'
}));

module.exports = function (app) {
    app.use('/', router);
};
