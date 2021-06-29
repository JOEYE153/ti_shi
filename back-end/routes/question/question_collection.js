var express = require('express');
var router = express.Router();

const sqlQuery = require('../../module/mysql');
const resBody = require('../../module/res');

router.get('/display/:course_id', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(resBody({}, 2, '测试账号'));
        return;
    }
    let course_id = req.params.course_id
    let user_id = req.body.userid
    let data = {}

    let sql = ' select a.chapter_id as id, IFNULL(collection_num, 0) as coll_num, total_num \
                from chapter_question_num as a \
                left join (select * from user_chapter_collection_num where user_id = ?) as b \
                       on a.chapter_id = b.chapter_id and a.course_id = b.course_id \
                where a.course_id = ?' 
    let result = await sqlQuery(sql, [user_id, course_id])

    let total_coll = 0;
    for(let i in result) {
        total_coll += result[i]['coll_num']
    }
    data['total_coll'] = total_coll
    data['chapters'] = result
    
    res.json(resBody(data, 1, 'success'))
});

router.get('/open_chapter', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(resBody({}, 2, '测试账号'));
        return;
    }
    let course_id = req.query.course_id
    let chapter_id = req.query.id
    let user_id = req.body.userid

    let sql = 'select course_title from course where course_id = ?'
    let result = await sqlQuery(sql, course_id)

    let course_title = result[0]['course_title']

    sql = ' select a.id, q_description \
                from '+ course_title +' as a \
                inner join (select * \
                         from collection \
                         where user_id = ? \
                           and course_id = ?) as b on a.id = b.question_id \
                where chapter_id = ?'
    // console.log(sql);
    result = await sqlQuery(sql, [user_id, course_id, chapter_id])
    // console.log(result);
    let data = {}
    data['questions'] = result
    res.json(resBody(data, 1, 'success'))    
});


module.exports = router;