## 后台管理系统

### 1. 查询题目

- 请求路径：manage/query/:course_id
- 请求方法：get
- 请求参数

| 参数名    | 参数说明 | 备注     |
| --------- | -------- | -------- |
| course_id | 科目id   | 不能为空 |

- 响应参数

| 参数名          | 参数说明                       | 备注 |
| --------------- | ------------------------------ | ---- |
| questions       | 题目列表                       |      |
| chapter_id      | 章节号                         |      |
| id              | 题目id                         |      |
| q_description   | 问题的题面                     |      |
| option_a        | 选项内容                       |      |
| option_b        | 同上                           |      |
| option_c        | 同上                           |      |
| option_d        | 同上                           |      |
| answer          | 题目的答案                     |      |
| image_url       | 如果有图的话标记序号，否则为空 |      |
| is_multi        | 是否为多选题                   |1为true，0为false      |
| error_rate      | 错误率                         |      |
| complete_number | 做题人数                       |      |
| code            | 状态码                         |      |
| msg             | 说明信息                       |      |

- 响应数据

```json
{
    "data": {
        "questions": [
         {
            "chapter_id": xxx,
            "id": 1,
            "q_description": "ldd",
            "option_a": "XXX",
            "option_b": "XX",
            "option_c": "XXX",
            "option_d": "XXX",
            "answer": "xx",
            "image_url": "xxxx",
            "is_multi": 1,
            "error_rate":xxx,
            "complete_number":xxx
        },
        {
            "chapter_id": xxx,
            "id": 2,
            "q_description": "ldd",
            "option_a": "XXX",
            "option_b": "XX",
            "option_c": "XXX",
            "option_d": "XXX",
            "answer": "xx",
            "image_url": "xxxx",
            "is_multi": 0,
            "error_rate":xxx,
            "complete_number":xxx
        },         
       ]
    },
    "code": 1,
    "msg": "success"
}
```



### 2. 增加题目

- 请求路径：manage/add
- 请求方法：post
- 请求参数

| 参数名        | 参数说明                       | 备注 |
| ------------- | ------------------------------ | ---- |
| questions     | 待添加的题目列表               |      |
| course_id     | 科目id                         |      |
| chapter_id    | 章节号                         |      |
| id            | 添加列表中的题目id（区别于后台题目id） |      |
| q_description | 问题的题面                     |      |
| option_a      | 选项内容                       |      |
| option_b      | 同上                           |      |
| option_c      | 同上                           |      |
| option_d      | 同上                           |      |
| answer        | 题目的答案                     |      |
| image_url     | 如果有图的话标记序号，否则为空 |      |
| is_multi      | 是否为多选题                   |1为true，0为false      |

- 响应参数

| 参数名               | 参数说明                       | 备注 |
| -------------------- | ------------------------------ | ---- |
| wrond_ids                 | 添加错误的id列表                         |      |
| code                 | 状态码                         |      |
| msg                  | 说明信息                       |      |

- 响应数据

```
{
    "data": {
        "wrong_ids":[
            1,
            2
        ] 
    },
    "code": 1,
    "msg": "success",
}
```

### 3. 修改题目

- 请求路径：manage/modify
- 请求方法：post
- 请求参数

| 参数名        | 参数说明                       | 备注     |
| ------------- | ------------------------------ | -------- |
| course_id     | 科目id                         |          |
| chapter_id    | 章节号                         | 可以为空 |
| id            | 题目id                         |          |
| q_description | 问题的题面                     | 可以为空 |
| option_a      | 选项内容                       | 可以为空 |
| option_b      | 同上                           | 可以为空 |
| option_c      | 同上                           | 可以为空 |
| option_d      | 同上                           | 可以为空 |
| answer        | 题目的答案                     | 可以为空 |
| image_url     | 如果有图的话标记序号，否则为空 | 可以为空 |
| is_multi      | 是否为多选题                   | 可以为空 |

- 响应参数

| 参数名               | 参数说明                       | 备注 |
| -------------------- | ------------------------------ | ---- |
| code                 | 状态码                         |      |
| msg                  | 说明信息                       |      |

- 响应数据

