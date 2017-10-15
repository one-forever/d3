var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('timeline', { title: 'D3 timeline' });
});

module.exports = router;
