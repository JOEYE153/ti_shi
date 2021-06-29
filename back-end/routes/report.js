let express = require('express');
let moment = require('moment');
let reportRouter = express.Router();

const sqlQuery = require('../module/mysql');
const response = require('../module/res');

const tableList = ['comment', 'reply', 'QA_posts', 'post_comment']

reportRouter.get('/get', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(response({}, 2, '测试账号'));
        return;
    }
    try {
        let itemId = parseInt(req.query.item_id);
        let tableNumber = parseInt(req.query.table_number);

        let sql = 'select * from report where item = ? and table_name = ?';
        let result = await sqlQuery(sql, [itemId, tableList[tableNumber - 1]]);
        let isReported = result.length == 0 ? false : true;

        res.json(response({'isReported': isReported}, 1, 'success'));
    } catch (e) {
        console.log(e);
        res.json(response({}, 0, 'fail'));
    }
});

reportRouter.post('/add', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(response({}, 2, '测试账号'));
        return;
    }
    try {
        let itemId = parseInt(req.body.item_id);
        let tableNumber = parseInt(req.body.table_number);
        let reason = req.body.reason;
        let userId = parseInt(req.body.userid);

        if (tableNumber > 4 || tableNumber < 1) {
            res.json(response({'msg': 'invalid table number'}, 0, 'fail'));
            return;
        }

        let sql = 'select * from report where item = ? and table_name = ?';
        let result = await sqlQuery(sql, [itemId, tableList[tableNumber - 1]]);
        let isReported = result.length == 0 ? false : true;

        if (isReported) {
            res.json(response({'msg': '已经有其他用户举报，等待审核中'}, 1, 'success'));
            return;
        }

        sql = 'insert into report values(?, ?, ?, ?, ?, ?)';

        const formatYmd = date => date.toISOString().slice(0, 10);                    
        let curDate = formatYmd(new Date());

        await sqlQuery(sql, [null, userId, reason, itemId, tableList[tableNumber - 1], curDate]);

        res.json(response({}, 1, 'success'));
    } catch (e) {
        console.log(e);
        res.json(response({}, 0, 'fail'));
    }
});

module.exports = reportRouter;