```
{
    "data": {
        
    },
    "code": 1,
    "msg": "success",
}
```

### 4. 删除题目

- 请求路径：manage/delete
- 请求方法：post
- 请求参数

| 参数名     | 参数说明 | 备注     |
| ---------- | -------- | -------- |
| course_id  | 科目id   |          |
| chapter_id | 章节号   | 可以为空 |
| id         | 题目id   |          |

- 响应参数

| 参数名               | 参数说明                       | 备注 |
| -------------------- | ------------------------------ | ---- |
| code                 | 状态码                         |      |
| msg                  | 说明信息                       |      |

- 响应数据

```JSON
{
    "data": {
        
    },
    "code": 1,
    "msg": "success",
}
```

### 5. 注册用户详情

- 请求路径：manage/registration
- 请求方法：get
- 请求参数

| 参数名     | 参数说明 | 备注     |
| ---------- | -------- | -------- |
|  | 			   |          |

- 响应参数

| 参数名   | 参数说明     | 备注 |
| -------- | ------------ | ---- |
| result   | 查询结果列表 |      |
| username | 用户名       |      |
| avatar   | 头像         |      |
| time     | 注册时间     |      |
| code     | 状态码       |      |
| msg      | 说明信息     |      |

- 响应数据

```JSON
{
	"data": {
        "result": [
            {
                "username": "username1",
                "avatar": "avatar1",
                "time": "2021-05-07 11:57:30"
            },
            {
                "username": "username2",
                "avatar": "avatar2",
                "time": "2021-05-07 11:57:32"
            }
        ]
    },
    "code": 1,
    "msg": "success"
}
```

### 6. 用户活跃情况

- 请求路径：manage/activity
- 请求方法：get
- 请求参数

| 参数名     | 参数说明 | 备注     |
| ---------- | -------- | -------- |
| startTime | 起始时间 | e.g.  2021-5-6 |
| endTime | 结束时间 | e.g.  2021-5-9 |

- 响应参数

| 参数名   | 参数说明     | 备注 |
| -------- | ------------ | ---- |
| result   | 查询结果列表 |      |
| code     | 状态码       |      |
| msg      | 说明信息     |      |

- 响应数据

```JSON
{
    "data": {
        "result": [
            0,
            1,
            1,
            0
        ]
    },
    "code": 1,
    "msg": "success"
}
```
### 7.查询资源

- 请求路径：manage/queryResource/:course_id
- 请求方法：get
- 请求参数

| 参数名    | 参数说明 | 备注     |
| --------- | -------- | -------- |
| course_id | 科目id   | 不能为空 |

- 响应参数

| 参数名      | 参数说明         | 备注                 |
| ----------- | ---------------- | -------------------- |
| resources   | 资源列表         |                      |
| resource_id | 资源id           |                      |
| user_id     | 用户id           |                      |
| username    | 用户名           |                      |
| topic       | 资源主题         |                      |
| description | 资源描述         |                      |
| link        | 资源链接         |                      |
| time        | 资源上传时间     | 年-月-日             |
| password    | 资源提取密码     |                      |
| isCheck     | 资源是否通过审核 | 0为未通过，1为已通过 |

- 响应数据

```json
{
    "data": {
        "resources": [
         {
            "resource_id": 1,
            "user_id": 1,
            "username": "hhhh",
            "topic": "xxx",
            "description": "XXX",
            "link": "XX",
            "time": "2021-03-23",
            "password": "XXX",
            "check": 0
        },
        {
            "resource_id": 2,
            "user_id": 2,
            "username": "xxxx",
            "topic": "xxxx",
            "description": "XXX",
            "link": "XX",
            "time": "2021-06-27",
            "password": "XXX",
            "isCheck": 1
        },         
       ]
    },
    "code": 1,
    "msg": "success"
}
```

### 8.增加资源

- 请求路径：manage/addResource
- 请求方法：post
- 请求参数

| 参数名      | 参数说明         | 备注                                      |
| ----------- | ---------------- | ----------------------------------------- |
| course_id   | 科目id           | 默认                                      |
| resources   | 待添加的资源列表 | 所有资源默认审核通过                      |
| resource_id | 资源id           | 从1开始的自增id，用于反馈资源添加是否成功 |
| topic       | 资源主题         |                                           |
| description | 资源描述         |                                           |
| link        | 资源链接         |                                           |
| password    | 资源提取密码     |                                           |

