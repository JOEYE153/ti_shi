var express = require('express');
var router = express.Router();

const sqlQuery = require('../../module/mysql');
const resBody = require('../../module/res');

router.get('/display/:course_id', async function(req, res, next) {
    let course_id = req.params.course_id

    let sql = 'select chapter_id, chapter_title from chapter where course_id = ?'
    let result = await sqlQuery(sql, course_id)

    let data = {}
    data['chapters'] = result

    res.json(resBody(data, 1, 'success'))
});

router.get('/display_chapter', async function(req, res, next) {
    let course_id = req.query.course_id
    let chapter_id = req.query.chapter_id
    let user_id = req.body.userid

    let data = {}

    let sql = 'select course_title from course where course_id = ?'
    let result = await sqlQuery(sql, course_id)

    let course_title = result[0]['course_title']

    sql = ' select a.id, IFNULL(b.status, 0) as status \
            from '+ course_title +' as a \
                left join (select * from user_question_status where user_id = ? and course_id = '+ course_id +') as b on a.id = b.question_id \
            where a.chapter_id = ?'

    result = await sqlQuery(sql, [user_id, chapter_id])
    data['subdata'] = result

    res.json(resBody(data, 1, 'success'))
});

router.get('/search', async function(req, res, next) {
    let keyword = '%' + req.query.keyword + '%'
    let course_id = req.query.course_id

    let sql = 'select course_title from course where course_id = ?'
    let result = await sqlQuery(sql, course_id)
    let course_title = result[0]['course_title']

    sql = 'select id, q_description from ' + course_title + ' where q_description like ?'
    // console.log(sql);
    result = await sqlQuery(sql, [keyword])
    let data = {}
    data['questions'] = result

    res.json(resBody(data, 1, 'success'))
});



module.exports = router