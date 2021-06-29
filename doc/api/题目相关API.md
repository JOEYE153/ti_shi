<<<<<<< HEAD:doc/api/题目相关API.md
## 二、题目
=======
[toc]

# API文档

## 零、说明

- 接口基准地址：
- API V1 认证统一使用 Token 认证
- 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
- 数据返回格式统一使用 JSON
- 支持的请求方法
  - GET（SELECT）：从服务器取出资源（一项或多项）
  - POST（CREATE）：在服务器新建一个资源
  - PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）
  - PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）
  - DELETE（DELETE）：从服务器删除资源
  - HEAD：获取资源的元数据
  - OPTIONS：获取信息，关于资源的哪些属性是客户端可以改变的
- 状态码说明

| 状态码 | 含义 |
| ------ | ---- |
| 0      | 失败 |
| 1      | 成功 |
|        |      |

## 一、个人信息

### 1. 注册

#### 1.1 邮箱注册

##### 1.1.1 发送验证码

- 请求路径：register/email/verify
- 请求方法：post
- 请求参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| email  | 邮箱     | 不能为空 |

- 响应参数

| 参数名 | 参数说明 | 备注                   |
| ------ | -------- | ---------------------- |
| code   | 状态码   |                        |
| msg    | 说明信息 | 具体说明信息【待完成】 |

- 响应数据

```
{
    "data": {
        
    },
    "code": 1,
    "msg": "success",
}
```

##### 1.1.2 注册验证

- 请求路径：register/email/confirm
- 请求方法：post
- 请求参数

| 参数名     | 参数说明 | 备注             |
| ---------- | -------- | ---------------- |
| email      | 邮箱     | 不能为空         |
| verifycode | 验证码   | 不能为空         |
| username   | 用户名   | 不能为空，不唯一 |
| password   | 密码     | 不能为空         |

- 响应参数

| 参数名 | 参数说明 | 备注                   |
| ------ | -------- | ---------------------- |
| code   | 状态码   |                        |
| msg    | 说明信息 | 具体说明信息【待完成】 |
| token  | 令牌     |                        |

- 响应数据

```json
{
    "data": {
        "token": "xxxx",
    },
    "code": 1,
    "msg": "success",
}
```

### 2. 登录

#### 2.1 邮箱登录

- 请求路径：login/email
- 请求方法：post
- 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| email    | 邮箱     | 不能为空 |
| password | 密码     | 不能为空 |

- 响应参数

| 参数名 | 参数说明 | 备注                   |
| ------ | -------- | ---------------------- |
| code   | 状态码   |                        |
| msg    | 说明信息 | 具体说明信息【待完成】 |
| token  | 令牌     |                        |

- 响应数据

```json
{
    "data": {
        "token": "xxxx",
    },
    "code": 1,
    "msg": "success",
}
```

#### 2.2 微信登录

- 请求路径：login/wechat
- 请求方法：post
- 请求参数

| 参数名 | 参数说明         | 备注     |
| ------ | ---------------- | -------- |
| code   | 微信登录临时凭证 | 不能为空 |
| info   | 微信用户信息     | 不能为空 |

- 响应参数

| 参数名 | 参数说明 | 备注                   |
| ------ | -------- | ---------------------- |
| code   | 状态码   |                        |
| msg    | 说明信息 | 具体说明信息【待完成】 |
| token  | 令牌     |                        |

- 响应数据

```json
{
    "data": {
        "token": "xxxx",
    },
    "code": 1,
    "msg": "success",
}
```

### 3. 我的

#### 3.1 获取我的信息

- 请求路径：user/all/:course_id
- 请求方法：get
- 请求参数

| 参数名    | 参数说明 | 备注     |
| --------- | -------- | -------- |
| course_id | 科目     | 不能为空 |

- 响应参数

| 参数名           | 参数说明   | 备注                   |
| ---------------- | ---------- | ---------------------- |
| code             | 状态码     |                        |
| msg              | 说明信息   | 具体说明信息【待完成】 |
| username         | 用户名     |                        |
| avatar           | 用户头像   |                        |
| problem_done_sum | 累计做题数 |                        |
| day_sum          | 做题天数   | 刷题开始api时更新      |
| query_sum        | 问答数量   | alpha阶段默认为0       |
| like_sum         | 获赞数量   | alpha阶段默认为0       |

