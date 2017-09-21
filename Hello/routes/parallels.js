/**
 * Created by zxy on 2017/9/21.
 */
let express = require('express');
let router = express.Router();

let parallelsData = require('../config/parallels.json');

router.get('/', function(req, res, next) {
    res.render('parallels', { data: parallelsData });
});

module.exports = router;