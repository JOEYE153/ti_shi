const express = require('express')
const mysql = require('../module/mysql')
const response = require('../module/res')
const sendEmail = require('../module/mail')
const encryption = require('../module/encryption')
const token = require('../module/token')
const { es } = require('tencentcloud-sdk-nodejs')

const resetRouter = express.Router()

function generateVerifycode() {
    let code = "";
    for (let i = 1; i <= 6; i++) {
        code += Math.floor(Math.random() * 10);
    }
    return code;
}

resetRouter.post('/verify' , async (req , res, err) => {
    if (req.body.userid == 60) {
        res.send(response({}, 2, '测试账号'));
        return;
    }
    try {
        let email = req.body.email
        let sqlQueryUser = `select * from email_users where email = ?`
        let result = await mysql(sqlQueryUser, [email]);
        if (result.length) {
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
            try {
                await sendEmail(email, verifycode);
                res.send(response({}, 1, 'success'));
            } catch (err) {
                console.log(err);
                res.send(response({}, 0, '邮件发送失败'));
            }
        } 
        else {
            res.send(response({}, 0, '该邮箱未被注册'));
        }
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
})

resetRouter.post('/confirm' , async (req , res, err) => {
    if (req.body.userid == 60) {
        res.send(response({}, 2, '测试账号'));
        return;
    }
    try {
        let email = req.body.email;
        let verifycode = req.body.verifycode;
        let password = req.body.password;
        let sqlQueryVerify = `select * from email_verifycode where email = ?`
        let result = await mysql(sqlQueryVerify, [email]);
        // console.log(result);
        if (result.length) {
            if (verifycode == result[0].verifycode) {
                let sqlDeleteVerify = `delete from email_verifycode where email = ?`;
    
                await mysql(sqlDeleteVerify, [email]);
    
                let userid = await mysql(`select userid from email_users where email=?`, [email]);
                let encryptPassword = await encryption.encrypt(password);
                let sqlInsertUser = `update email_users set Encryted_password=? where email=?`;
    
                await mysql(sqlInsertUser, [encryptPassword, email]);
    
                res.send(response({}, 1, 'success'));
            }
            else {
                res.send(response({}, 0, '修改失败'));
            }
        } 
        else {
            res.send(response({}, 0, '该邮箱未注册'));
        }
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
})

module.exports = resetRouter