var express = require('express');
var router = express.Router();

router.get('/forgotpassword', function (req, res) {
    res.render('forgotpassword');
});

module.exports = function (app) {
    app.use('/', router);
};