- 响应数据

```json
{
    "data": {
        "username": "buaaer",
        "avatar": "xxx", //url
        "problem_done_sum": 0,
        "day_sum": 0,
        "query_sum": 0,
        "like_sum": 0,
    },
    "code": 1,
    "msg": "success",
}
```

### 4. 设置

#### 4.1 获取个人信息

- 请求路径：user/profile
- 请求方法：get
- 请求参数


- 响应参数

| 参数名 | 参数说明 | 备注                   |
| ------ | -------- | ---------------------- |
| avatar     | 用户头像 | 可以为空，url: "xxx"           |
| username   | 用户名   | 可以为空，"xxx"                |
| sex        | 性别     | 0：空，1：男，2：女，可以为空  |
| birthday   | 生日     | 年月日："xxxx-xx-xx"，可以为空 |
| grade      | 年级     | 可以为空，"xxx"                |
| profession | 专业     | 可以为空，"xxx"                |
| school     | 学校     | 可以为空，"xxx"                |
| code   | 状态码   |                        |
| msg    | 说明信息 | 具体说明信息【待完成】 |

- 响应数据

```json
{
    "data": {
       "avatar": "xxx",
        "username": "xxx",
        "sex": "xxx",
        "birthday": "xxx",
        "grade": "xxx",
        "profession": "xxx",
        "school": "xxx"
    },
    "code": 1,
    "msg": "success",
}
```

#### 4.2 修改个人信息

- 请求路径：user/modify
- 请求方法：put
- 请求参数

| 参数名     | 参数说明 | 备注                           |
| ---------- | -------- | ------------------------------ |
| avatar     | 用户头像 | 可以为空，url: "xxx"           |
| username   | 用户名   | 可以为空，"xxx"                |
| password   | 密码     | 可以为空，"xxx"                |
| sex        | 性别     | 0：空，1：男，2：女，可以为空  |
| birthday   | 生日     | 年月日："xxxx-xx-xx"，可以为空 |
| grade      | 年级     | 可以为空，"xxx"                |
| profession | 专业     | 可以为空，"xxx"                |
| school     | 学校     | 可以为空，"xxx"                |

- 响应参数

| 参数名 | 参数说明 | 备注                   |
| ------ | -------- | ---------------------- |
| code   | 状态码   |                        |
| msg    | 说明信息 | 具体说明信息【待完成】 |

- 响应数据

```json
{
    "data": {
       
    },
    "code": 1,
    "msg": "success",
}
```



## 二、题目相关
>>>>>>> 259bcde3644134e75a28bcafced0c52cfa7f9f7a:doc/api/API文档.md

### 1. 刷题

#### 1.1 显示题目

- 请求路径：question/display
- 请求方法：get
- 请求参数

| 参数名    | 参数说明             | 备注     |
| --------- | -------------------- | -------- |
| id        | 请求的题目id         | 不能为空 |
| course_id | 请求题目对应的课程号 | 不能为空 |

- 响应参数

| 参数名        | 参数说明                       | 备注 |
| ------------- | ------------------------------ | ---- |
| id            | 题目id                         |      |
| q_description | 问题的题面                     |      |
| option_a      | 选项内容                       |      |
| option_b      | 同上                           |      |
| option_c      | 同上                           |      |
| option_d      | 同上                           |      |
| answer        | 题目的答案                     |      |
| image_url     | 如果有图的话标记序号，否则为空 |      |
| is_multi      | 是否为多选题                   |      |
| is_collected  | 是否为收藏                     |      |
| code          | 状态码                         |      |
| msg           | 说明信息                       |      |

- 响应数据

```json
{
    "data": {
        "id": 1,
        "q_description": "ldd",
        "option_a": "XXX",
        "option_b": "XX",
        "option_c": "XXX",
        "option_d": "XXX",
        "answer": "xx",
        "image_url": "xxxx",
        "is_multi": 1,
        "is_collected": 1
    },
    "code": 1,
    "msg": "success"
}
```

#### 1.2 提交答案验证

- 请求路径：question/judge
- 请求方法：post
- 请求参数

