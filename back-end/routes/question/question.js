var express = require('express');
var router = express.Router();

const sqlQuery = require('../../module/mysql');
const resBody = require('../../module/res');

//TO-DO:未做过的题不会在表中有记录，以此作为返回status=未做过 
router.get('/display', async function(req, res, next) {
    let id = req.query.id;
    let course_id = req.query.course_id;
    let user_id = req.body.userid//TO-DO:WE NEED THIS USER'S COLLECTION!

    let sql = 'select * from collection where course_id = ? and question_id = ? and user_id = ?'
    let result = await sqlQuery(sql, [course_id, id, user_id])
    let is_collected = 1

    if(result.length == 0) {
        is_collected = 0
    }

    sql = 'select course_title from course where course_id = ?'
    result = await sqlQuery(sql, course_id)

    let course_title = result[0]['course_title']

    sql = ' select \
                id, \
                q_description, \
                option_a, \
                option_b, \
                option_c, \
                option_d, \
                answer, \
                image_url, \
                is_multi \
            from ' + course_title + 
            ' where id = ?'
    //console.log(sql);
    result = await sqlQuery(sql, id)
    if(result.length == 0) {
        res.json(resBody({}, 0, 'fail'))
        return
    }
    result[0]['is_collected'] = is_collected

    //console.log(result);
    let data = {}
    data = result[0]

    res.json(resBody(data, 1, 'success'))
});

router.post('/judge', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(resBody({}, 2, '测试账号'));
        return;
    }
    let id = req.body.id
    let mode = req.body.mode
    let course_id = req.body.course_id
    let user_answer = req.body.user_answer
    let user_id = req.body.userid//TO-DO: PARSE FROM TOKEN

    //console.log(req.body);

    let sql = 'select course_title from course where course_id = ?'
    //console.log(sql);
    let result = await sqlQuery(sql, course_id)

    let course_title = result[0]['course_title']

    sql = 'select answer from ' + course_title + ' where id = ?'
    //console.log(sql);
    result = await sqlQuery(sql, id)

    let is_correct = -1
    if(user_answer == result[0]['answer']) {
        is_correct = 1
    }

    sql = 'select chapter_id from ' + course_title + ' where id = ?'
    result = await sqlQuery(sql, [id])
    let chapter_id = result[0]['chapter_id']
    sql = 'select * from user_question_status where user_id = ? and course_id = ? and question_id = ?'
    result = await sqlQuery(sql, [user_id, course_id, id])
    if(result.length != 0) {
        let old_status = result[0]['status']
        if (old_status != is_correct) {
            sql = 'select error_num from user_chapter_error_num where user_id = ? and course_id = ? and chapter_id = ?'
            result = await sqlQuery(sql, [user_id, course_id, chapter_id])
            // is_correct == -1, error_num += 1, 之前对的又做错了
            let new_error_num = result[0]['error_num'] - is_correct
            sql = 'update user_chapter_error_num set error_num = ? where user_id = ? and course_id = ? and chapter_id = ?'
            result = await sqlQuery(sql, [new_error_num, user_id, course_id, chapter_id])
        }
        sql = 'update user_question_status set status = ? where user_id = ? and course_id = ? and question_id = ?'
        result = result = await sqlQuery(sql, [is_correct, user_id, course_id, id])
    } else {
        let error_num = 0
        if(is_correct == -1) {
            error_num += 1
        }
        sql = 'select error_num from user_chapter_error_num where user_id = ? and course_id = ? and chapter_id = ?'
        result = await sqlQuery(sql, [user_id, course_id, chapter_id])
        if(result.length == 0) {
            sql = 'insert into user_chapter_error_num values(?, ?, ?, ?)'
            result = await sqlQuery(sql, [user_id, course_id, chapter_id, error_num])
        } else {
            error_num += result[0]['error_num']
            sql = 'update user_chapter_error_num set error_num = ? where user_id = ? and course_id = ? and chapter_id = ?'
            result = await sqlQuery(sql, [error_num, user_id, course_id, chapter_id])
        }
        sql = 'insert into user_question_status values(?, ?, ?, ?)'
        result = await sqlQuery(sql, [user_id, course_id, id, is_correct])
    }

    // change last_id
    if(mode == 1) {
        sql = 'select * from previous_question_id where user_id = ? and course_id = ?'
        result = await sqlQuery(sql, [user_id, course_id])
        if(result.length != 0) {
            sql = 'update previous_question_id set question_id = ? where user_id = ? and course_id = ?'
            result = await sqlQuery(sql, [id, user_id, course_id])
        } else {
            sql = 'insert into previous_question_id values(?, ?, ?)'
            result = await sqlQuery(sql, [user_id, course_id, id])
        }
    }
    
    let data = { 'status':is_correct }

    res.json(resBody(data, 1, 'success'))
});

