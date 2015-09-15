var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/login', function (req, res) {
    res.render('login');
});

module.exports = function (app) {
    app.use('/', router);
};
