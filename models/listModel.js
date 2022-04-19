const mongoose = require('mongoose');

// mongoose.Schema()創建表格欄位的定義schema
let listSchema = new mongoose.Schema({
    'title': String,
    'content': String,
    'status': Boolean
});

// xxSchema.set('欲設定的層級(ex. collection)', '欲設定的名稱(ex. todolist)');
listSchema.set('collection', 'todolist');

// mongoose.model('model名稱', xxSchema)按照定義好的schema創建model，並將model存在listModel的變數中
const listModel = mongoose.model('listModel', listSchema);

module.exports = listModel;