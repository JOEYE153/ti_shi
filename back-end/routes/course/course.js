var express = require('express');
var router = express.Router();

const sqlQuery = require('../../module/mysql');
const resBody = require('../../module/res');

router.get('/info', async function(req, res, next) {
    let sql = 'select course_id as value, course_name as label, image_url, course_title  from course'
    let result = await sqlQuery(sql)
    let data = {}
    data['courseList'] = result

    for( let i = 0 ; i < data.courseList.length ; i++ ) {
        let course_title = data.courseList[i].course_title
        sql = 'select count(*) as count from ' + course_title
        result = await sqlQuery(sql)
        data.courseList[i]['total'] = result[0]['count']
        data.courseList[i].course_title = undefined
    }

    res.json(resBody(data, 1, 'success'))
})

module.exports = router