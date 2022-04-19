const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController.js');

router.post('/upload', uploadController.upload.single('file123'), uploadController.uploadFile);

module.exports = router;
