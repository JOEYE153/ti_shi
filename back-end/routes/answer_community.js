let express = require('express');
let moment = require('moment');
let answerCommunityRouter = express.Router();

const sqlQuery = require('../module/mysql');
const resBody = require('../module/res');

answerCommunityRouter.get('/get_all_post', async function(req, res, next) {
    try {
        let courseId = req.query.course_id;
        let postStatus = req.query.post_status;
        let userId = req.body.userid;
        let posts = await getPosts(parseInt(courseId), parseInt(postStatus), parseInt(userId));
        let data = {};
        data['post_list'] = posts;
    
        res.json(resBody(data, 1, 'success'));
    } catch (e) {
        console.log(e);
        res.json(resBody({}, 0, 'fail'));
    }
});

answerCommunityRouter.get('/get_post_info', async function(req, res, next) {
    try {
        let postId = req.query.post_id;
        let userId = req.body.userid;
        let postDetail = await getPostDetail(postId, userId);
    
        res.json(resBody(postDetail, 1, 'success'));
    } catch (e) {
        console.log(e);
        res.json(resBody({}, 0, 'fail'));
    }
})

answerCommunityRouter.post('/post_add', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(resBody({}, 2, '测试账号'));
        return;
    }
    try {
        let courseId = req.body.course_id;
        let postTitle = req.body.post_title;
        let postType = req.body.post_type;
        let content = req.body.content;
        let curTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        let userId = req.body.userid;
    
        // insert new post
        let sql = 'insert into QA_posts values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        await sqlQuery(sql, [null, courseId, userId, curTime, curTime, postTitle, 0, content, 0, postType]);
    
        res.json(resBody({}, 1, 'success'));
    } catch (e) {
        console.log(e);
        res.json(resBody({}, 0, 'fail'));
    }
});

answerCommunityRouter.post('/post_comment_add', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(resBody({}, 2, '测试账号'));
        return;
    }
    try {
        let postId = parseInt(req.body.post_id);
        let content = req.body.content;
        let curTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        let userId = parseInt(req.body.userid);
    
        // insert new post comment
        let sql = 'insert into post_comment values(?, ?, ?, ?, ?, ?)';
        await sqlQuery(sql, [null, postId, content, userId, curTime, 0]);

        // update post last modified time
        sql = 'update QA_posts set last_modified_time = ? where post_id = ?';
        await sqlQuery(sql, [curTime, postId]);

        // create message
        sql = 'select p.post_title as post_title, \
                p.user_id as user_id, \
                c.course_name as course_name \
                from course c \
                inner join QA_posts p \
                on c.course_id = p.course_id \
                where p.post_id = ?';
        let queryResult = (await sqlQuery(sql, postId))[0];
        let postUserId = queryResult['user_id'];
        let courseName = queryResult['course_name'];
        let postTitle = queryResult['post_title'];

        let position = courseName + '下的讨论/提问\"' + postTitle + '\"';
        let description = content;
        let url = '/pages/wenda/wendadetail?post_id=' + postId;

        const formatYmd = date => date.toISOString().slice(0, 10);                    
        let curDate = formatYmd(new Date());
        
        sql = 'insert into message_person values(?, ?, ?, ?, ?, ?, ?, ?, ?)';
        await sqlQuery(sql, [null, userId, postUserId, position, description, 1, 2, curDate, url]);
    
        res.json(resBody({}, 1, 'success'));
    } catch (e) {
        console.log(e);
        res.json(resBody({}, 0, 'fail'));
    }
});

answerCommunityRouter.post('/post_edit', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(resBody({}, 2, '测试账号'));
        return;
    }
    try {
        let postId = req.body.post_id;
        let postType = req.body.post_type;
        let postTitle = req.body.post_title;
        let content = req.body.content;
        let curTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        let userId = req.body.userid;
    
        // check userId
        let sql = 'select user_id from QA_posts where post_id = ?';
        let postAuthorId = await sqlQuery(sql, postId);
        if (postAuthorId[0]['user_id'] == userId) {
            // update post
            sql = 'update QA_posts set \
                    post_type = ?, \
                    post_title = ?, \
                    content = ?, \
                    last_modified_time = ? \
                    where post_id = ?';
            await sqlQuery(sql, [postType, postTitle, content, curTime, postId]);
    
            res.json(resBody({}, 1, 'success'));
        } else {
            // have no permission
            res.json(resBody({}, 0, '你没有权限'));
        }
    } catch (e) {
        console.log(e);
        res.json(resBody({}, 0, 'fail'));
    }
});

