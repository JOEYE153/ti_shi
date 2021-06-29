var express = require('express');
var router = express.Router();

const sqlQuery = require('../../module/mysql');
const resBody = require('../../module/res');

router.get('/', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(resBody({}, 2, '测试账号'));
        return;
    }
    let course_id = req.query.course_id
    let user_id = req.body.userid
    let data = {}

    let sql = ' select card_id as id, title, content, color_value as colorId \
                from knowledge_card where card_id = 1 or (course_id = ? and (user_id = ? or is_user_defined = false))'
    let result = await sqlQuery(sql, [course_id, user_id])

    data['kapianList'] = result
    
    res.json(resBody(data, 1, 'success'))
});

router.post('/', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(resBody({}, 2, '测试账号'));
        return;
    }
    let course_id = req.body.course_id
    let title = req.body.title
    let content = req.body.content
    let user_id = req.body.userid
    let default_color = "#2b85e4"
    let is_user_defined = (user_id != 46)

    let sql = ' insert into knowledge_card (user_id, course_id, color_value, content, title, is_user_defined) VALUES (?, ?, ?, ?, ?, ?)' 
    let result = await sqlQuery(sql, [user_id, course_id, default_color, content, title, is_user_defined])

    
    res.json(resBody({}, 1, 'success'))
});

router.put('/', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(resBody({}, 2, '测试账号'));
        return;
    }
    let card_id = req.body.id
    let content = req.body.content
    let user_id = req.body.userid
    let title = req.body.title

    let sql = 'select is_user_defined, user_id from knowledge_card where card_id = ?' 
    let result = await sqlQuery(sql, [card_id])

    let is_user_defined = result[0]['is_user_defined']

    if(user_id == result[0]['user_id'] && (is_user_defined || user_id == 46)) {
        sql = 'update knowledge_card set title = ?, content = ? where card_id = ?'
        result = await sqlQuery(sql, [title, content, card_id])
        res.json(resBody({}, 1, 'success'))
    } else {
        res.json(resBody({}, 0, 'fail'))
    }
});

router.delete('/', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(resBody({}, 2, '测试账号'));
        return;
    }
    let card_id = req.body.id
    let user_id = req.body.userid

    let sql = 'select is_user_defined, user_id from knowledge_card where card_id = ?' 
    let result = await sqlQuery(sql, [card_id])

    let is_user_defined = result[0]['is_user_defined']

    if(user_id == result[0]['user_id'] && (is_user_defined || user_id == 46)) {
        sql = 'delete from  knowledge_card where card_id = ?'
        result = await sqlQuery(sql, [card_id])
        res.json(resBody({}, 1, 'success'))
    } else {
        res.json(resBody({}, 0, 'fail'))
    }
});

router.put('/change_color', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(resBody({}, 2, '测试账号'));
        return;
    }
    let card_id = req.body.id
    let color_value = req.body.color_value
    let user_id = req.body.userid

    let sql = 'select is_user_defined, user_id from knowledge_card where card_id = ?' 
    let result = await sqlQuery(sql, [card_id])

    let is_user_defined = result[0]['is_user_defined']

    if(user_id == result[0]['user_id'] && (is_user_defined || user_id == 46)) {
        sql = 'update knowledge_card set color_value = ? where card_id = ?'
        result = await sqlQuery(sql, [color_value, card_id])
        res.json(resBody({}, 1, 'success'))
    } else {
        res.json(resBody({}, 0, 'fail'))
    }
});

router.get('/search', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(resBody({}, 2, '测试账号'));
        return;
    }
    let keyword = '%' + req.query.keyword + '%'
    let course_id = req.query.course_id
    let user_id = req.body.userid
    let data = {}

    let sql = ' select card_id as id, title, content, color_value as colorId \
                from knowledge_card where course_id = ? and (user_id = ? or is_user_defined = false) and title like ?'
    
    let result = await sqlQuery(sql, [course_id, user_id, keyword])

    data['kapianList'] = result
    
    res.json(resBody(data, 1, 'success'))
});

module.exports = router;