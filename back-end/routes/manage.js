const express = require('express');
const mysql = require('../module/mysql');
const response = require('../module/res');
const moment = require('moment');
const { cat } = require('tencentcloud-sdk-nodejs');
moment.locale('zh-cn'); 

const manageRouter = express.Router();

async function find_course_title (course_id) {
    let result1 = await mysql(`select * from course where course_id=?;`, [course_id]);
    // console.log(result1);
    return result1[0].course_title;
};

async function delete_then (id) {
    try {
        let ret = await mysql(`select * from report where id = ?;`, [id]);

        if (ret.length == 0) {
            return;
        }

        let item = ret[0].item;
        let table_name = ret[0].table_name;

        if (table_name == 'comment') {
            await mysql(`delete from comment where comment_id = ?;`, [item]);
            await mysql(`delete from comment_like where comment_id = ?;`, [item]);
            
            let results = await mysql(`select reply_id from reply where comment_id = ?;`, [item]);

            await mysql(`delete from reply where comment_id = ?`, [item]);
            for (let i = 0; i < results.length; i++) {
                await mysql(`delete from reply_like where reply_id = ?`, [results[i].reply_id]);
            }
        }
        else if (table_name == 'post_comment') {
            await mysql(`delete from post_comment where post_comment_id = ?;`, [item]);
            await mysql(`delete from post_comment_like where post_comment_id = ?;`, [item]);
        }
        else if (table_name == 'QA_posts') {
            await mysql(`delete from QA_posts where post_id = ?;`, [item]);

            let results = await mysql(`select post_comment_id from post_comment where post_id = ?;`, [item]);

            await mysql(`delete from post_comment where post_id = ?`, [item]);

            for (let i = 0; i < results.length; i++) {
                await mysql(`delete from post_comment_like where post_comment_id = ?`, [results[i].post_comment_id]);
            }
        }
        else if (table_name == 'reply') {
            await mysql(`delete from reply where reply_id = ?;`, [item]);
            
            await mysql(`delete from reply_like where reply_id = ?;`, [item]);
        }
        else {
            throw Error('table_name is not exists');
        }
    } catch (err) {
        throw Error(err);
    }
}

manageRouter.all('*', (req, res, next) => {
    let userid = req.body.userid;
    if (userid != 46) {
        res.send(response({}, 0, "你没有权限啦啦啦，换个账号来吧"));
    }
    else {
        next();
    }
});