answerCommunityRouter.post('/post_comment_edit', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(resBody({}, 2, '测试账号'));
        return;
    }
    try {
        let postCommentId = req.body.post_comment_id;
        let postId = req.body.post_id;
        let content = req.body.content;
        let curTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        let userId = req.body.userid;
    
        // check userId
        let sql = 'select user_id from post_comment where post_comment_id = ?';
        let postCommentAuthorId = await sqlQuery(sql, postCommentId);
        if (postCommentAuthorId[0]['user_id'] == userId) {
            // update post comment
            sql = 'update post_comment set \
                    content = ? \
                    where post_comment_id = ?';
            await sqlQuery(sql, [content, postCommentId]);
    
            // update post modified time
            sql = 'update QA_posts set last_modified_time = ? where post_id = ?';
            await sqlQuery(sql, [curTime, postId]);
    
            res.json(resBody({}, 1, 'success'));
        } else {
            // have no permission
            res.json(resBody({}, 0, '你没有权限'));
        }
    } catch (e) {
        console.log(e);
        res.json(resBody({}, 0, 'fail'));
    }
});

answerCommunityRouter.post('/post_comment_like', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(resBody({}, 2, '测试账号'));
        return;
    }
    try {
        let postCommentId = req.body.post_comment_id;
        let isLike = req.body.is_like;
        let userId = req.body.userid;
    
        let sql = 'select * from post_comment_like where post_comment_id = ? and user_id = ?';
        let result = await sqlQuery(sql, [postCommentId, userId]);
        if (result.length == 0) {
            sql = 'insert into post_comment_like values(?, ?, ?, ?)';
            await sqlQuery(sql, [null, postCommentId, userId, isLike]);
        } else {
            sql = 'update post_comment_like set status = ? where post_comment_id = ? and user_id = ?';
            await sqlQuery(sql, [isLike, postCommentId, userId]);
        }
    
        res.json(resBody({}, 1, 'success'));
    } catch (e) {
        console.log(e);
        res.json(resBody({}, 0, 'fail'));
    }
});

answerCommunityRouter.post('/post_comment_is_right', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(resBody({}, 2, '测试账号'));
        return;
    }
    try {
        let postUserId = req.body.post_user_id;
        let postCommentId = req.body.post_comment_id;
        let isRightAnswer = req.body.is_right_answer;
        let userId = req.body.userid;
    
        // check userId
        if (userId == postUserId) {
            // update post comment right flag
            let sql = 'update post_comment set is_right_answer = ? where post_comment_id = ?';
            await sqlQuery(sql, [isRightAnswer, postCommentId]);
    
            res.json(resBody({}, 1, 'success'));
        } else {
            // have no permission
            res.json(resBody({}, 0, '你没有权限'));
        }
    } catch (e) {
        console.log(e);
        res.json(resBody({}, 0, 'fail'));
    }
});

answerCommunityRouter.delete('/post_delete', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(resBody({}, 2, '测试账号'));
        return;
    }
    try {
        let postId = req.body.post_id;
        let userId = req.body.userid;
    
        let sql = 'select * from QA_posts where post_id = ?';
        let result = await sqlQuery(sql, postId);
        if (result.length != 0 && userId == result[0]['user_id']) {
            sql = 'delete from QA_posts where post_id = ?';
            await sqlQuery(sql, postId);
            res.json(resBody({}, 1, 'success'));
        } else {
            // have no permission
            res.json(resBody({}, 0, '帖子已被删除或你没有权限'));
        }
    } catch (e) {
        console.log(e);
        res.json(resBody({}, 0, 'fail'));
    }
});

