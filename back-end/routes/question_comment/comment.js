var express = require('express');
var moment = require('moment');
var commentRouter = express.Router();

const sqlQuery = require('../../module/mysql');
const resBody = require('../../module/res');
const response = require('../../module/res');

commentRouter.get('/comment', async function(req, res, next) {
    try {
        let course_id = req.query.course_id;
        let question_id = req.query.question_id;
        let user_id = req.body.userid;
    
        let comments = await getComments(parseInt(course_id), parseInt(question_id), parseInt(user_id));
        
        let data = {};
        data['comment_list'] = comments;
        res.json(resBody(data, 1, 'success'));
    } catch (e) {
        console.log(e);
        res.json(resBody({}, 0, 'fail'));
    }
});

commentRouter.get('/reply', async function(req, res, next) {
    try {
        let comment_id = req.query.comment_id;
        let user_id = req.body.userid;
    
        let data = await getReplys(parseInt(comment_id), parseInt(user_id));
        res.json(resBody(data, 1, 'success'));
    } catch (e) {
        console.log(e);
        res.json(resBody({}, 0, 'fail'));
    }
});

commentRouter.post('/comment_add', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(response({}, 2, '测试账号'));
        return;
    }
    try {
        let course_id = req.body.course_id;
        let question_id = req.body.question_id;
        let content = req.body.content;
        let create_time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        let user_id = req.body.userid;
    
        let sql = 'insert into comment values(?, ?, ?, ?, ?, ?)';
        await sqlQuery(sql, [null, course_id, question_id, content, user_id, create_time]);
    
        res.json(resBody({}, 1, 'success'));
    } catch (e) {
        console.log(e);
        res.json(resBody({}, 0, 'fail'));
    }
});

commentRouter.post('/reply_add', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(response({}, 2, '测试账号'));
        return;
    }
    try {
        let comment_id = parseInt(req.body.comment_id);
        let reply_to_user_id = req.body.reply_to_user_id == '' ? null : parseInt(req.body.reply_to_user_id);
        let content = req.body.content;
        let create_time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        let user_id = parseInt(req.body.userid);
    
        let sql = 'insert into reply values(?, ?, ?, ?, ?, ?)';
        await sqlQuery(sql, [null, comment_id, user_id, content, create_time, reply_to_user_id]);

        // create message
        sql = 'select c.course_name as course_name, \
                m.user_id as user_id, \
                m.question_id as question_id \
                from course c \
                inner join comment m \
                on c.course_id = m.course_id \
                where m.comment_id = ?';
        let query_result = (await sqlQuery(sql, comment_id))[0];
        let comment_user_id = query_result['user_id'];
        let course_name = query_result['course_name'];
        let question_id = query_result['question_id'];

        let receiver_id = reply_to_user_id == null ? comment_user_id : reply_to_user_id;
        let position = course_name + '第' + question_id + '题';
        let description = content;
        let url = '/pages/commentReply/commentReply?commentId=' + question_id;

        const formatYmd = date => date.toISOString().slice(0, 10);                    
        let cur_date = formatYmd(new Date());
        
        sql = 'insert into message_person values(?, ?, ?, ?, ?, ?, ?, ?, ?)';
        await sqlQuery(sql, [null, user_id, receiver_id, position, description, 1, 2, cur_date, url]);
    
        res.json(resBody({}, 1, 'success'));
    } catch (e) {
        console.log(e);
        res.json(resBody({}, 0, 'fail'));
    }
});

commentRouter.post('/comment_like', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(response({}, 2, '测试账号'));
        return;
    }
    try {
        let comment_id = req.body.comment_id;
        let is_like = req.body.is_like;
        let user_id = req.body.userid;
        console.log(req.body);
    
        let sql = 'select * from comment_like where comment_id = ? and user_id = ?';
        let result = await sqlQuery(sql, [comment_id, user_id]);
        if (result.length == 0) {
            sql = 'insert into comment_like values(?, ?, ?, ?)';
            await sqlQuery(sql, [null, comment_id, user_id, is_like]);
        } else {
            sql = 'update comment_like set status = ? where comment_id = ? and user_id = ?';
            await sqlQuery(sql, [is_like, comment_id, user_id]);
        }
    
        res.json(resBody({}, 1, 'success'));
    } catch (e) {
        console.log(e);
        res.json(resBody({}, 0, 'fail'));
    }
});