async function getAllExamQuestionInfo(course_title, question_ids) {
    let res = []
    question_ids.forEach((question_id)=>{
        let question = (async (course_title, question_id) => {
            return await getQuestion(course_title, question_id);
        })(course_title, question_id);
        res.push(question);
    })
    let result = await Promise.all(res);
    return result;
}


router.post('/judge2', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(resBody({}, 2, '测试账号'));
        return;
    }
    let question_ids = req.body.id
    let course_id = req.body.course_id
    let user_answers = req.body.user_answer

    let sql = 'select course_title from course where course_id = ?'
    let result = await sqlQuery(sql, course_id)

    let course_title = result[0]['course_title']

    // cannot use getAllQuestionInfo to get exam questions' ans
    let res1 = getAllExamQuestionInfo(course_title, question_ids);
    let res_arr = [res1, user_answers];
    Promise.all(res_arr).then((result) => {
        let data = {};
        data['status'] = [];
        let i = 0;
        result[0].forEach((item) => {
            if(result[1][i].length == 0) {
                data['status'][i++] = 0;
            } else {
                data['status'][i] = (item['answer'] == result[1][i]) ? 1:-1;
                i++;
            }
        })
        res.json(resBody(data, 1, 'success'));
    })
})

router.post('/collect', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(resBody({}, 2, '测试账号'));
        return;
    }
    let id = req.body.id
    let course_id = req.body.course_id
    let user_id = req.body.userid//TO-DO: PARSE THIS IN TOKEN

    let sql = 'select course_title from course where course_id = ?'
    let result = await sqlQuery(sql, course_id)
    let course_title = result[0]['course_title']

    sql = 'select chapter_id from ' + course_title + ' where id = ?'
    result = await sqlQuery(sql, [id])
    let chapter_id = result[0]['chapter_id']
    
    sql = 'select * from collection where user_id = ? and course_id = ? and question_id = ?'
    result = await sqlQuery(sql, [user_id, course_id, id])

    if(result.length == 0) {
        sql = 'insert into collection (user_id, course_id, question_id) values (?, ?, ?)'
        // console.log(sql);
        result = await sqlQuery(sql, [user_id, course_id, id])
        sql = 'select collection_num from user_chapter_collection_num where user_id = ? and course_id = ? and chapter_id = ?'
        // console.log(sql);
        result = await sqlQuery(sql, [user_id, course_id, chapter_id])
        // console.log(result);
        if(result.length == 0) {
            sql = 'insert into user_chapter_collection_num values(?, ?, ?, ?)'
            result = await sqlQuery(sql, [user_id, course_id, chapter_id, 1])
        } else {
            let coll_num = result[0]['collection_num'] + 1
            sql = 'update user_chapter_collection_num set collection_num = ? where user_id = ? and course_id = ? and chapter_id = ?'
            result = await sqlQuery(sql, [coll_num, user_id, course_id, chapter_id])
        }
    }

    res.json(resBody({}, 1, "success"))
})

router.post('/cancel_collect', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(resBody({}, 2, '测试账号'));
        return;
    }
    let id = req.body.id
    let course_id = req.body.course_id
    let user_id = req.body.userid//TO-DO:WE NEED THIS USER'S COLLECTION!

    let sql = 'select course_title from course where course_id = ?'
    let result = await sqlQuery(sql, course_id)
    let course_title = result[0]['course_title']

    sql = 'select chapter_id from ' + course_title + ' where id = ?'
    result = await sqlQuery(sql, [id])
    let chapter_id = result[0]['chapter_id']
    
    sql = 'select * from collection where user_id = ? and course_id = ? and question_id = ?'
    result = await sqlQuery(sql, [user_id, course_id, id])

    if(result.length != 0) {
        sql = 'delete from collection where user_id = ? and course_id = ? and question_id = ?'
        result = await sqlQuery(sql, [user_id, course_id, id])

        sql = 'select collection_num from user_chapter_collection_num where user_id = ? and course_id = ? and chapter_id = ?'
        result = await sqlQuery(sql, [user_id, course_id, chapter_id])

        let coll_num = result[0]['collection_num'] - 1
        // console.log(coll_num);
        sql = 'update user_chapter_collection_num set collection_num = ? where user_id = ? and course_id = ? and chapter_id = ?'
        result = await sqlQuery(sql, [coll_num, user_id, course_id, chapter_id])
    }

    res.json(resBody({}, 1, 'success'))
})