answerCommunityRouter.delete('/post_comment_delete', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(resBody({}, 2, '测试账号'));
        return;
    }
    try {
        let postCommentId = req.body.post_comment_id;
        let userId = req.body.userid;
    
        let sql = 'select * from post_comment where post_comment_id = ?';
        let result = await sqlQuery(sql, postCommentId);
        if (result.length != 0 && userId == result[0]['user_id']) {
            sql = 'delete from post_comment where post_comment_id = ?';
            await sqlQuery(sql, postCommentId);
            res.json(resBody({}, 1, 'success'));
        } else {
            // have no permission
            res.json(resBody({}, 0, '评论已被删除或你没有权限'));
        }
    } catch (e) {
        console.log(e);
        res.json(resBody({}, 0, 'fail'));
    }
});

answerCommunityRouter.get('/post_search', async function(req, res, next) {
    try {
        let courseId = req.query.course_id;
        let keyword = req.query.keyword;
        let postStatus = req.query.post_status;
        let userId = req.body.userid;
        let posts = await searchPosts(parseInt(courseId), parseInt(postStatus), parseInt(userId), keyword);
        let data = {};
        data['post_list'] = posts;
    
        res.json(resBody(data, 1, 'success'));
    } catch (e) {
        console.log(e);
        res.json(resBody({}, 0, 'fail'));
    }
});

answerCommunityRouter.post('/post_status', async function(req, res, next) {
    if (req.body.userid == 60) {
        res.send(resBody({}, 2, '测试账号'));
        return;
    }
    try {
        let postUserId = req.body.post_user_id;
        let postId = req.body.post_id;
        let postStatus = req.body.post_status;
        let userId = req.body.userid;
    
        // check userId
        if (userId == postUserId) {
            // update post status
            let sql = 'update QA_posts set cur_status = ? where post_id = ?';
            await sqlQuery(sql, [postStatus, postId]);
    
            res.json(resBody({}, 1, 'success'));
        } else {
            // have no permission
            res.json(resBody({}, 0, '你没有权限'));
        }
    } catch (e) {
        console.log(e);
        res.json(resBody({}, 0, 'fail'));
    }    
});

async function getPosts(courseId, postStatus, userId) {
    let sql, posts;
    if (postStatus == 0 || postStatus == 1) {
        // Open or Closed
        sql = 'select \
                post_id, \
                create_time, \
                last_modified_time, \
                post_title, \
                is_top, \
                post_type, \
                cur_status \
                from QA_posts \
                where cur_status = ? \
                and course_id = ? \
                order by is_top desc, \
                last_modified_time desc';
        posts = await sqlQuery(sql, [postStatus, courseId]);
    } else if (postStatus == 2) {
        // Mine
        sql = 'select \
                post_id, \
                create_time, \
                last_modified_time, \
                post_title, \
                is_top, \
                post_type, \
                cur_status \
                from QA_posts \
                where course_id = ? \
                order by is_top desc, \
                last_modified_time desc';
        posts = await sqlQuery(sql, courseId);
    } else if (postStatus == 3) {
        // All
        sql = 'select \
                post_id, \
                create_time, \
                last_modified_time, \
                post_title, \
                is_top, \
                post_type, \
                cur_status \
                from QA_posts \
                where user_id = ? \
                and course_id = ? \
                order by is_top desc, \
                last_modified_time desc';
        posts = await sqlQuery(sql, [userId, courseId]);
    }
    let postComments;
    for (let i = 0, length = posts.length; i < length; i++) {
        sql = 'select * from post_comment where post_id = ?';
        postComments = await sqlQuery(sql, posts[i]['post_id']);
        posts[i]['people_in_discussion'] = postComments.length;
        posts[i]['create_time'] = moment(posts[i]['create_time']).format('YYYY-MM-DD HH:mm');
        posts[i]['last_modified_time'] = moment(posts[i]['last_modified_time']).format('YYYY-MM-DD HH:mm');
    }
    return posts;
}

