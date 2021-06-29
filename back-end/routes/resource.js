const express = require('express');
const mysql = require('../module/mysql');
const response = require('../module/res');
const moment = require('moment');
moment.locale('zh-cn'); 

const resourceRouter = express.Router();

resourceRouter.all('*', (req, res, next) => {
    if (req.body.userid == 60) {
        res.send(response({}, 2, '测试账号'));
    }
    else {
        next();
    }
});

resourceRouter.get('/getResource', async (req, res, err) => {
    try {
        let user_id = req.body.userid;
        let course_id = req.query.course_id;

        try {
            let sourceList = await mysql(`select id, username as user_name, topic, description, link, resource_sharing.time, password, if(resource_sharing.user_id=?, 1, 0) as can_delete
            from resource_sharing, users_info 
            where resource_sharing.isCheck = 1 and resource_sharing.course_id = ? and resource_sharing.user_id = users_info.user_id;`, [user_id, course_id]);

            for (let i = 0; i < sourceList.length ; i++) {
                sourceList[i].time = moment(sourceList[i].time).format('YYYY-MM-DD');
            }

            res.send(response({sourceList}, 1, 'success'));

        } catch (err) {
            throw Error(err);
        }

    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
})

resourceRouter.post('/postResource', async (req, res, err) => {
    try {
        let user_id = req.body.userid;
        let course_id = req.body.course_id;
        let topic = req.body.topic;
        let description = req.body.description;
        let link = req.body.link;
        let password = req.body.password == undefined ? null : req.body.password;
        let time = moment().format('YYYY-MM-DD');

        if (course_id == undefined) {
            throw Error('course_id is empty');
        }

        if (topic.length <= 0 || topic.length > 15) {
            throw Error('topic\'s length is too long or too short');
        }

        if (description.length > 100) {
            throw Error('description\'s length is too long');
        }

        await mysql(`insert into resource_sharing (user_id, course_id, topic, description, link, time, password, isCheck) 
        value(?, ?, ?, ?, ?, ?, ?, 0);`, [user_id, course_id, topic, description, link, time, password]);

        res.send(response({}, 1, 'success'));

    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
})

resourceRouter.post('/deleteResource', async (req, res, err) => {
    try {
        let user_id = req.body.userid;
        let id = req.body.id;
        let course_id = req.body.course_id;

        let ret = await mysql(`select user_id from resource_sharing where id = ? and course_id = ?;`, [id, course_id]);

        // console.log(ret);

        if (ret.length == 0) {
            res.send(response({}, 0, '资源不存在'));
        }
        else if (ret[0].user_id != user_id) {
            res.send(response({}, 0, '您没有权限删除此资源'));
        }
        else {
            await mysql(`delete from resource_sharing where id = ? and course_id;`, [id, course_id]);

            res.send(response({}, 1, 'success'));
        }
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
})

resourceRouter.get('/searchResource', async (req, res, err) => {
    try {
        let user_id = req.body.userid;
        let course_id = req.query.course_id;
        let word = req.query.word;

        if (word == undefined) {
            try {
                let sourceList = await mysql(`select id, username as user_name, topic, description, link, resource_sharing.time, password, if(resource_sharing.user_id=?, 1, 0) as can_delete
                from resource_sharing, users_info 
                where resource_sharing.isCheck = 1 and resource_sharing.course_id = ? and resource_sharing.user_id = users_info.user_id;`, [user_id, course_id]);
    
                for (let i = 0; i < sourceList.length ; i++) {
                    sourceList[i].time = moment(sourceList[i].time).format('YYYY-MM-DD');
                }
    
                res.send(response({sourceList}, 1, 'success'));
            } catch (err) {
                throw Error(err);
            }
        }
        else {
            if (word.indexOf('\'') != -1) {
                res.send(response({}, 0, '非法字符'));
            }
            else {
                try {
                    let sourceList = await mysql(`select id, username as user_name, topic, description, link, resource_sharing.time, password, if(resource_sharing.user_id=?, 1, 0) as can_delete
                    from resource_sharing, users_info 
                    where resource_sharing.isCheck = 1 and (topic like '%${word}%' or description like '%${word}%') and resource_sharing.course_id = ? and resource_sharing.user_id = users_info.user_id;`, [user_id, course_id]);
        
                    for (let i = 0; i < sourceList.length ; i++) {
                        sourceList[i].time = moment(sourceList[i].time).format('YYYY-MM-DD');
                    }
        
                    res.send(response({sourceList}, 1, 'success'));
                } catch (err) {
                    throw Error(err);
                }
            }
        }

    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
})
module.exports = resourceRouter;