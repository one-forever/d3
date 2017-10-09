var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'D3' });
});

router.get('/v4', function(req, res, next) {
    res.render('index-v4', { title: 'D3' });
});

router.get('/v4-2', function(req, res, next) {
    res.render('index-v4-2', { title: 'D3' });
});
module.exports = router;