| 参数名      | 参数说明     | 备注                                            |
| ----------- | ------------ | ----------------------------------------------- |
| id          | 题目id       |                                                 |
| course_id   | 课程id       |                                                 |
| user_answer | 用户选择答案 | 字符串，按顺序给                                |
| mode        | 刷题模式     | 只有mode为1才会去更新用户最后一次顺序刷题的记录 |

- 响应参数

| 参数名   | 参数说明 | 备注                                 |
| -------- | -------- | ------------------------------------ |
| is_right | 是否正确 | 1正确 0错误                          |
| answer   | 正确答案 | 返回正确的答案,小写表示              |
| code     | 状态码   |                                      |
| msg      | 说明信息 | 具体说明信息【待完成】（鼓励的话？） |

- 响应数据

```json
{
    "data": {
        "is_right":1,
        "answer": "a"
    },
    "code": 1,
    "msg": "success"
}
```

#### 1.3 收藏题目

- 请求路径：question/collect
- 请求方法：post
- 请求参数

| 参数名    | 参数说明 | 备注 |
| --------- | -------- | ---- |
| id        | 题目id   |      |
| course_id | 课程id   |      |

- 响应参数

| 参数名 | 参数说明 | 备注                   |
| ------ | -------- | ---------------------- |
| code   | 状态码   |                        |
| msg    | 说明信息 | 具体说明信息【待完成】 |

- 响应数据

```json
{
    "data": {
        
    },
    "code": 1,
    "msg": "success"
}
```

#### 1.4 取消收藏题目

- 请求路径：question/cancel_collect
- 请求方法：post
- 请求参数

| 参数名    | 参数说明 | 备注 |
| --------- | -------- | ---- |
| id        | 题目id   |      |
| course_id | 课程id   |      |

- 响应参数

| 参数名 | 参数说明 | 备注                   |
| ------ | -------- | ---------------------- |
| code   | 状态码   |                        |
| msg    | 说明信息 | 具体说明信息【待完成】 |

- 响应数据

```json
{
    "data": {
        
    },
    "code": 1,
    "msg": "success"
}
```

#### 1.5 随机显示题目

- 请求路径：question/display_random/:course_id
- 请求方法：get
- 请求参数

| 参数名    | 备注   |
| --------- | ------ |
| course_id | 课程id |

- 响应参数

| 参数名        | 参数说明                       | 备注 |
| ------------- | ------------------------------ | ---- |
| id            | 题目id                         |      |
| q_description | 问题的题面                     |      |
| option_a      | 选项内容                       |      |
| option_b      | 同上                           |      |
| option_c      | 同上                           |      |
| option_d      | 同上                           |      |
| answer        | 题目的答案                     |      |
| image_url     | 如果有图的话标记序号，否则为空 |      |
| is_multi      | 是否为多选题                   |      |
| is_collected  | 是否为收藏                     |      |
| code          | 状态码                         |      |
| msg           | 说明信息                       |      |

- 响应数据

```json
{
    "data": {
        "id": 1,
        "q_description": "ldd",
        "option_a": "XXX",
        "option_b": "XX",
        "option_c": "XXX",
        "option_d": "XXX",
        "answer": "xx",
        "image_url": "xxxx",
        "is_multi": 1,
        "is_collected": 1
    },
    "code": 1,
    "msg": "success"
}
```

#### 1.6 显示易错题目

- 请求路径：question/display_easy-wrong/:course_id
- 请求方法：get
- 备注：返回数据库中的易错题目的列表,返回50个
- 请求参数

| 参数名    | 备注   |
| --------- | ------ |
| course_id | 课程号 |

- 响应参数

| 参数名        | 参数说明                       | 备注     |
| ------------- | ------------------------------ | -------- |
| questions     | 题目列表                       |          |
| id            | 题目id                         |          |
| q_description | 问题的题面                     |          |
| option_a      | 选项内容                       |          |
| option_b      | 同上                           |          |
| option_c      | 同上                           |          |
| option_d      | 同上                           |          |
| answer        | 题目的答案                     |          |
| image_url     | 如果有图的话标记序号，否则为空 |          |
| is_multi      | 是否为多选题                   |          |
| is_collected  | 是否为收藏                     |          |
| err_rate      | 错误率                         | 两位小数 |
| code          | 状态码                         |          |
| msg           | 说明信息                       |          |

- 响应数据

