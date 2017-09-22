/**
 * Created by zxy on 2017/9/22.
 */

let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
    res.render('line');
});

router.get('/missing', function (req, res, next) {
    res.render('lines/missing');
});
module.exports = router;