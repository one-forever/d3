/**
 * Created by zxy on 2017/9/29.
 */
let express = require('express');
let router = express.Router();


router.get('/:name1/:name2', function (req, res) {
    res.render(`hierarchy/${req.params.name1}/${req.params.name2}`, { title: `${req.params.name1}` });
});

module.exports = router;