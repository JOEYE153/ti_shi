const express = require('express');
const mysql = require('../module/mysql');
const response = require('../module/res');
const token = require('../module/token');
const encryption = require('../module/encryption');
const allocateUserid = require('../module/allocateUserid');
const https = require("https");
const moment = require('moment');
moment.locale('zh-cn'); 

const loginRouter = express.Router();

function getTime() {
    let date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    // console.log(date);
    return date;
}

function getTimeYYMMDD() {
    let date = moment().format('YYYY-MM-DD');
    // console.log(date);
    return date + ' 12:00:00';
}

loginRouter.post('/email', async (req, res, err) => {
    try {
        // console.log(req.body);
        let email = req.body.email
        let password = req.body.password
        let sqlQueryUser = `select * from email_users where email=?`
        let result = await mysql(sqlQueryUser, [email])
        // console.log(result)
        if (!result.length) {
            res.send(
                response({}, 0, "邮箱不存在")
            )
        } 
        else {
            let userid = result[0].user_id
            let encryptPassword = result[0].Encryted_password
            // console.log(encryptPassword);
            encryption.decrypt(password, encryptPassword).then(
                async function (result) {
                    if (!result) {
                        res.send(
                            response({}, 0, "密码错误")
                        )
                    }
                    else {
                        let date = getTimeYYMMDD();
                        try {
                            await mysql(`insert into user_activity values (?, ?)`, [userid, date]);
                        } catch (e) {
                            // 今日已登录
                            // console.log(e);
                        }
                        let tk = await token.generateToken(userid);
                        // console.log(tk);
                        res.send(response({
                            "token": tk
                        }, 1, 'success'));
                    }
                }
            );
        }
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
})

loginRouter.post('/wechat', async (req, res, err) => {
    try {
        let code = req.body.code;

        // console.log(req.body.info);

        let appid = "wx3c209f3dc1baf1ba";
        let secret = "b38f2107deab77b8699ec4dc41cc3cd6";
        let grant_type = "authorization_code";
        let url = "https://api.weixin.qq.com/sns/jscode2session?grant_type=" + grant_type
                    + "&appid=" + appid + "&secret=" + secret + "&js_code=" + code;

        https.get(url, (result) => {
            result.on('data', async (data) => {
                let openid = JSON.parse(data).openid;

                // console.log('返回的信息: ', JSON.parse(data));

                let sqlQueryOpenid = `select * from wechat_users where openid=?`;
                let queryResult = await mysql(sqlQueryOpenid, [openid]);
                if (!queryResult.length) {
                    if (req.body.info == undefined) {
                        // console.log(req.body);
                        res.send(response({}, 0, "用户未授权"));
                    }
                    else {
                        let userid = await allocateUserid();
                        
                        try {
                            await mysql(`insert into wechat_users values (?, ?)`, [openid, userid]);

                            // console.log(req.body.info);
                            let username = req.body.info.nickName;
                            let avatar = req.body.info.avatarUrl;
                            let gender = req.body.info.gender == 1 ? '男' : '女';
                            let time = getTime();
                            
                            try {
                                await mysql(`insert into users_info (user_id, username, sex, avatar, time) values (?, ?, ?, ?, ?)`, [userid, username, gender, avatar, time]);
                                let date = getTimeYYMMDD();
                                try {
                                    await mysql(`insert into user_activity values (?, ?)`, [userid, date]);
                                } catch (e) {
                                    // 今日已登录
                                }
                                let tk = await token.generateToken(userid);
                                res.send(response({
                                    "token": tk
                                }, 1, 'success'));
                            } catch (err) {
                                await mysql(`delete from wechat_users where userid = ?`, [userid]);

                                console.log(err);
                                res.send(response({}, 0, 'fail'));
                            }
                        } catch (err) {
                            console.log(err);
                            res.send(response({}, 0, 'fail'));
                        }
                    }
                }
                else {

                    // console.log(queryResult[0]);

                    let userid = queryResult[0].userid;
                    let date = getTimeYYMMDD();
                    try {
                        await mysql(`insert into user_activity values (?, ?)`, [userid, date]);
                    } catch (e) {
                        // 今日已登录
                    }
                    let tk = await token.generateToken(userid);
                    res.send(response({
                        "token": tk
                    }, 1, 'success'));
                }
            }).on('error', (e) => {

                console.error(e);

                res.send(response({}, 0, "微信登录存在问题"))
            });
        })
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
})

loginRouter.post('/test', async (req, res, err) => {
    try {
        let userid = 60;
        let tk = "test-" + await token.generateToken(userid);
        res.send(response({
            "token": tk
        }, 1, 'success'));
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
})

module.exports = loginRouter