router.get('/display_random/:course_id', async function(req, res, next) {
    let course_id = req.params.course_id
    let user_id = req.body.userid//TO-DO:WE NEED THIS USER'S COLLECTION!

    let sql = 'select course_title from course where course_id = ?'
    let result = await sqlQuery(sql, course_id)

    let course_title = result[0]['course_title']

    sql = 'select count(*) from ' + course_title
    result = await sqlQuery(sql)

    let count = result[0]['count(*)']

    //console.log(count);
    let question_id = Math.ceil(Math.random()*count);
    //console.log(question_id);
    sql = 'select * from collection where course_id = ? and question_id = ? and user_id = ?'
    result = await sqlQuery(sql, [course_id, question_id, user_id])
    let is_collected = 1

    if(result.length == 0) {
        is_collected = 0
    }
    sql = ' select \
                id, \
                q_description, \
                option_a, \
                option_b, \
                option_c, \
                option_d, \
                answer, \
                image_url, \
                is_multi \
            from ' + course_title + 
            ' where id = ?'
    //console.log(sql);
    result = await sqlQuery(sql, question_id)

    result[0]['is_collected'] = is_collected

    //console.log(result);

    let data = {}
    data = result[0]

    res.json(resBody(data, 1, 'success'))
})

//TO-DO:易错题的表
async function getIsCollected(course_id, question_id, user_id){
    let sql = 'select * from collection where course_id = ? and question_id = ? and user_id = ?'
    let result = await sqlQuery(sql, [course_id, question_id, user_id])
    let is_collected = 1

    if(result.length == 0) {
        is_collected = 0
    }
    return is_collected;
}

async function getQuestion(course_title, question_id){
    let sql = ' select \
                    id, \
                    q_description, \
                    option_a, \
                    option_b, \
                    option_c, \
                    option_d, \
                    answer, \
                    image_url, \
                    is_multi \
                from ' + course_title + 
                ' where id = ?'
    let result =  await sqlQuery(sql, question_id);
    return result[0];
}

async function getQuestionErrorRate(course_id, question_id){
    let sql = 'select error_rate from error_list where course_id = ? and question_id = ?'
    let result = await sqlQuery(sql, [course_id, question_id])
    return result[0];
}

async function getAllQuestionIsCollected(course_id, question_ids, user_id) {
    let res = []
    question_ids.forEach((item)=>{
        let question_id = item['question_id']
        let is_collected = (async (course_id, question_id, user_id) => {
            return await getIsCollected(course_id, question_id, user_id);
        })(course_id, question_id, user_id);
        res.push(is_collected);
    })
    let result = await Promise.all(res);
    return result;
}

async function getAllQuestionInfo(course_title, question_ids) {
    let res = []
    question_ids.forEach((item)=>{
        let question_id = item['question_id']
        let question = (async (course_title, question_id) => {
            return await getQuestion(course_title, question_id);
        })(course_title, question_id);
        res.push(question);
    })
    let result = await Promise.all(res);
    return result;
}

async function getAllQuestionErrorRate(course_id, question_ids) {
    let res = []
    question_ids.forEach((item)=>{
        let question_id = item['question_id']
        let error_rate = (async (course_id, question_id) => {
            return await getQuestionErrorRate(course_id, question_id);
        })(course_id, question_id);
        res.push(error_rate);
    })
    let result = await Promise.all(res);
    return result;
}