- 响应参数

| 参数名    | 参数说明         | 备注 |
| --------- | ---------------- | ---- |
| wrond_ids | 添加错误的id列表 |      |
| code      | 状态码           |      |
| msg       | 说明信息         |      |

- 响应数据

```
{
    "data": {
        "wrong_ids":[
            1,
            2
        ] 
    },
    "code": 1,
    "msg": "success",
}
```

### 9.删除资源

- 请求路径：manage/deleteResource
- 请求方法：post
- 请求参数

| 参数名      | 参数说明 | 备注     |
| ----------- | -------- | -------- |
| course_id   | 科目id   |          |
| resource_id | 资源id   | 可以为空 |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

- 响应数据

```JSON
{
    "data": {
        
    },
    "code": 1,
    "msg": "success",
}
```

### 10.审核资源

- 请求路径：manage/updateResource
- 请求方法：post
- 请求参数

| 参数名      | 参数说明     | 备注                                               |
| ----------- | ------------ | -------------------------------------------------- |
| course_id   | 科目id       |                                                    |
| resource_id | 资源id       |                                                    |
| check       | 审核情况     | 为0时审核不通过，为1时审核通过                     |
| remark      | 审核说明     |                                                    |
| link        | 资源链接     | 审核不通过时为空，审核通过时为更新后的链接         |
| password    | 资源提取密码 | 审核不通过时为空，审核通过时为更新后的链接提取密码 |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

- 响应数据

```JSON
{
    "data": {
        
    },
    "code": 1,
    "msg": "success",
}
```

### 11.修改资源

- 请求路径：manage/modifyResource
- 请求方法：post
- 请求参数

| 参数名      | 参数说明     | 备注                           |
| ----------- | ------------ | ------------------------------ |
| course_id   | 科目id       |                                |
| resource_id | 资源id       |                                |
| topic       | 主题         | 更新后的主题，可以为空         |
| description | 资源描述     | 更新后的描述，可以为空         |
| link        | 资源链接     | 更新后的链接，可以为空         |
| password    | 资源提取密码 | 更新后的链接提取密码，可以为空 |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

- 响应数据

```
{
    "data": {
        
    },
    "code": 1,
    "msg": "success",
}
```

### 12.查询帖子

- 请求路径：manage/queryPost/:course_id
- 请求方法：get
- 请求参数

| 参数名    | 参数说明 | 备注     |
| --------- | -------- | -------- |
| course_id | 科目id   | 不能为空 |

- 响应参数

| 参数名               | 参数说明     | 备注                     |
| -------------------- | ------------ | ------------------------ |
| posts                | 帖子列表     |                          |
| post_id              | 帖子id       |                          |
| user_id              | 发帖人id     |                          |
| user_name            | 发帖人用户名 |                          |
| create_time          | 帖子创建时间 |                          |
| last_modified_time   | 最后修改时间 |                          |
| post_title           | 帖子标题     |                          |
| people_in_discussion | 讨论次数     |                          |
| is_top               | 是否置顶     | 0：不置顶；1：置顶       |
| post_type            | 帖子类型     | 0：讨论；1：提问；2：... |
| content              | 帖子内容     |                          |
| cur_status           | 帖子当前状态 | 0：Open；1：Closed       |
- 响应数据

```json
{
    "data": {
        "posts": [
         {
            "post_id": 1,
            "user_id": 45,
            "user_name": "xxx",
            "create_time": "xxx",
            "last_modified_time":"xxx",
            "post_title": "xxx",
            "people_in_discussion": 59,
            "is_top":0,
            "post_type":1,
            "cur_status": 1
        },
        {
            "post_id": 2,
            "user_id": 45,
            "user_name": "xxx",
            "create_time": "xxx",
            "last_modified_time":"xxx",
            "post_title": "xxx",
            "people_in_discussion": 59,
            "is_top":0,
            "post_type":1,
            "cur_status": 1
        },        
       ]
    },
    "code": 1,
    "msg": "success"
}
```