```json
{
    "data": {
        "questions": [
            {
                "id": 1,
                "q_description": "ldd",
                "option_a": "XXX",
                "option_b": "XX",
                "option_c": "XXX",
                "option_d": "XXX",
                "answer": "xx",
                "image_url": "xxxx",
                "is_multi": 1,
                "is_collected": 1,
                "err_rate": 37.25%
            },
            {
                "id": 2,
                "q_description": "ldd",
                "option_a": "XXX",
                "option_b": "XX",
                "option_c": "XXX",
                "option_d": "XXX",
                "answer": "xx",
                "image_url": "xxxx",
                "is_multi": 1,
                "is_collected": 1,
                "err_rate": 37.25%
            }
        ]
    },
    "code": 1,
    "msg": "success"
}
```

#### 1.7 显示模拟考试题目

- 请求路径：question/display_exam/:course_id
- 请求方法：get
- 备注：各章节返回题目，总共85题，单选70题，多选15题。单选题在六章中选取比例为：10、15、10、10、15、10题，多选为全部中随机选。
- 请求参数

| 参数名    | 备注   |
| --------- | ------ |
| course_id | 课程号 |

- 响应参数

| 参数名        | 参数说明                       | 备注 |
| ------------- | ------------------------------ | ---- |
| questions     | 题目列表                       |      |
| id            | 题目id                         |      |
| q_description | 问题的题面                     |      |
| option_a      | 选项内容                       |      |
| option_b      | 同上                           |      |
| option_c      | 同上                           |      |
| option_d      | 同上                           |      |
| answer        | 题目的答案                     |      |
| image_url     | 如果有图的话标记序号，否则为空 |      |
| is_multi      | 是否为多选题                   |      |
| is_collected  | 是否为收藏                     |      |
| code          | 状态码                         |      |
| msg           | 说明信息                       |      |

- 响应数据

```json
{
    "data": {
        "questions": [
            {
                "id": 1,
                "q_description": "ldd",
                "option_a": "XXX",
                "option_b": "XX",
                "option_c": "XXX",
                "option_d": "XXX",
                "answer": "xx",
                "image_url": "xxxx",
                "is_multi": 1,
                "is_collected": 1
            },
            {
                "id": 2,
                "q_description": "ldd",
                "option_a": "XXX",
                "option_b": "XX",
                "option_c": "XXX",
                "option_d": "XXX",
                "answer": "xx",
                "image_url": "xxxx",
                "is_multi": 1,
                "is_collected": 1
            }
        ]
    },
    "code": 1,
    "msg": "success"
}
```

#### 1.7 显示模拟考试题目

- 请求路径：question/display_exam/:course_id
- 请求方法：get
- 备注：各章节返回题目，总共85题，单选70题，多选15题。单选题在六章中选取比例为：10、15、10、10、15、10题，多选为全部中随机选。
- 请求参数

| 参数名    | 备注   |
| --------- | ------ |
| course_id | 课程号 |

- 响应参数

| 参数名        | 参数说明                       | 备注 |
| ------------- | ------------------------------ | ---- |
| questions     | 题目列表                       |      |
| id            | 题目id                         |      |
| q_description | 问题的题面                     |      |
| option_a      | 选项内容                       |      |
| option_b      | 同上                           |      |
| option_c      | 同上                           |      |
| option_d      | 同上                           |      |
| answer        | 题目的答案                     |      |
| image_url     | 如果有图的话标记序号，否则为空 |      |
| is_multi      | 是否为多选题                   |      |
| is_collected  | 是否为收藏                     |      |
| code          | 状态码                         |      |
| msg           | 说明信息                       |      |

- 响应数据

```json
{
    "data": {
        "questions": [
            {
                "id": 1,
                "q_description": "ldd",
                "option_a": "XXX",
                "option_b": "XX",
                "option_c": "XXX",
                "option_d": "XXX",
                "answer": "xx",
                "image_url": "xxxx",
                "is_multi": 1,
                "is_collected": 1
            },
            {
                "id": 2,
                "q_description": "ldd",
                "option_a": "XXX",
                "option_b": "XX",
                "option_c": "XXX",
                "option_d": "XXX",
                "answer": "xx",
                "image_url": "xxxx",
                "is_multi": 1,
                "is_collected": 1
            }
        ]
    },
    "code": 1,
    "msg": "success"
}
```

#### 

#### 1.8 获得用户上次做到的题目id

