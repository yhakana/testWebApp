let express = require('express');
let router = express.Router();

/* GET寫法(沒body) */
router.get('/sum', function(req, res) {
    let n1 = parseInt(req.query.num1);          // req.query取得網址列?後的參數值
    let n2 = parseInt(req.query.num2);
    let sum = n1 + n2;
    res.json({ mySum : sum });
});

/* POST寫法(有body) */
// router.post('/sum', function(req, res) {
//     let n1 = parseInt(req.body.num1);
//     let n2 = parseInt(req.body.num2);
//     let sum = n1 + n2;
//     res.json({ mySum : sum });
// });

module.exports = router;