### 13.删除帖子

- 请求路径：manage/deletePost
- 请求方法：post
- 请求参数

| 参数名  | 参数说明 | 备注     |
| ------- | -------- | -------- |
| post_id | 帖子id   | 不能为空 |

- 响应参数

| 参数名      | 参数说明     | 备注              |
| ----------- | ------------ | ----------------- |
| code        | 状态码       |                   |
| msg         | 说明信息     |                   |
- 响应数据

```json
{
    "data": {
        
    },
    "code": 1,
    "msg": "success",
}
```

### 14.查询帖子评论


- 请求路径：manage/queryPostComment?:post_id
- 请求方法：get
- 请求参数

| 参数名    | 参数说明 | 备注     |
| --------- | -------- | -------- |
| post_id | 帖子id   | 不能为空 |

- 响应参数

| 参数名      | 参数说明     | 备注                      |
| ----------- | ------------ | ------------------------- |
| comments       | 帖子评论列表     |                           |
| post_comment_id     | 帖子评论id       |                           |
| user_id | 评论用户id | |
| user_name | 评论用户名 | |
| create_time | 帖子评论创建时间 |                           |
| content     | 帖子评论内容     |                           |
| like_count | 被点赞次数 | |
| is_right_answer  | 帖子评论是否被标记为答案     | 为0时没有被标记答案，为1时被标记为答案                          |

- 响应数据

```json
{
    "data": {
        "comments": [
         {
            "post_comment_id": 23,
            "user_id": 2,
            "user_name": "xxx",
            "create_time": "xxx",
            "content": "xxx",
            "like_count": 4,
            "is_right_answer": 0
        },
        {
            "post_comment_id": 33,
            "user_id": 2,
            "user_name": "xxx",
            "create_time": "xxx",
            "content": "xxx",
            "like_count": 4,
            "is_right_answer": 0
        },        
       ]
    },
    "code": 1,
    "msg": "success"
}
```
### 15.删除帖子评论

- 请求路径：manage/deletePostComment
- 请求方法：post
- 请求参数

| 参数名  | 参数说明 | 备注     |
| ------- | -------- | -------- |
| post_comment_id     | 帖子评论id       | 不能为空 |

- 响应参数

| 参数名      | 参数说明     | 备注              |
| ----------- | ------------ | ----------------- |
| code        | 状态码       |                   |
| msg         | 说明信息     |                   |
- 响应数据

```json
{
    "data": {
        
    },
    "code": 1,
    "msg": "success",
}
```
### 16.查询题目评论


- 请求路径：manage/queryQuestionComment?:course_id&:question_id
- 请求方法：get
- 请求参数

| 参数名    | 参数说明 | 备注     |
| --------- | -------- | -------- |
| course_id | 科目id   | 不能为空 |
| question_id | 题目id   | 不能为空 |

- 响应参数

| 参数名      | 参数说明     | 备注                      |
| ----------- | ------------ | ------------------------- |
| comments       | 题目评论列表     |                           |
| comment_id     | 题目评论id       |                           |
| user_id | 用户id | |
| user_name | 用户名 | |
| create_time | 题目评论创建时间 |                           |
| content     | 题目评论内容     |                           |


- 响应数据

```json
{
    "data": {
        "comments": [
         {
            "comment_id": 23,
            "user_id": 1,
            "user_name": "yyy",
            "create_time": "xxx",
            "content": "xxx"
        },
        {
            "comment_id": 33,
            "user_id": 1,
            "user_name": "yyy",
            "create_time": "xxx",
            "content": "xxx"
        },        
       ]
    },
    "code": 1,
    "msg": "success"
}
```
### 17.删除题目评论

- 请求路径：manage/deleteQuestionComment
- 请求方法：post
- 请求参数

| 参数名  | 参数说明 | 备注     |
| ------- | -------- | -------- |
| comment_id     | 题目评论id       |    不能为空                   |

- 响应参数

| 参数名      | 参数说明     | 备注              |
| ----------- | ------------ | ----------------- |
| code        | 状态码       |                   |
| msg         | 说明信息     |                   |