commentRouter.post('/reply_like', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(response({}, 2, '测试账号'));
        return;
    }
    try {
        let reply_id = req.body.reply_id;
        let is_like = req.body.is_like;
        let user_id = req.body.userid;
    
        let sql = 'select * from reply_like where reply_id = ? and user_id = ?';
        let result = await sqlQuery(sql, [reply_id, user_id]);
        if (result.length == 0) {
            sql = 'insert into reply_like values(?, ?, ?, ?)';
            await sqlQuery(sql, [null, reply_id, user_id, is_like]);
        } else {
            sql = 'update reply_like set status = ? where reply_id = ? and user_id = ?';
            await sqlQuery(sql, [is_like, reply_id, user_id]);
        }
    
        res.json(resBody({}, 1, 'success'));
    } catch (e) {
        console.log(e);
        res.json(resBody({}, 0, 'fail'));
    }
});

commentRouter.delete('/comment_delete', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(response({}, 2, '测试账号'));
        return;
    }
    try {
        let comment_id = req.body.comment_id;
        let user_id = req.body.userid;
        
        let sql = 'select * from comment where comment_id = ?';
        let result = await sqlQuery(sql, comment_id);
        if (result.length != 0 && user_id == parseInt(result[0]['user_id'])) {
            sql = 'delete from comment where comment_id = ?';
            result = await sqlQuery(sql, comment_id);
            res.json(resBody({}, 1, 'success'));
        } else {
            res.json(resBody({}, 0, 'comment dose not exist or you have no right'));
        }
    } catch (e) {
        console.log(e);
        res.json(resBody({}, 0, 'fail'));
    }
});

commentRouter.delete('/reply_delete', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(response({}, 2, '测试账号'));
        return;
    }
    try {
        let reply_id = req.body.reply_id;
        let user_id = req.body.userid;
        
        let sql = 'select * from reply where reply_id = ?';
        let result = await sqlQuery(sql, reply_id);
        if (result.length != 0 && user_id == parseInt(result[0]['user_id'])) {
            sql = 'delete from reply where reply_id = ?';
            result = await sqlQuery(sql, reply_id);
            res.json(resBody({}, 1, 'success'));
        } else {
            res.json(resBody({}, 0, 'reply dose not exist or you have no right'));
        }
    } catch (e) {
        console.log(e);
        res.json(resBody({}, 0, 'fail'));
    }
});

async function getComments(course_id, question_id, user_id) {
    let sql = 'select \
                c.comment_id as comment_id, \
                c.user_id as user_id, \
                u.username as user_name, \
                u.avatar as img_url, \
                c.create_time as create_time, \
                c.content as content \
                from comment c \
                inner join users_info u \
                on c.user_id = u.user_id \
                where c.course_id = ? \
                and c.question_id = ? \
                order by c.create_time';
    let comments = await sqlQuery(sql, [course_id, question_id]);
    let replys;
    for (let i = 0, length = comments.length; i < length; i++) {
        // can delete
        comments[i]['can_delete'] = (user_id == comments[i]['user_id']) ? 1 : 0;
        // is like
        sql = 'select * from comment_like where comment_id = ? and user_id = ? and status = 1';
        comments[i]['is_like'] = (await sqlQuery(sql, [comments[i]['comment_id'], user_id])).length;
        // like count
        sql = 'select * from comment_like where comment_id = ? and status = 1';
        comments[i]['like_count'] = (await sqlQuery(sql, comments[i]['comment_id'])).length;
        // replys
        sql = 'select \
                r.reply_id as reply_id, \
                u.username as user_name, \
                r.content as content \
                from reply r \
                inner join users_info u \
                on r.user_id = u.user_id \
                where r.comment_id = ? \
                order by r.create_time';
        replys = await sqlQuery(sql, comments[i]['comment_id']);
        comments[i]['all_reply_count'] = replys.length;
        if (replys.length > 2) {
            comments[i]['reply_list'] = [replys[0], replys[1]];
        } else {
            comments[i]['reply_list'] = replys;
        }
        // change create time
        comments[i]['create_time'] = moment(comments[i]['create_time']).format('YYYY-MM-DD HH:mm');
    }
    return comments;
}