async function getPostDetail(postId, userId) {
    let sql;
    // get post info
    sql = 'select \
            p.post_id as post_id, \
            p.course_id as course_id, \
            c.course_name as course_name, \
            p.post_title as post_title, \
            p.cur_status as cur_status, \
            p.user_id as user_id, \
            u.username as user_name, \
            u.avatar as img_url, \
            p.create_time as create_time, \
            p.content as content, \
            p.post_type \
            from QA_posts p \
            inner join users_info u \
            on p.user_id = u.user_id \
            inner join course c \
            on p.course_id = c.course_id \
            where p.post_id = ?';
    let postDetail = await sqlQuery(sql, postId);
    postDetail[0]['create_time'] = moment(postDetail[0]['create_time']).format('YYYY-MM-DD HH:mm');
    postDetail[0]['have_permission_edit_post'] = (userId == postDetail[0]['user_id']) ? 1 : 0;

    // get post comment info
    let postComments = await getPostComments(postId, userId);
    postDetail[0]['post_comment_list'] = postComments;

    return postDetail[0];
}

async function getPostComments(postId, userId) {
    let sql = 'select \
                p.post_comment_id as post_comment_id, \
                p.user_id as user_id, \
                u.username as user_name, \
                u.avatar as img_url, \
                p.content as content, \
                p.create_time as create_time, \
                p.is_right_answer as is_right_answer \
                from post_comment p \
                inner join users_info u \
                on p.user_id = u.user_id \
                where p.post_id = ? \
                order by p.create_time desc';
    let postComments = await sqlQuery(sql, postId);
    for (let i = 0, length = postComments.length; i < length; i++) {
        // have permission for comment
        postComments[i]['have_permission_for_comment'] = (postComments[i]['user_id'] == userId) ? 1 : 0;
        // is like
        sql = 'select * from post_comment_like where post_comment_id = ? and user_id = ? and status = 1';
        postComments[i]['is_like'] = (await sqlQuery(sql, [postComments[i]['post_comment_id'], userId])).length;
        // like count
        sql = 'select * from post_comment_like where post_comment_id = ? and status = 1';
        postComments[i]['like_count'] = (await sqlQuery(sql, postComments[i]['post_comment_id'])).length;
        // modify time format
        postComments[i]['create_time'] = moment(postComments[i]['create_time']).format('YYYY-MM-DD HH:mm');
    }
    return postComments;
}

async function searchPosts(courseId, postStatus, userId, keyword) {
    let sql, posts;
    keyword = '%' + keyword + '%';
    if (postStatus == 0 || postStatus == 1) {
        // Open or Closed
        sql = 'select \
                post_id, \
                create_time, \
                last_modified_time, \
                post_title, \
                is_top, \
                post_type, \
                cur_status \
                from QA_posts \
                where cur_status = ? \
                and course_id = ? \
                and post_title like ? \
                order by is_top desc, \
                last_modified_time desc';
        posts = await sqlQuery(sql, [postStatus, courseId, keyword]);
    } else if (postStatus == 2) {
        // Mine
        sql = 'select \
                post_id, \
                create_time, \
                last_modified_time, \
                post_title, \
                is_top, \
                post_type, \
                cur_status \
                from QA_posts \
                where course_id = ? \
                and post_title like ? \
                order by is_top desc, \
                last_modified_time desc';
        posts = await sqlQuery(sql, [courseId, keyword]);
    } else if (postStatus == 3) {
        // All
        sql = 'select \
                post_id, \
                create_time, \
                last_modified_time, \
                post_title, \
                is_top, \
                post_type, \
                cur_status \
                from QA_posts \
                where user_id = ? \
                and course_id = ? \
                and post_title like ? \
                order by is_top desc, \
                last_modified_time desc';
        posts = await sqlQuery(sql, [userId, courseId, keyword]);
    }
    let postComments;
    for (let i = 0, length = posts.length; i < length; i++) {
        sql = 'select * from post_comment where post_id = ?';
        postComments = await sqlQuery(sql, posts[i]['post_id']);
        posts[i]['people_in_discussion'] = postComments.length;
        posts[i]['create_time'] = moment(posts[i]['create_time']).format('YYYY-MM-DD HH:mm');
        posts[i]['last_modified_time'] = moment(posts[i]['last_modified_time']).format('YYYY-MM-DD HH:mm');
    }
    return posts;
}

module.exports = answerCommunityRouter;