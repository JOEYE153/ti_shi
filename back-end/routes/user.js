const express = require('express');
const mysql = require('../module/mysql');
const response = require('../module/res');
const encryption = require('../module/encryption');
const moment = require('moment');
moment.locale('zh-cn'); 

const userRouter = express.Router();


userRouter.get('/all', async (req, res, err) => {
    try {
        let userid = req.body.userid;
        let course_id = req.query.course_id;

        let result = await mysql(`select username, avatar from users_info where user_id=?;`, [userid]);
        // console.log(result);

        let username = result[0].username;
        let avatar = result[0].avatar;

        let problem_done_sum = (await mysql(`select count(question_id) as count from user_question_status where user_id=? and course_id=?;`, [userid, course_id]))[0].count;

        let day_pre = moment((await mysql(`select time from users_info where user_id=?;`, [userid]))[0].time);
        day_pre.hours(0);
        day_pre.minutes(0);
        day_pre.seconds(1);
        // console.log(day_pre);
        let day_now = moment();
        day_now.hours(0);
        day_now.minutes(0);
        day_now.seconds(1);
        // console.log(day_now);
        // console.log(day_now.diff(day_pre, 'days'));

        res.send(response({
            "username": username,
            "avatar": avatar,
            "problem_done_sum": problem_done_sum,
            "day_sum": day_now.diff(day_pre, 'days') + 1,
            "query_sum": 0,
            "like_sum": 0
        }, 1, "success"));
    } catch (e) {
        console.log(e);
        res.send(response({}, 0, 'fail'));
    }
    
})

userRouter.get('/profile', async (req, res, err) => {
    try {
        let userid = req.body.userid;

        let result = await mysql(`select * from users_info where user_id=?;`, [userid]);
        // console.log(result);

        res.send(response({
            "avatar": result[0].avatar,
            "username": result[0].username,
            "sex": result[0].sex,
            "birthday": result[0].birthday,
            "grade": result[0].grade,
            "profession": result[0].profession,
            "school": result[0].school
        }, 1, "success"));
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
})

userRouter.put('/modify', async (req, res, err) => {
    if (req.body.userid == 60) {
        res.send(response({}, 2, '测试账号'));
        return;
    }
    try {
        if (req.body.userid == 60) {
            res.send(response({}, 2, '测试账号'));
            return;
        }
        let userid = req.body.userid;
    
        let result = await mysql(`select * from users_info where user_id=?;`, [userid]);
        // console.log(result[0]);
    
        let username = req.body.username == "" ? result[0].username : req.body.username;
        let sex = req.body.sex == "" ? result[0].sex : req.body.sex;
        let avatar = result[0].avatar;
        let birthday = req.body.birthday == "" ? result[0].birthday : req.body.birthday;
        let grade = req.body.grade == "" ? result[0].grade : req.body.grade;
        let profession = req.body.profession == "" ? result[0].profession : req.body.profession;
        let school = req.body.school == "" ? result[0].school : req.body.school;
    
        await mysql(`update users_info 
                    set username=?, avatar=?, sex=?, 
                    birthday=?, grade=?, profession=?, 
                    school=? where user_id=?;`, [username, avatar, sex, birthday, grade, profession, school, userid]);
    
        if (req.body.password != "") {
            let encryptPassword = await encryption.encrypt(req.body.password);
            
            await mysql(`update email_users set Encryted_password=? where user_id=?;`, [encryptPassword, userid]);
        }
        res.send(response({}, 1, "success"));
    } catch (e) {
        console.log(e);
        res.send(response({}, 0, 'fail'));
    }
})


module.exports = userRouter;
