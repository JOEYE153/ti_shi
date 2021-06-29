var createError = require('https-error');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var courseRouter = require('./routes/course/course');
var questionRouter = require('./routes/question/question');
var question_poolRouter = require('./routes/question/question_pool');
var question_collectionRouter = require('./routes/question/question_collection');
var question_errorRouter = require('./routes/question/question_error');
var knowledge_cardRouter = require('./routes/card/knowledge_card');
var calendarRouter = require('./routes/calendar/calendar')
const schedule = require('node-schedule');
const sqlQuery = require('./module/mysql');
const registerRouter = require('./routes/register');
const resetRouter = require('./routes/reset');
const token = require('./module/token');
const loginRouter = require('./routes/login');
const userRouter = require('./routes/user');
const manageRouter = require('./routes/manage');
const messageRouter = require('./routes/message');
const resourceRouter = require('./routes/resource');
let commentRouter = require('./routes/question_comment/comment');
let uploadRouter = require('./routes/upload');
const answerCommunityRouter = require('./routes/answer_community');
const reportRouter = require('./routes/report');
const mysql = require('./module/mysql');
const { response } = require('express');
const moment = require('moment');
moment.locale('zh-cn'); 

var app = express();

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, token");
  // res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  // res.header("X-Powered-By",'*');
  res.header("Content-Type", "application/json;charset=utf-8");
  // res.header("Content-Type", "*");
  next();
});

let rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;
rule.second = 0;
// rule.second = [0,1,2,3,4,5,6,7,8,9];//每分钟的这几秒触发
schedule.scheduleJob(rule, async () => {
  let course_id_list = [];
  let sql = 'select course_id from course';
  let result = await sqlQuery(sql);
  course_id_list = result;
  for( let i = 0 ; i < course_id_list.length ; i++ ) {
    let course_id = course_id_list[i]['course_id'];
    sql = ' select course_id, question_id, status, count(*) as error_times \
            from user_question_status \
            where course_id = ? and status = -1\
            group by course_id, question_id, status \
            order by error_times desc \
            limit 50';
    result = await sqlQuery(sql, course_id);
    let new_line = result;
    for( let j = 0 ; j < new_line.length ; j++ ) {
      let question_id = new_line[j]['question_id'];
      sql = 'select count(*) as count from user_question_status where course_id = ? and question_id = ?'
      result = await sqlQuery(sql, [course_id, question_id])
      new_line[j]['error_rate'] = new_line[j]['error_times'] / result[0]['count'];
      sql = 'select * from error_list where course_id = ? and question_id = ?'
      result = await sqlQuery(sql, [course_id, question_id])
      if(result.length != 0) {
        sql = 'delete from error_list where course_id = ? and question_id = ?'
        result = await sqlQuery(sql, [course_id, question_id])
        sql = 'insert into error_list values(?, ?, ?)';
        result = await sqlQuery(sql, [course_id, question_id, new_line[j]['error_rate']]);
        // console.log([course_id, question_id, new_line[j]['error_rate']]);
      } else {
        sql = 'insert into error_list values(?, ?, ?)';
        result = await sqlQuery(sql, [course_id, question_id, new_line[j]['error_rate']]);
      }
    }
  }
});

let rule2 = new schedule.RecurrenceRule();
rule2.hour = 1;
rule2.minute = 0;
rule2.second = 0;

async function sendCalendarMessage(user_can_send, day, item) {
  if(user_can_send[item['user_id']]) {
    let sql = 'insert into message_person (sender_id, receiver_id, description, status, kind, time) \
                              values  (46, ?, ?, 1, 1, curdate())'
    let description = '距离' + item['title'] + '考试还剩' + day + '天'
    let result = await sqlQuery(sql, [item['user_id'], description])
  }
}