async function getReplys(comment_id, user_id) {
    let data = {};
    // comment
    let sql = 'select \
                comment_id, \
                user_id, \
                create_time, \
                content \
                from comment c \
                where comment_id = ?';
    let comment = await sqlQuery(sql, comment_id);
    // comment user_name && img_url
    sql = 'select \
            username as user_name, \
            avatar as img_url \
            from users_info \
            where user_id = ?';
    let user_info = await sqlQuery(sql, comment[0]['user_id']);
    comment[0]['user_name'] = user_info[0]['user_name'];
    comment[0]['img_url'] = user_info[0]['img_url'];
    // comment like_count
    sql = 'select * from comment_like where comment_id = ? and status = 1';
    comment[0]['like_count'] = (await sqlQuery(sql, comment_id)).length;
    // comment is liked
    sql = 'select * from comment_like where comment_id = ? and user_id = ? and status = 1';
    comment[0]['is_like'] = (await sqlQuery(sql, [comment_id, user_id])).length;
    // comment can delete
    comment[0]['can_delete'] = (user_id == comment[0]['user_id']) ? 1 : 0;
    // comment all reply count
    sql = 'select * from reply where comment_id = ?';
    comment[0]['all_reply_count'] = (await sqlQuery(sql, comment_id)).length;
    data['comment'] = comment[0];
    // change create time
    comment[0]['create_time'] = moment(comment[0]['create_time']).format('YYYY-MM-DD HH:mm')
    // reply list
    sql = 'select \
            r.reply_id as reply_id, \
            r.user_id as user_id, \
            u.username as user_name, \
            u.avatar as img_url, \
            r.create_time as create_time, \
            r.content as content, \
            r.reply_to_user_id as reply_to_user_id \
            from reply r \
            inner join users_info u \
            on r.user_id = u.user_id \
            where r.comment_id = ? \
            order by r.create_time';
    let replys = await sqlQuery(sql, comment_id);
    for (let i = 0, length = replys.length; i < length; i++) {
        // reply like_count
        sql = 'select * from reply_like where reply_id = ? and status = 1';
        replys[i]['like_count'] = (await sqlQuery(sql, replys[i]['reply_id'])).length;
        // reply is liked
        sql = 'select * from reply_like where reply_id = ? and user_id = ? and status = 1';
        replys[i]['is_like'] = (await sqlQuery(sql, [replys[i]['reply_id'], user_id])).length;
        // reply can delete
        replys[i]['can_delete'] = (user_id == replys[i]['user_id']) ? 1 : 0;
        // reply all reply count
        sql = 'select * from reply where reply_id = ?';
        replys[i]['all_reply_count'] = (await sqlQuery(sql, replys[i]['reply_id'])).length;
        // reply to user name
        sql = 'select username as user_name from users_info where user_id = ?';
        if (replys[i]['reply_to_user_id']) {
            replys[i]['reply_to_user_name'] = (await sqlQuery(sql, replys[i]['reply_to_user_id']))[0]['user_name'];
        }
        // reply create time
        replys[i]['create_time'] = moment(replys[i]['create_time']).format('YYYY-MM-DD HH:mm')
    }
    data['reply_list'] = replys;
    return data;
}

module.exports = commentRouter