//TO-DO:易错题的表
router.get('/display_easy-wrong/:course_id', async function(req, res, next) {
    let course_id = req.params.course_id;
    let user_id = req.body.userid;
    let sql = ' select * \
                from error_list \
                where course_id = ? \
                order by error_rate desc \
                limit 50';
    let result = await sqlQuery(sql, course_id)
    let question_ids = result
    let data = {}
    data['questions'] = []
    
    sql = 'select course_title from course where course_id = ?'
    result = await sqlQuery(sql, course_id)

    let course_title = result[0]['course_title']

    let res1 = getAllQuestionInfo(course_title, question_ids);
    let res2 = getAllQuestionIsCollected(course_id, question_ids, user_id);
    let res3 = getAllQuestionErrorRate(course_id, question_ids);

    let res_arr = [res1, res2, res3];
    Promise.all(res_arr).then((result) => {
        let data = {};
        data['questions'] = result[0];
        let i = 0;
        result[1].forEach((item) => {
            data['questions'][i++]['is_collected'] = item;
        })
        i = 0;
        result[2].forEach((item) => {
            data['questions'][i++]['error_rate'] = item['error_rate'].toFixed(2);
        })
        res.json(resBody(data, 1, 'success'));
    })
})

// 获得两数之间的一个随机数
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}

//TO-DO:模拟考试结构，多少个题目，每单元多少？
router.get('/display_exam/:course_id', async function(req, res, next) {
    let course_id = req.params.course_id;
    let sql = 'select course_title from course where course_id = ?'
    let result = await sqlQuery(sql, course_id)
    let course_title = result[0]['course_title']
    let user_id = req.body.userid;// TO-DO
    let ids = []
    let visited = {}

    if(course_title == 'sci_hanggai' || course_title == 'art_hanggai') {
        // 各章节返回题目，总共85题，单选70题，多选15题。
        // 单选题在六章中选取比例为：10、15、10、10、15、10题，(deal in one loop)
        // 多选为全部中随机选。

        // 先挑出多选的号码
        let multi = {}
        let multi_ids = []
        sql = 'select id from '+ course_title +' where is_multi = 1'
        result = await sqlQuery(sql)
        multi_ids = result
        for( let i = 0; i < result.length ; i++ ) {
            multi[result[i]['id']] = 1
        }

        let index = 1

        // 单选
        for( let j = 0 ; j < 6 ; j++) {
            // 第一章
            let chapter_id = j + 1
            sql = 'select count(*) as count from ' + course_title + ' where chapter_id = ?'
            result = await sqlQuery(sql, chapter_id)
            let loop = [10, 15, 10, 10, 15, 10]
            for( let i = 0 ; i < loop[j] ; i++ ) {
                do {
                    let random_num = getRandomInt(index, result[0]['count'] + index)
                    // console.log(ids);
                    if(!visited[random_num] && !multi[random_num]) {
                        ids.push({'question_id':random_num})
                        visited[random_num] = 1
                        break;
                    }
                } while(true)
            }
            index += result[0]['count']
        }

        // 多选
        for( let i = 0 ; i < 15 ; i++ ) {
            do {
                let random_num = getRandomInt(0, multi_ids.length)
                // console.log(random_num);
                if(!visited[multi_ids[random_num]['id']]) {
                    ids.push({'question_id':multi_ids[random_num]['id']})
                    visited[multi_ids[random_num]['id']] = 1
                    break;
                }
            } while(true)
        }
    } else if (course_title == 'introductionToComputer') {
        sql = 'select count(*) as count from ' + course_title
        result = await sqlQuery(sql)
        let num = 60
        do {
            let random_num = getRandomInt(1, result[0]['count'])
            if(!visited[random_num]) {
                ids.push({'question_id':random_num})
                visited[random_num] = 1
                num--;
            }
        } while(num > 0)
    }
    // 封装
    let res1 = getAllQuestionInfo(course_title, ids);
    let res2 = getAllQuestionIsCollected(course_id, ids, user_id);

    let res_arr = [res1, res2];
    Promise.all(res_arr).then((result) => {
        let data = {};
        data['questions'] = result[0];
        let i = 0;
        result[1].forEach((item) => {
            data['questions'][i++]['is_collected'] = item;
        })
        res.json(resBody(data, 1, 'success'));
    })
})

router.get('/last_id/:course_id', async function(req, res, next) {
    let course_id = req.params.course_id
    let user_id = req.body.userid
    // console.log('OK');

    let sql = 'select question_id as id from previous_question_id where user_id = ? and course_id = ?'
    let result = await sqlQuery(sql, [user_id, course_id])

    let data = {}
    if (result.length == 0) {
        data['id'] = 1
    }
    else {
        data['id'] = result[0]['id']
    }
    
    res.json(resBody(data, 1, 'success'))
});

module.exports = router