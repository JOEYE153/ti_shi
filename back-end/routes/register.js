const express = require('express')
const mysql = require('../module/mysql')
const response = require('../module/res')
const sendEmail = require('../module/mail')
const allocateUserid = require('../module/allocateUserid')
const encryption = require('../module/encryption')
const token = require('../module/token')
const moment = require('moment');
moment.locale('zh-cn'); 

const registerRouter = express.Router()

function generateVerifycode() {
    let code = "";
    for (let i = 1; i <= 6; i++) {
        code += Math.floor(Math.random() * 10);
    }
    return code;
}

function getTime() {
    let date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    // console.log(date);
    return date;
}

registerRouter.post('/email/verify' , async (req , res, err) => {
    try {
        let email = req.body.email
        let sqlQueryUser = `select * from email_users where email = ?`
        let result = await mysql(sqlQueryUser, [email]);
        // console.log(result);
        if (!result.length) {
            let sqlQueryVerifycode = `select * from email_verifycode where email=?`
            let verifycode = generateVerifycode();
            //查询验证码是否存在
            if (!(await mysql(sqlQueryVerifycode, [email])).length) {
                let sqlInsert = `insert into email_verifycode values (?, ?)`;
                await mysql(sqlInsert, [email, verifycode]);
                // console.log('验证码不存在');
            } 
            else {
                let sqlUpdate = `update email_verifycode set verifycode=? where email=?`
                await mysql(sqlUpdate, [verifycode, email]);
                // console.log('验证码存在');
            }
            // res.send(response({verifycode}, 1, "success"));
            //发送验证码
            try {
                await sendEmail(email, verifycode);
                res.send(response({}, 1, 'success'));
            } catch (err) {
                console.log(err);
                res.send(response({}, 0, '邮件发送失败'));
            }
        } 
        else {
            // console.log(result[0]);
            res.send(response({}, 0, '该邮箱已被注册'));
        }
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    } 
})

registerRouter.post('/email/confirm' , async (req , res, err) => {
    try {
        let email = req.body.email;
        let verifycode = req.body.verifycode;
        let username = req.body.username;
        let password = req.body.password;
        let sqlQueryVerify = `select * from email_verifycode where email = ?`
        let result = await mysql(sqlQueryVerify, [email]);
        // console.log(result);
        if (result.length) {
            if (verifycode == result[0].verifycode) {
                let sqlDeleteVerify = `delete from email_verifycode where email = ?`;

                await mysql(sqlDeleteVerify, [email]);

                let userid = await allocateUserid();
                let encryptPassword = await encryption.encrypt(password);
                let sqlInsertUser = `insert into email_users values (?, ?, ?)`;

                try {
                    await mysql(sqlInsertUser, [userid, encryptPassword, email]);

                    let avatar = `https://i.loli.net/2021/05/02/p7XVdIUbn8kCWeP.png`;
                    let time = getTime();
                    let sqlInsertInfor = `insert into users_info (user_id, username, avatar, time) values (?, ?, ?, ?)`;

                    try {
                        await mysql(sqlInsertInfor, [userid, username, avatar, time]);
                        let tk = await token.generateToken(userid);
                        res.send(response({
                            "token": tk
                        }, 1, 'success'));
                    } catch (err) {
                        // 删user
                        await mysql(`delete from users_info where user_id = ?`, [userid]);
                        throw new Error(err);
                    }
                } catch (err) {
                    // 补verifycode
                    console.log(err);
                    await mysql(`insert into email_verifycode values (?, ?)`, [email, verifycode]);

                    res.send(response({}, 0, 'fail'));
                }
            }
            else {
                res.send(response({}, 0, '验证码错误'));
            }
        } 
        else {
            res.send(response({}, 0, '该邮箱未注册'));
        }
    } catch (err) {
        res.send(response({}, 0, 'fail'));
    }
    
})

module.exports = registerRouter