- 请求路径：question/last_id/:course_id
- 请求方法：get
- 请求参数：

| 参数名    | 参数说明 | 备注     |
| --------- | -------- | -------- |
| course_id | 课程号   | 不能为空 |

- 响应参数


| 参数名 | 参数说明               | 备注 |
| ------ | ---------------------- | ---- |
| id     | 用户上次完成的最后一题 |      |

- 响应数据

```json
{
    "data": {
        "id":1 
    },
    "code": 1,
    "msg": "success"
}
```

#### 1.9 提交考试答案验证

- 请求路径：question/judge2
- 请求方法：post
- 请求参数

| 参数名      | 参数说明     | 备注     |
| ----------- | ------------ | -------- |
| id          | 题目id       | 一个数组 |
| course_id   | 课程id       |          |
| user_answer | 用户选择答案 | 一个数组 |

- 响应参数

| 参数名 | 参数说明 | 备注                                                         |
| ------ | -------- | ------------------------------------------------------------ |
| status | 是否正确 | 1正确 -1错误  0表示没做过（如果传入的user_answer 为空则表示此题没做） |
| code   | 状态码   |                                                              |
| msg    | 说明信息 | 具体说明信息【待完成】（鼓励的话？）                         |

- 响应数据

```json
{
    "data": {
        "status":[]
    },
    "code": 1,
    "msg": "success"
}
```

### 2. 题库

#### 2.1 显示用户题库信息

- 请求路径：question_pool/display/:course_id
- 请求方法：get
- 请求参数

| 参数名    | 参数说明 | 备注     |
| --------- | -------- | -------- |
| course_id | 课程号   | 不能为空 |

- 响应参数

| 参数名        | 参数说明     | 备注 |
| ------------- | ------------ | ---- |
| chapters      | 章节题目列表 |      |
| chapter_id    | 章节id       |      |
| chapter_title | 章节名字     |      |
| code          | 状态码       |      |
| msg           | 说明信息     |      |

- 响应数据

```json
{
    "data": {
        "chapters": [
                {
                    "chapter_id": 1,
                    "chapter_title": "ldd"
                },
                {
                    "chapter_id": 2,
                    "chapter_title": "ldd"
                }
        ]
    },
    "code": 1,
    "msg": "success"
}
```

#### 2.2  根据章节显示题库信息

- 请求路径：question_pool/display_chapter
- 请求方法：get
- 请求参数

| 参数名     | 参数说明 | 备注     |
| ---------- | -------- | -------- |
| course_id  | 课程号   | 不能为空 |
| chapter_id | 章节号   | 不能为空 |

- 响应参数

| 参数名  | 参数说明         | 备注 |
| ------- | ---------------- | ---- |
| subdata | 章节下题目子列表 |      |
| id      | 题目id           |      |
| status  | 题目的状态       |      |
| code    | 状态码           |      |
| msg     | 说明信息         |      |

- 响应数据

```json
{
    "data": {
        "subdata":[
                        {
                            "id": 1,
                            "status": "xx"
                        },
                        {
                            "id": 2,
                            "status": "xx"
                        },
        ]
    },
    "code": 1,
    "msg": "success"
}
```

#### 2.3 搜索题目

- 请求路径：question_pool/search
- 请求方法：get
- 请求参数

| 参数名    | 参数说明       | 备注 |
| --------- | -------------- | ---- |
| keyword   | 待搜索的关键字 |      |
| course_id | 课程号         |      |

- 响应参数

| 参数名        | 参数说明           | 备注 |
| ------------- | ------------------ | ---- |
| questions     | 搜索得到的题目列表 |      |
| id            | 题目id             |      |
| q_description | 题目描述           |      |
| code          | 状态码             |      |
| msg           | 说明信息           |      |

- 响应数据

```json
{
    "data": {
        "questions": [
            {
                "id": 1,
                "q_description": ""
            },
            {
                "id": 2,
                "q_description": ""
            }
        ]
    },
    "code": 1,
    "msg": "success"
}
```

#### 2.4 打开错题本

- 请求路径：question_error/display/:course_id
- 请求方法：get
- 请求参数

| 参数名    | 参数说明 | 备注 |
| --------- | -------- | ---- |
| course_id | 课程号   |      |

- 响应参数

