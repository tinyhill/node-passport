var express = require('express');
var router = express.Router();

router.get('/home', function (req, res) {
    if (req.isAuthenticated()) {
        res.render('home');
    } else {
        res.redirect('/login');
    }
});

module.exports = function (app) {
    app.use('/', router);
};