- 响应数据

```json
{
    "data": {
        
    },
    "code": 1,
    "msg": "success",
}
```
### 18.查询题目评论回复


- 请求路径：manage/queryQuestionCommentReply?:comment_id
- 请求方法：get
- 请求参数

| 参数名    | 参数说明 | 备注     |
| --------- | -------- | -------- |
| comment_id     | 题目评论id       |    不能为空    |

- 响应参数

| 参数名      | 参数说明     | 备注                      |
| ----------- | ------------ | ------------------------- |
| replys       | 题目评论列表     |                           |
| reply_id     | 题目评论id       |                           |
| user_id | 回复者id | |
| user_name | 回复者用户名 | |
| create_time | 题目评论创建时间 |                           |
| content     | 题目评论内容     |                           |


- 响应数据

```json
{
    "data": {
        "replys": [
         {
            "reply_id": 23,
            "user_id": 1,
            "user_name": "yyy",
            "create_time": "xxx",
            "content": "xxx"
        },
        {
            "reply_id": 33,
            "user_id": 1,
            "user_name": "yyy",
            "create_time": "xxx",
            "content": "xxx"
        },        
       ]
    },
    "code": 1,
    "msg": "success"
}
```
### 19.删除题目评论回复

- 请求路径：manage/deleteQuestionCommentReply
- 请求方法：post
- 请求参数

| 参数名  | 参数说明 | 备注     |
| ------- | -------- | -------- |
| reply_id     | 题目评论id       |                           |

- 响应参数

| 参数名      | 参数说明     | 备注              |
| ----------- | ------------ | ----------------- |
| code        | 状态码       |                   |
| msg         | 说明信息     |                   |

- 响应数据

```json
{
    "data": {
        
    },
    "code": 1,
    "msg": "success",
}
```

### 20.消息广播

- 请求路径：manage/broadcast
- 请求方法：post
- 请求参数

| 参数名  | 参数说明 | 备注     |
| ------- | -------- | -------- |
| content     | 广播内容     | 向所有人广播的内容 |

- 响应参数

| 参数名      | 参数说明     | 备注              |
| ----------- | ------------ | ----------------- |
| code        | 状态码       |                   |
| msg         | 说明信息     |                   |

- 响应数据

```json
{
    "data": {
        
    },
    "code": 1,
    "msg": "success",
}
```

### 21.获取举报

- 请求路径：manage/queryReport
- 请求方法：get
- 请求参数

| 参数名    | 参数说明 | 备注     |
| --------- | -------- | -------- |
|      |        |        |

- 响应参数

| 参数名      | 参数说明     | 备注                      |
| ----------- | ------------ | ------------------------- |
| reports       | 举报列表     |                           |
| id       | 举报id     |                           |
| user_id       | 举报者id     |                           |
| reason     | 举报理由       |                           |
| item     | 表项id     |                           |
| table_name | 表名     |                           |
| time | 举报时间 |                           |



- 响应数据

```json
{
    "data": {
        "reports": [
         {
            "id": 123,
            "user_id": 23,
            "reason": "xxx",
            "item": 123,
            "table_name": "xxx",
            "time": "xxx"
        },
        {
            "id": 123,
            "user_id": 33,
            "reason": "xxx",
            "item": 124,
            "table_name": "xxx",
            "time": "xxx"
        },        
       ]
    },
    "code": 1,
    "msg": "success"
}
```

### 22.处理举报

- 请求路径：manage/handleReport
- 请求方法：post
- 请求参数

| 参数名  | 参数说明 | 备注     |
| ------- | -------- | -------- |
| id     | 举报id       |           |
| user_id | 举报者id | |
| pass | 举报是否成立 | 为0表示不成立，同时告知举报者“举报失败”，为1表示成立，同时告知举报者“举报成功，相关内容已被处理” |

- 响应参数

| 参数名      | 参数说明     | 备注              |
| ----------- | ------------ | ----------------- |
| code        | 状态码       |                   |
| msg         | 说明信息     |                   |

- 响应数据

```json
{
    "data": {
        
    },
    "code": 1,
    "msg": "success",
}
```