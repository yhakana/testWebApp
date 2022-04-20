const express = require('express');
const router = express.Router();
// const uploadController = require('../controllers/uploadController.js');

const multer = require('multer');
const userModel = require('../models/users.js');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/uploads/'));
  },
  filename: function (req, file, cb) {
    let extension = file.originalname.split('.')[1];
    cb(null, Date.now() + '.' + extension);
  }
})
  
const upload = multer({ storage: storage });


// router.post('/upload', uploadController.upload.single('file123'), uploadController.uploadFile);
router.post('/myFile', upload.single('file'), function(req, res, next) {
  userModel.findOne({ 'user_ID': "101886" }, function(err, data) {
    console.log(req.file.filename);

    data.photos.push(req.file.filename);
    data.markModified('photos');
    data.save(function(err) {
      console.log('into data.save()');
      if(err) {
        res.json( {"status": 0, "msg": "upload error"} );
      }
      else {
        res.json( {"status": 1, "msg": "upload success", "photos": data.photos} );
      }
    });
  });
});

module.exports = router;
