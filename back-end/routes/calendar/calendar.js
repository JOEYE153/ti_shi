var express = require('express');
var router = express.Router();

const sqlQuery = require('../../module/mysql');
const resBody = require('../../module/res');

router.get('/', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(resBody({}, 2, '测试账号'));
        return;
    }
    let user_id = req.body.userid

    let sql = 'select calendar_id as id, date, title, content, finish from calendar where user_id = ?'
    let result = await sqlQuery(sql, [user_id])

    let data = {}
    data['riliList'] = result

    res.json(resBody(data, 1, 'success'))
})

router.delete('/', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(resBody({}, 2, '测试账号'));
        return;
    }
    let calendar_id = req.body.id
    let user_id = req.body.userid

    let sql = 'select user_id from calendar where calendar_id = ?'
    let result = await sqlQuery(sql, [calendar_id])

    if(user_id == result[0]['user_id']) {
        sql = 'delete from calendar where calendar_id = ?'
        result = await sqlQuery(sql, [calendar_id])
        res.json(resBody({}, 1, 'success'))
    } else {
        res.json(resBody({}, 0, 'fail'))
    }
})

router.post('/', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(resBody({}, 2, '测试账号'));
        return;
    }
    let date = req.body.date
    let title = req.body.title
    let content = req.body.content
    let user_id = req.body.userid

    let now_date = new Date();
    let set_date = new Date(date);

    let finish = set_date > now_date ? false:true;

    if(title.length <= 15) {
        let sql = 'insert into calendar (date, title, finish, content, user_id) values (?, ?, ?, ?, ?)'
        let result = await sqlQuery(sql, [date, title, finish, content, user_id])
    }

    res.json(resBody({}, 1, 'success'))
})

router.put('/', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(resBody({}, 2, '测试账号'));
        return;
    }
    let date = req.body.date
    let title = req.body.title
    let content = req.body.content
    let calendar_id = req.body.calendar_id
    let user_id = req.body.userid

    let now_date = new Date();
    let set_date = new Date(date);

    let finish = set_date > now_date ? false:true;

    if(title.length <= 15) {
        let sql = 'select user_id from calendar where calendar_id = ?'
        let result = await sqlQuery(sql, [calendar_id])
        let owner_id = result[0]['user_id']

        if(owner_id != user_id) {
            res.json(resBody({}, 0, 'fail'))
            return;
        }

        sql = 'update calendar set date = ?, title = ?, finish = ?, content = ? where calendar_id = ?'
        result = await sqlQuery(sql, [date, title, finish, content, calendar_id])
    }

    res.json(resBody({}, 1, 'success'))
})

module.exports = router;