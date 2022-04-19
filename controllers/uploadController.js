const multer = require('multer');
const userModel = require('../models/users.js');

exports.uploadFile = function(req, res, next) {
    userModel.findOne({ 'user_ID': "101886" }, function(err, data) {
        // 將filename存放入photos欄位
        data.photos.push(req.file.filename);
        // 透過markModified()標示data.photos欄位是被更改過的
        data.markModified('photos');
        // 透過model的save()來儲存變更過的資料
        data.save(function(err) {
            if(err) {
                res.json( {"status": 0, "msg": "upload error"} );
            }
            else {
                res.json( {"status": 1, "msg": "upload success", "photos": data.photos} );
            }
        });
    });
}

/* diskStorage() 用以設定儲存檔案的方式 */
const storage = multer.diskStorage({
    // 1. 設定檔案上傳的目錄
    //    cb(產生error時要做的動作, 上傳檔案的路徑)
    destination: function(req, file, cb) { 
        cb(null, '../uploads');
    },
    // 2. 設定儲存檔案時的命名規則
    //    將副檔名存在extension array中
    //    用目前日期作為檔名
    filename: function(req, file, cb) {         
        let extension = file.originalname.split('.');
        cb(null, Date.now() + '.' + extension[1]);
    }
});

/* upload變數儲存multer的設定，可直接呼叫此變數進行檔案上傳 */
exports.upload = multer({ storage: storage });