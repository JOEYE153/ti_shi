const express = require('express');
const mysql = require('../module/mysql');
const response = require('../module/res');
const moment = require('moment');
moment.locale('zh-cn'); 

const messageRouter = express.Router();

messageRouter.get('/getNum', async (req, res, err) => {
    if (req.body.userid == 60) {
        res.send(response({}, 2, '测试账号'));
        return;
    }
    try {
        let user_id = req.body.userid;
        // console.log(user_id);
        let sum = 0;
        let ison;
        let ison1 = 1;
        let ison2 = 1;

        try {
            ison = await mysql(`select status from calendar_isOn where user_id = ?;`, [user_id]);
            if (ison.length > 0 && Number(ison[0].status) == 0) {
                ison1 = 0;
            }
        } catch (err) {
            throw Error(err);
        }
        
        try {
            ison = await mysql(`select status from othermessage_isOn where user_id = ?;`, [user_id]);
            if (ison.length > 0 && Number(ison[0].status) == 0) {
                ison2 = 0;
            }
        } catch (err) {
            throw Error(err);
        }

        if (ison1 == 1) {
            try {
                let ret1 = await mysql(`select count(*) as num from message_person where receiver_id = ? and status = 1 and kind = 1`, [user_id]);
                
                sum += Number(ret1[0].num);
                  
            } catch (err) {
                throw Error(err);
            }
        }

        if (ison2 == 1) {
            try {
                let ret1 = await mysql(`select count(*) as num from message_person where receiver_id = ? and status = 1 and kind = 2`, [user_id]);
                
                sum += Number(ret1[0].num);
                  
            } catch (err) {
                throw Error(err);
            }

            try {
                let ret2 = await mysql(`select count(*) as num from message_official where receiver_id = ? and status = 1`, [user_id]);

                sum += Number(ret2[0].num);
    
            } catch (err) {
                throw Error(err);
            } 
        }
        
        res.send(response({"num": sum}, 1, 'success'));
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
});

messageRouter.get('/getPersonal', async (req, res, err) => {
    if (req.body.userid == 60) {
        res.send(response({}, 2, '测试账号'));
        return;
    }
    try {
        let user_id = req.body.userid;
        
        let ret = await mysql(`select message_person.id as message_id, username as sender_name, description, status, message_person.time, position, url 
        from message_person, users_info 
        where receiver_id = ? and sender_id = users_info.user_id`, [user_id]);

        for (let i = 0; i < ret.length ; i++) {
            ret[i].time = moment(ret[i].time).format('YYYY-MM-DD');
        }

        res.send(response({"message": ret}, 1, 'success'));
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
});

messageRouter.post('/setPersonal', async (req, res, err) => {
    if (req.body.userid == 60) {
        res.send(response({}, 2, '测试账号'));
        return;
    }
    try {
        let user_id = req.body.userid;
        let message_id = req.body.message_id;
        let status = req.body.status;
        
        await mysql(`update message_person
        set status = ?
        where id = ? and receiver_id = ?`, [status, message_id, user_id]);

        res.send(response({}, 1, 'success'));
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
});

messageRouter.post('/deletePersonal', async (req, res, err) => {
    if (req.body.userid == 60) {
        res.send(response({}, 2, '测试账号'));
        return;
    }
    try {
        let user_id = req.body.userid;
        let message_id = req.body.message_id;
        
        await mysql(`delete from message_person
        where id = ? and receiver_id = ?;`, [message_id, user_id]);

        res.send(response({}, 1, 'success'));
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
});

messageRouter.get('/getOfficial', async (req, res, err) => {
    if (req.body.userid == 60) {
        res.send(response({}, 2, '测试账号'));
        return;
    }
    try {
        let user_id = req.body.userid;
        
        let ret = await mysql(`select message_official.id as message_id, username as sender_name, description, status, message_official.time 
        from message_official, users_info 
        where receiver_id = ? and sender_id = users_info.user_id`, [user_id]);

        for (let i = 0; i < ret.length ; i++) {
            ret[i].time = moment(ret[i].time).format('YYYY-MM-DD');
        }
        
        res.send(response({"message": ret}, 1, 'success'));
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
});

messageRouter.post('/setOfficial', async (req, res, err) => {
    if (req.body.userid == 60) {
        res.send(response({}, 2, '测试账号'));
        return;
    }
    try {
        let user_id = req.body.userid;
        let message_id = req.body.message_id;
        let status = req.body.status;
        
        await mysql(`update message_official
        set status = ?
        where id = ? and receiver_id = ?`, [status, message_id, user_id]);

        res.send(response({}, 1, 'success'));
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
});

messageRouter.post('/deleteOfficial', async (req, res, err) => {
    if (req.body.userid == 60) {
        res.send(response({}, 2, '测试账号'));
        return;
    }
    try {
        let user_id = req.body.userid;
        let message_id = req.body.message_id;
        
        await mysql(`delete from message_official
        where id = ? and receiver_id = ?;`, [message_id, user_id]);

        res.send(response({}, 1, 'success'));
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
});

messageRouter.post('/setCalendar', async (req, res, err) => {
    if (req.body.userid == 60) {
        res.send(response({}, 2, '测试账号'));
        return;
    }
    try {
        let user_id = req.body.userid;
        let status = req.body.status;
        let isExist = 0;
        
        try {
            let ret  = await mysql(`select * from calendar_isOn where user_id = ?;`, [user_id]);
            if (ret.length > 0) {
                isExist = 1;
            }
        } catch (err) {
            throw Error(err);
        }

        if (isExist == 0) {
            try {
                await mysql(`insert into calendar_isOn values(?, ?);`, [user_id, status]);
            } catch (err) {
                throw Error(err);
            }
        } else {
            try {
                await mysql(`update calendar_isOn
                            set status = ? 
                            where user_id = ?;`, [status, user_id]);
            } catch (err) {
                throw Error(err);
            }
        }

        res.send(response({}, 1, 'success'));
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
});

messageRouter.post('/setOther', async (req, res, err) => {
    if (req.body.userid == 60) {
        res.send(response({}, 2, '测试账号'));
        return;
    }
    try {
        let user_id = req.body.userid;
        let status = req.body.status;
        let isExist = 0;
        
        try {
            let ret  = await mysql(`select * from othermessage_isOn where user_id = ?;`, [user_id]);
            if (ret.length > 0) {
                isExist = 1;
            }
        } catch (err) {
            throw Error(err);
        }

        if (isExist == 0) {
            try {
                await mysql(`insert into othermessage_isOn values(?, ?);`, [user_id, status]);
            } catch (err) {
                throw Error(err);
            }
        } else {
            try {
                await mysql(`update othermessage_isOn
                            set status = ? 
                            where user_id = ?;`, [status, user_id]);
            } catch (err) {
                throw Error(err);
            }
        }

        res.send(response({}, 1, 'success'));
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
});

messageRouter.get('/getCalendar', async (req, res, err) => {
    if (req.body.userid == 60) {
        res.send(response({}, 2, '测试账号'));
        return;
    }
    try {
        let user_id = req.body.userid;
        let isExist = 0;
        let ret;
        
        try {
            ret  = await mysql(`select * from calendar_isOn where user_id = ?;`, [user_id]);
            if (ret.length > 0) {
                isExist = 1;
            }
        } catch (err) {
            throw Error(err);
        }

        if (isExist == 0) {
            try {
                await mysql(`insert into calendar_isOn values(?, ?);`, [user_id, 1]);
                res.send(response({"status": 1}, 1, 'success'));
            } catch (err) {
                throw Error(err);
            }
        } else {
            res.send(response({"status": ret[0].status}, 1, 'success'));
        }
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
});

messageRouter.get('/getOther', async (req, res, err) => {
    if (req.body.userid == 60) {
        res.send(response({}, 2, '测试账号'));
        return;
    }
    try {
        let user_id = req.body.userid;
        let isExist = 0;
        let ret;
        
        try {
            ret  = await mysql(`select * from othermessage_isOn where user_id = ?;`, [user_id]);
            if (ret.length > 0) {
                isExist = 1;
            }
        } catch (err) {
            throw Error(err);
        }

        if (isExist == 0) {
            try {
                await mysql(`insert into othermessage_isOn values(?, ?);`, [user_id, 1]);
                res.send(response({"status": 1}, 1, 'success'));
            } catch (err) {
                throw Error(err);
            }
        } else {
            res.send(response({"status": ret[0].status}, 1, 'success'));
        }
    } catch (err) {
        console.log(err);
        res.send(response({}, 0, 'fail'));
    }
});

module.exports = messageRouter;