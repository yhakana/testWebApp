const express = require('express');
let router = express.Router();
let listModel = require('../models/listModel.js');


/* 新增一筆項目: save() */              ////p.s. 無id時call insert()，有id時則call update()
router.post('/addList', function(req, res) {
    let newList = new listModel ({
        title: req.body.title,
        content: req.body.content,
        status: false
    });

    newList.save(function(err, listData) {            // err: 出錯則將err交由handleError處理
        if(err) {
            res.json({
                "status": 1,
                "msg": 'error'
            });
            console.log("Insert: Failed!");
            return handleError(err);
        } else {
            res.json({
                    "status": 0,
                    "msg": 'success',
                    data: listData
                });
            console.log("Insert: Success!");
        }
    });
});

/* 顯示新增項目: find() */
router.get('/getList', function(req, res) {
    listModel.find(function(err, listData) {
        if(err) {
            console.log("Find: Failed!");
            return handleError(err);
        } else {
            res.json(listData);
            console.log("Find: Success!");
        }
    });
});

/* 修改一筆項目: 先getOne[findById()]>>>再修改[save()] */
router.post('/updateList', function(req, res) {
    let id = req.body.id;

    listModel.findById(id, function(err, listData) {
        if(err) {
            res.json({
                "status": 1,
                "msg": 'error'
            });
            console.log("Find By ID: Failed!");
            return handleError(err);
        } else {
            listData.title = req.body.title;
            listData.content = req.body.content;
            listData.save(function(err) {
                if(err) {
                    res.json({
                        "status": 1,
                        "msg": 'error'
                    });
                    console.log("Update: Failed!");
                } else {
                    res.json({
                        "status": 0,
                        "msg": 'success',
                    });
                    console.log("Update: Success!");
                }
            });
        }
    });
});

/* 刪除一筆項目: remove(id, callback) */
router.post('/removeList', function(req, res) {
    let id = req.body.id;
    
    listModel.remove({_id: id}, function(err, listData) {
        if(err) {
            res.json({
                "status": 1,
                "msg": 'error'
            });
            console.log("Delete: Failed!");
        } else {
            res.json({"status": 0, "msg": 'success'});
            console.log("Delete: Success!");
        }
    });
});

/* 改變項目狀態 */
router.post('/changeStatus', function(req, res) {
    let id = req.body.id;

    listModel.findById(id, function(err, listData) {
        if(err) {
            res.json({
                "status": 1,
                "msg": 'error'
            });
            console.log("Find By ID: Failed!");
            return handleError(err);
        } else {
            if(listData.status == true) {
                listData.status = false;
            } else {
                listData.status = true;
            }
            listData.save(function(err) {
                if(err) {
                    res.json({
                        "status": 1,
                        "msg": 'error'
                    });
                    console.log("Change status: Failed!");
                    return handleError(err);
                } else {
                    res.json({"status": 0, "msg": 'success'});
                    console.log("Change status: Success!");
                }
            });
        }
    });
});

module.exports = router;