//每天零点定时更新所有用户的考期日历，设置finished，发送提醒等
schedule.scheduleJob(rule2, async () => {
  // 首先获取所有未完成的考期日历表项
  // 判断每个表项所属用户是否开启提醒
  // 根据表中完成日期与当前日期的差值判断还剩几天，
  // 1.若为0则将finish置位，插入通知
  // 2.若为7天，插入通知
  // 3.否则无作为

  let sql = 'select * from calendar where finish = false'
  let result = await sqlQuery(sql)
  let all_calendar = result

  sql = ' select distinct user_id \
          from (  select c.user_id as user_id, IFNULL(status, 1) as status \
                  from calendar_isOn \
                        right join (select user_id from calendar where finish = false) as c \
                            on calendar_isOn.user_id = c.user_id) as uis \
          where status = 1'
  result = await sqlQuery(sql)
  let user_can_send = {}
  result.forEach((item) => {
    user_can_send[item['user_id']] = true
  })

  let now_date = new Date(moment(new Date()).format('YYYY-MM-DD'));

  all_calendar.forEach(async (item) => {
    let finish_date = new Date(item['date'])
    if(finish_date - now_date <= 0) {
      sql = 'update calendar set finish = true where calendar_id = ?'
      result = await sqlQuery(sql, [item['calendar_id']])
      sendCalendarMessage(user_can_send, 0, item);
    } else if(Math.round((finish_date - now_date) / (1000 * 60 * 60 * 24)) == 7) {
      sendCalendarMessage(user_can_send, 7, item);
    }
  })
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/getmenulist', (req, res, next) => {
  res.json(
    [{
        directUrl: "/pages/rili/rili",
        logoUrl: "../../static/rili.png",
        navName: "考期日历"
      },
      {
        directUrl: "/pages/shoucang/shoucang",
        logoUrl: "../../static/collect.png",
        navName: "收藏|错题"
      },
      {
        directUrl: "/pages/kapian/kapian",
        logoUrl: "../../static/card.png",
        navName: "知识卡片"
      }, 
      {
        directUrl: "/pages/tiku/tiku",
        logoUrl: "../../static/tiku.png",
        navName: "题库"
      }, 
      {
        directUrl: "/pages/ziyuan/ziyuan",
        logoUrl: "../../static/resource.png",
        navName: "资源社区"
      },
      {
        directUrl: "/pages/wenda/wenda",
        logoUrl: "../../static/wenda.png",
        navName: "问题反馈"
      }
  ])
}) 

// token authentication
app.use(function (req, res, next) {
  if (req.method == 'OPTIONS') {
    next();
  }
  else {
    // console.log(req._parsedUrl.pathname);
    if (req._parsedUrl.pathname != '/register/email/verify' 
      && req._parsedUrl.pathname != '/register/email/confirm' 
        && req._parsedUrl.pathname != '/login/email' 
          && req._parsedUrl.pathname != '/login/wechat'
            && req._parsedUrl.pathname != '/login/test'
              && req._parsedUrl.pathname != '/reset/verify'
                && req._parsedUrl.pathname != '/reset/confirm') {
          let tk = req.headers.authorization == undefined ? req.headers.token : req.headers.authorization;
          if (tk == undefined) {
            res.send({
                "data": {
                },
                "code": 0,
                "msg": "you have no authorization"
            });
          }
          // console.log(tk);
          if (tk.substr(0, 5) == 'test-') {
            tk = tk.substring(5);
          }
          // console.log(tk);
          token.verifyToken(tk).then( function (result) {
              // console.log(result);
              if (result == 'err') {
                  res.send({
                      "data": {

                      },
                      "code": 0,
                      "msg": "Token is wrong!"
                  })
              } 
              else {
                  req.body.userid = result.userid;
                  next();
              }
          });
    }
    else {
      next();
    }
  }
}) 

function getTimeYYMMDD() {
  let date = moment().format('YYYY-MM-DD');
  // console.log(date);
  return date + ' 12:00:00';
}


app.use(async function (req, res, next) {
  if (req.body.userid != undefined) {
    // console.log('here');
    let userid = req.body.userid;
    let date = getTimeYYMMDD();
    try {
        await mysql(`insert into user_activity values (?, ?)`, [userid, date]);
    } catch (e) {
        // 今日已登录
        // console.log('今日已登录');
        // console.log(e);
    }
  }
  next();
}) 

app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/manage', manageRouter);
app.use('/question', questionRouter);
app.use('/question_pool', question_poolRouter);
app.use('/question_collection', question_collectionRouter);
app.use('/question_error', question_errorRouter);
app.use('/card', knowledge_cardRouter);
app.use('/calendar', calendarRouter)
app.use('/question_comment', commentRouter);
app.use('/course', courseRouter);
app.use('/reset', resetRouter);
app.use('/upload', uploadRouter);
app.use('/message', messageRouter);
app.use('/resource', resourceRouter);
app.use('/posts', answerCommunityRouter);
app.use('/report', reportRouter);
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(new createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