manageRouter.get('/query', async (req, res, err) => {
    try {
        // console.log(req.query);
        let course_id = req.query.course_id;

        let course_title = await find_course_title(course_id);
        // console.log(course_title);

        let questions = await mysql(`select id, q_description, option_a, option_b, option_c, option_d, 
                                        answer, image_url, is_multi, chapter_id,
                                        IFNULL(error_rate, 0) as error_rate from ${course_title} as a
                                        left join error_list as b on (a.id = b.question_id) and (b.course_id=${course_id})`, []);

        res.send(response({questions}, 1, "success"));
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
});

manageRouter.post('/add', async (req, res, err) => {
    try {
        let wrong_ids = [];
        let questions = req.body.questions;
        let i = 0;
        // console.log(questions);
        for (i = 0; i < questions.length; i++) {
            let question = questions[i];
            let course_id = question.course_id;
            let course_title = await find_course_title(course_id);
            // console.log(course_title);  

            let id = (await mysql(`select max(id) as max_id from ${course_title}`, []))[0].max_id + 1;
            // console.log(id);

            let is_multi = question.is_multi ? 1 : 0;
            let image_url = question.image_url == undefined ? "" : req.body.image_url;
            let answer = ""
            for (let i = 0; i < question.answer.length ; i++) {
                answer += question.answer[i];
                answer += "-";
            }
            answer = answer.slice(0, -1);
            // console.log(answer);

            try {
                await mysql(`insert into ${course_title} values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [id, question.q_description, question.option_a, 
                                question.option_b, question.option_c, question.option_d, answer, image_url, is_multi, question.chapter_id]);
            } catch (e) {
                console.log(e);
                wrong_ids.push(question.id);
            }
        }
        if (wrong_ids.length == 0) {
            res.send(response({}, 1, "success"));
        }
        else {
            res.send(response({wrong_ids}, 0, "题目添加存在错误"))
        }
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
});

manageRouter.post('/modify', async (req, res, err) => {
    try {
        let course_id = req.body.course_id;

        let course_title = await find_course_title(course_id);
        let id = req.body.id;
        // console.log(req.body);
    
        let result1 = await mysql(`select * from ${course_title} where id=?`, [id]);
        if (!result1.length) {
            res.send(response({}, 0, "题目id存在错误"));
        }
        else {
            let question = result1[0];
            // console.log(question);
    
            let q_description = req.body.q_description == "" ? question.q_description : req.body.q_description;
            let option_a = req.body.option_a == "" ? question.option_a : req.body.option_a;
            let option_b = req.body.option_b == "" ? question.option_b : req.body.option_b;
            let option_c = req.body.option_c == "" ? question.option_c : req.body.option_c;
            let option_d = req.body.option_d == "" ? question.option_d : req.body.option_d;
            let image_url = req.body.image_url == undefined ? question.image_url : req.body.image_url;
            let is_multi = req.body.is_multi == undefined ? question.is_multi : req.body.is_multi;
            let is_multi1 = is_multi == true ? 1: 0;
            // console.log(is_multi1);
            let chapter_id = req.body.chapter_id == "" ? question.chapter_id : req.body.chapter_id;
    
            let answer = "";
            if (req.body.answer.length == 0) {
                answer = question.answer;
            }
            else {
                for (let i = 0; i < req.body.answer.length ; i++) {
                    answer += req.body.answer[i];
                    answer += "-";
                }
                answer = answer.slice(0, -1);
            }
    
            try {
                await mysql(`update ${course_title}
                            set q_description=?, option_a=?, option_b=?, 
                            option_c=?, option_d=?, answer=?, 
                            image_url=?, is_multi=?, 
                            chapter_id=? where id=?;`, [q_description, option_a, 
                                option_b, option_c, option_d, answer, image_url, is_multi, chapter_id, id]);
                res.send(response({}, 1, "success"));
            } catch (e) {
                console.log(e);
                res.send(response({}, 0, "题目修改失败"));
            }
        }
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
});

manageRouter.post('/delete', async (req, res, err) => {
    try {
        let course_id = req.body.course_id;

        let course_title = await find_course_title(course_id);
        let id = req.body.id;
    
        let result1 = await mysql(`select * from ${course_title} where id=?`, [id]);
        if (!result1.length) {
            res.send(response({}, 0, "题目id存在错误"));
        }
        else {
            await mysql(`delete from ${course_title} where id=?`, [id]);
            res.send(response({}, 1, "success"));
        }
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }

});

manageRouter.get('/registration', async (req, res, err) => {
    try {
        let result = await mysql(`select username, avatar, time from users_info where user_id != '46' and user_id != '60'`, []);
        for (let i = 0; i < result.length ; i++) {
            result[i].time = moment(result[i].time).format('YYYY-MM-DD HH:mm:ss');
        }
        res.send(response({result}, 1, 'success'));
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
});

manageRouter.get('/activity', async (req, res, err) => {
    try {
        let startTime = new Date(req.query.startTime);
        let endTime = new Date(req.query.endTime);
        let days = endTime.getTime() - startTime.getTime();
        let time = parseInt(days / (1000 * 60 * 60 * 24)) + 1;
        // console.log(time);
    
        let today = startTime; 
        let date_array = [];
        for (let i = 0; i < time; i++) {
            let d = new Date(today);
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            let day = d.getDate();
            let date =  year+'-'+month+'-'+day;
            date_array.push(date);
            today.setTime(today.getTime() + 24 * 3600 * 1000);
        }
        // console.log(date_array);
    
        let result = [];
        for (let i = 0; i < date_array.length; i++) {
            let date = date_array[i];
            let start = date + " 00:00:00";
            let end = date + " 23:59:59";
            let tmp = await mysql(`select count(user_id) as count from user_activity where time between ? and ?`, [start, end]);
            result.push(tmp[0].count);
        }
        res.send(response({result, "dates": date_array}, 1, "success"));
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }

});

manageRouter.get('/queryResource', async (req, res, err) => {
    try {
        let course_id = req.query.course_id;

        if (course_id == undefined) {
            res.send(response({}, 0, "fail"));
        } else {
            try {
                let result = await mysql(`select id as resource_id, resource_sharing.user_id, username, topic, 
                description, link, resource_sharing.time as time, IFNULL(password, "") as password, isCheck 
                from users_info, resource_sharing 
                where resource_sharing.course_id = ? and resource_sharing.user_id = users_info.user_id`, [course_id]);
        
                for (let i = 0; i < result.length ; i++) {
                    result[i].time = moment(result[i].time).format('YYYY-MM-DD');
                }
        
                res.send(response({"resources": result}, 1, "success"));
            } catch (err) {
                // console.log(err);
                res.send(response({}, 0, "fail"));
            }
        }
    } catch (err) {
        res.send(response({}, 0, "fail"));
    }  
})

manageRouter.post('/addResource', async (req, res, err) => {
    try {
        let wrong_ids = [];
        let resources = req.body.resources;
        let i = 0;
        // console.log(questions);
        for (i = 0; i < resources.length; i++) {
            let resource = resources[i];
            let course_id = resource.course_id;
            let user_id = 46;
            let resource_id = resource.resource_id;
            let topic = resource.topic;
            let description = resource.description;
            let link = resource.link;
            let time = moment().format('YYYY-MM-DD');
            let password = resource.password;
            let check = 1;

            try {
                await mysql(`insert into resource_sharing (user_id, course_id, topic, description, link, time, password, isCheck) values (?, ?, ?, ?, ?, ?, ?, ?)`, [user_id, course_id, topic, description, link, time, password, check]);
            } catch (e) {
                console.log(e);
                wrong_ids.push(resource_id);
            }
        }
        if (wrong_ids.length == 0) {
            res.send(response({}, 1, "success"));
        }
        else {
            res.send(response({wrong_ids}, 0, "题目添加存在错误"))
        }
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
})

manageRouter.post('/deleteResource', async (req, res, err) => {
    try {
        let course_id = req.body.course_id;
        let resource_id = req.body.resource_id;
        
        try {
            await mysql(`delete from resource_sharing where course_id = ? and id = ?`, [course_id, resource_id]);
            res.send(response({}, 1, "success"));
        } catch (err) {
            console.log(err);
            res.send(response({}, 0, 'fail'));
        }
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
})

manageRouter.post('/updateResource', async (req, res, err) => {
    try {
        let course_id = req.body.course_id;
        let resource_id = req.body.resource_id;
        let check = req.body.check;

        let user_id = (await mysql(`select user_id from resource_sharing where course_id = ? and id = ?;`, [course_id, resource_id]))[0].user_id;
        let time = moment().format('YYYY-MM-DD');

        if (check == 0) {
            let remark = req.body.remark;
            try {
                await mysql(`insert into message_official (sender_id, receiver_id, description, status, kind, time) value(46, ?, ?, 1, 0, ?)`, [user_id, remark, time]);
            } catch (err) {
                throw Error(err);
            }

            res.send(response({}, 1, 'success'));
        } else if (check != 1) {
            res.send(response({}, 0, 'fail'));
        } else {

            let remark = '资源已审核通过，感谢您的分享！';
            try {
                await mysql(`insert into message_official (sender_id, receiver_id, description, status, kind, time) value(46, ?, ?, 1, 0, ?)`, [user_id, remark, time]);
            } catch (err) {
                throw Error(err);
            }

            let link = req.body.link; 
            let password = req.body.password;

            try {
                await mysql(`update resource_sharing
                            set link = ?, password = ? ,isCheck = ? where course_id = ? and id = ?;`, 
                            [link, password, check, course_id, resource_id]);
                res.send(response({}, 1, "success"));
            } catch (e) {
                console.log(e);
                res.send(response({}, 0, "资源修改失败"));
            }
        }
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
})

manageRouter.post('/modifyResource', async (req, res, err) => {
    try {
        let course_id = req.body.course_id;
        let resource_id = req.body.resource_id;
        
        try {
            let ret = await mysql(`select * from resource_sharing where course_id = ? and id = ?;`, 
            [course_id, resource_id]);

            let topic = req.body.topic == "" ? ret[0].topic : req.body.topic;
            let description = req.body.description == "" ? ret[0].description : req.body.description;
            let link = req.body.link == "" ? ret[0].link : req.body.link;
            let password = req.body.password == "" ? ret[0].password : req.body.password;
            
            try {
                await mysql(`update resource_sharing
                            set topic = ?, description = ?, link = ?, password = ? where course_id = ? and id = ?;`, 
                            [topic, description, link, password, course_id, resource_id]);
                res.send(response({}, 1, "success"));
            } catch (e) {
                console.log(e);
                res.send(response({}, 0, "资源修改失败"));
            }
        } catch (err) {
            console.log(err);
            res.send(response({}, 0, 'fail'));
        }
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
})

manageRouter.post('/broadcast', async (req, res, err) => {
    try {
        let ret = await mysql(`select user_id from users_info;`);
        let wrong_ids = [];
        let content = req.body.content;
        let time = moment().format('YYYY-MM-DD');
        console.log(content);

        if (content == undefined || content.length <= 0) {
            res.send(response({}, 0, 'content has something wrong'));
        }
        else {
            for (let i = 0; i < ret.length ; i++) {
                let id = ret[i].user_id;
                if (id != 60) {
                    try {
                        await mysql(`insert into message_official (sender_id, receiver_id, description, status, kind, time) value(46, ?, ?, 1, 0, ?)`, [id, content, time]);
                    } catch (err) {
                        wrong_ids.push(id);
                    }
                }
            }
    
            res.send(response({}, 1, 'success'));
        }
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
})

manageRouter.get('/queryReport', async (req, res, err) => {
    try {
        let reports = await mysql(`select id, report.user_id, username as user_name, reason, item, table_name, report.time 
        from report, users_info
        where report.user_id = users_info.user_id;`, []);
        let results = [];

        for (let i = 0; i < reports.length ; i++) {
            reports[i].time = moment(reports[i].time).format('YYYY-MM-DD');

            let item = reports[i].item;
            let table_name = reports[i].table_name;
            
            try {
                if (table_name == 'comment') {
                    let ret = await mysql(`select content from comment where comment_id = ?;`, [item]);
                    if (ret.length == 0) {
                        throw Error('Item is not exists');
                    }
                    reports[i].content = ret[0].content;
                }
                else if (table_name == 'post_comment') {
                    let ret = await mysql(`select content from post_comment where post_comment_id = ?;`, [item]);
                    if (ret.length == 0) {
                        throw Error('Item is not exists');
                    }
                    reports[i].content = ret[0].content;
                }
                else if (table_name == 'QA_posts') {
                    let ret = await mysql(`select content from QA_posts where post_id = ?;`, [item]);
                    if (ret.length == 0) {
                        
                        throw Error('Item is not exists');
                    }
                    reports[i].content = ret[0].content;
                }
                else if (table_name == 'reply') {
                    let ret = await mysql(`select content from reply where reply_id = ?;`, [item]);
                    if (ret.length == 0) {
                        throw Error('Item is not exists');
                    }
                    reports[i].content = ret[0].content;
                }
                else {
                    throw Error('Item is not exists');
                }
                results.push(reports[i]);
            } catch (err) {
                if (err.message == 'Item is not exists') {
                    try {
                        await mysql(`delete from report where id = ?;`, [reports[i].id]);
                    } catch (err) {
                        console.log(err);
                    }
                    try {
                        await mysql(`insert into message_official (sender_id, receiver_id, description, status, kind, time) value(46, ?, ?, 1, 0, ?)`, [reports[i].user_id, '举报成功，相关内容已被处理', reports[i].time]);
                    } catch (err) {
                        throw Error(err);
                    }
                }
                else {
                    console.log(err);
                    reports[i].content = 'error!!!' + err;
                }
            }
        }

        res.send(response({'reports': results}, 1, 'success'));
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
})

manageRouter.post('/handleReport', async (req, res, err) => {
    try {
        let id = req.body.id;
        let user_id = req.body.user_id;
        let pass = req.body.pass;
        let time = moment().format('YYYY-MM-DD');

        if (pass == 0) {
            let content = '举报失败';
            try {
                await mysql(`insert into message_official (sender_id, receiver_id, description, status, kind, time) value(46, ?, ?, 1, 0, ?)`, [user_id, content, time]);
            } catch (err) {
                throw Error(err);
            }
        } 
        else {
            let content = '举报成功，相关内容已被处理';
            try {
                await mysql(`insert into message_official (sender_id, receiver_id, description, status, kind, time) value(46, ?, ?, 1, 0, ?)`, [user_id, content, time]);
            } catch (err) {
                throw Error(err);
            }

            try {
                delete_then(id);
            } catch (err) {
                console.log(err);
            }
        }
        
        try {
            await mysql(`delete from report where id = ?;`, [id]);
        } catch (err) {
            throw Error(err);
        }
        
        res.send(response({}, 1, 'success'));

    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
})

/* ------------------- comment management api ----------------------- */
manageRouter.get('/queryQuestionComment', async function(req, res, next) {
    try {
        let courseId = req.query.course_id;
        let questionId = req.query.question_id;
        
        let sql = 'select \
                    c.comment_id as comment_id, \
                    c.user_id as user_id, \
                    u.username as user_name, \
                    c.create_time as create_time, \
                    c.content as content \
                    from comment c \
                    inner join users_info u \
                    on c.user_id = u.user_id \
                    where course_id = ? \
                    and question_id = ? \
                    order by c.create_time';
        let comments = await mysql(sql, [courseId, questionId]);
        for (let i = 0, length = comments.length; i < length; i++) {
            // change create time
            comments[i]['create_time'] = moment(comments[i]['create_time']).format('YYYY-MM-DD HH:mm');
        }

        res.json(response({'comments': comments}, 1, 'success'));
    } catch (e) {
        console.log(e);
        res.json(response({}, 0, 'fail'));
    }
});

manageRouter.post('/deleteQuestionComment', async function(req, res, next) {
    try {
        let commentId = req.body.comment_id;

        let sql = 'delete from comment where comment_id = ?';
        await mysql(sql, commentId);

        res.json(response({}, 1, 'success'));
    } catch (e) {
        console.log(e);
        res.json(response({}, 0, 'fail'));
    }
});

manageRouter.get('/queryQuestionCommentReply', async function(req, res, next) {
    try {
        let commentId = req.query.comment_id;

        let sql = 'select \
                    r.reply_id as reply_id, \
                    r.user_id as user_id, \
                    u.username as user_name, \
                    r.create_time as create_time, \
                    r.content as content \
                    from reply r \
                    inner join users_info u \
                    on r.user_id = u.user_id \
                    where r.comment_id = ? \
                    order by create_time';
        let replys = await mysql(sql, commentId);
        for (let i = 0, length = replys.length; i < length; i++) {
            // change create time
            replys[i]['create_time'] = moment(replys[i]['create_time']).format('YYYY-MM-DD HH:mm');
        }

        res.json(response({'replys': replys}, 1, 'success'));
    } catch (e) {
        console.log(e);
        res.json(response({}, 0, 'fail'));
    }
});

manageRouter.post('/deleteQuestionCommentReply', async function(req, res, next) {
    try {
        let replyId = req.body.reply_id;

        let sql = 'delete from reply where reply_id = ?';
        await mysql(sql, replyId);

        res.json(response({}, 1, 'success'));
    } catch (e) {
        console.log(e);
        res.json(response({}, 0, 'fail'));
    }
});

/* ------------------- post management api ----------------------- */
manageRouter.get('/queryPost', async function(req, res, next) {
    try {
        let courseId = req.query.course_id;
        let posts = await getPosts(parseInt(courseId));
        
        res.json(response({'posts': posts}, 1, 'success'));
    } catch (e) {
        console.log(e);
        res.json(response({}, 0, 'fail'));
    }
});

manageRouter.post('/deletePost', async function(req, res, next) {
    try {
        let postId = req.body.post_id;
        let sql = 'delete from QA_posts where post_id = ?';
        await mysql(sql, postId);

        res.json(response({}, 1, 'success'));
    } catch (e) {
        console.log(e);
        res.json(response({}, 0, 'fail'));
    }
});

manageRouter.get('/queryPostComment', async function(req, res, next) {
    try {
        let postId = req.query.post_id;
        let comments = await getPostComments(parseInt(postId));

        res.json(response({'comments': comments}, 1, 'success'));
    } catch (e) {
        console.log(e);
        res.json(response({}, 0, 'fail'));
    }
});

manageRouter.post('/deletePostComment', async function(req, res, next) {
    try {
        let postCommentId = req.body.post_comment_id;
        let sql = 'delete from post_comment where post_comment_id = ?';
        await mysql(sql, postCommentId);

        res.json(response({}, 1, 'success'));
    } catch (e) {
        console.log(e);
        res.json(response({}, 0, 'fail'));
    }
});

async function getPosts(courseId) {
    // All
    let sql = 'select \
                p.post_id as post_id, \
                p.user_id as user_id, \
                u.username as user_name, \
                p.create_time as create_time, \
                p.last_modified_time as last_modified_time, \
                p.post_title as post_title, \
                p.is_top as is_top, \
                p.post_type as post_type, \
                p.cur_status as cur_status, \
                p.content as content \
                from QA_posts p \
                inner join users_info u \
                on p.user_id = u.user_id \
                where course_id = ? \
                order by is_top desc, \
                last_modified_time desc';
    let posts = await mysql(sql, courseId);
    let postComments;
    for (let i = 0, length = posts.length; i < length; i++) {
        sql = 'select * from post_comment where post_id = ?';
        postComments = await mysql(sql, posts[i]['post_id']);
        posts[i]['people_in_discussion'] = postComments.length;
        posts[i]['create_time'] = moment(posts[i]['create_time']).format('YYYY-MM-DD HH:mm');
        posts[i]['last_modified_time'] = moment(posts[i]['last_modified_time']).format('YYYY-MM-DD HH:mm');
    }
    return posts;
}

async function getPostComments(postId) {
    let sql = 'select \
                p.post_comment_id as post_comment_id, \
                p.user_id as user_id, \
                u.username as user_name, \
                p.content as content, \
                p.create_time as create_time, \
                p.is_right_answer as is_right_answer \
                from post_comment p \
                inner join users_info u \
                on p.user_id = u.user_id \
                where p.post_id = ? \
                order by p.create_time desc';
    let postComments = await mysql(sql, postId);
    for (let i = 0, length = postComments.length; i < length; i++) {
        // like count
        sql = 'select * from post_comment_like where post_comment_id = ? and status = 1';
        postComments[i]['like_count'] = (await mysql(sql, postComments[i]['post_comment_id'])).length;
        // modify time format
        postComments[i]['create_time'] = moment(postComments[i]['create_time']).format('YYYY-MM-DD HH:mm');
    }
    return postComments;
}

module.exports = manageRouter;