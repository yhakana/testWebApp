var express = require('express');
var router = express.Router();                  // 每個router都需要由express生成

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