| 参数名    | 参数说明           | 备注 |
| --------- | ------------------ | ---- |
| total_err | 总错误数           |      |
| chapters  | 章节错题统计       |      |
| id        | 章节id             |      |
| err_num   | 对应章节错题数量   |      |
| total_num | 对应章节题目总数量 |      |
| code      | 状态码             |      |
| msg       | 说明信息           |      |

- 响应数据

```json
{
    "data": {
        "total_err": 28,
        "chapters": [
            {
                "id": 1,
                "err_num": 1,
                "total_num": 23
            },
            {
                "id": 2,
                "err_num": 1,
                "total_num": 23
            }
        ]
    },
    "code": 1,
    "msg": "success"
}
```

#### 2.5 打开收藏本

- 请求路径：question_collection/display/:course_id
- 请求方法：get
- 请求参数

| 参数名    | 参数说明 | 备注 |
| --------- | -------- | ---- |
| course_id | 课程号   |      |

- 响应参数

| 参数名     | 参数说明           | 备注 |
| ---------- | ------------------ | ---- |
| total_coll | 总收藏数           |      |
| chapters   | 章节收藏题目统计   |      |
| id         | 章节id             |      |
| coll_num   | 对应章节收藏数量   |      |
| total_num  | 对应章节题目总数量 |      |
| code       | 状态码             |      |
| msg        | 说明信息           |      |

- 响应数据

```json
{
    "data": {
        "total_coll": 28,
        "chapters": [
            {
                "id": 1,
                "coll_num": 1,
                "total_num": 23
            },
            {
                "id": 2,
                "coll_num": 1,
                "total_num": 23
            }
        ]
    },
    "code": 1,
    "msg": "success"
}
```

#### 2.6 进入错题章节

- 请求路径：question_error/open_chapter
- 请求方法：get
- 备注：根据章节号显示该章节下错误的题目
- 请求参数

| 参数名    | 参数说明 | 备注 |
| --------- | -------- | ---- |
| id        | 章节号   |      |
| course_id | 课程号   |      |

- 响应参数

| 参数名        | 参数说明     | 备注 |
| ------------- | ------------ | ---- |
| id            | 题目id       |      |
| questions     | 章节错题列表 |      |
| q_description | 题目描述     |      |
| code          | 状态码       |      |
| msg           | 说明信息     |      |

- 响应数据

```json
{
    "data": {
        "questions": [
            {
                "id": 1,
                "q_description": ""
            },
            {
                "id": 2,
                "q_description": ""
            }
        ]
    },
    "code": 1,
    "msg": "success"
}
```

#### 2.7 进入收藏章节

- 请求路径：question_collection/open_chapter
- 请求方法：get
- 备注：根据章节号显示该章节下收藏的题目
- 请求参数

| 参数名    | 参数说明 | 备注 |
| --------- | -------- | ---- |
| id        | 章节号   |      |
| course_id | 课程号   |      |

- 响应参数

| 参数名        | 参数说明         | 备注 |
| ------------- | ---------------- | ---- |
| id            | 题目id           |      |
| questions     | 章节收藏题目列表 |      |
| q_description | 题目描述         |      |
| code          | 状态码           |      |
| msg           | 说明信息         |      |

- 响应数据

```json
{
    "data": {
        "questions": [
            {
                "id": 1,
                "q_description": ""
            },
            {
                "id": 2,
                "q_description": ""
            }
        ]
    },
    "code": 1,
    "msg": "success"
}
```

#### 2.8 获得所有课程的信息

#### 2.9 获得所有课程的信息

- 请求路径：course/info
- 请求方法：get
- 备注：根据章节号显示该章节下收藏的题目
- 请求参数: 无

- 响应参数

| 参数名     | 参数说明       | 备注         |
| ---------- | -------------- | ------------ |
| courseList | 课程信息列表   |              |
| value      | 题目的id       |              |
| label      | 题目名称       | 不是表的名称 |
| image_url  | 课程图片的url  |              |
| total      | 课程的总题目数 |              |
| code       | 状态码         |              |
| msg        | 说明信息       |              |

- 响应数据

```json
{
    "data": {
        "courseList": [
            	{
					"value": 1,
					"label": "航概(理)",
                    "image_url":"xxx",
                    "total":114514
				}
         ]
    },
    "code": 1,
    "msg": "success"
}
```

