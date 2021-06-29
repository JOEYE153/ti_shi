[toc]

# API总文档

## 零、说明

- 接口基准地址：https://buaatishi.com:3000
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

| 状态码 | 含义         |
| ------ | ------------ |
| 0      | 失败         |
| 1      | 成功         |
| 2      | 游客账户标识 |

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

#### 1.2 密码找回

##### 1.2.1 发送验证码

- 请求路径：reset/verify
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

##### 1.2.2 重置密码

- 请求路径：reset/confirm
- 请求方法：post
- 请求参数

| 参数名     | 参数说明 | 备注             |
| ---------- | -------- | ---------------- |
| email      | 邮箱     | 不能为空         |
| verifycode | 验证码   | 不能为空         |
| password   | 密码     | 不能为空         |

- 响应参数

| 参数名 | 参数说明 | 备注                                    |
| ------ | -------- | --------------------------------------- |
| code   | 状态码   |                                         |
| msg    | 说明信息 | 具体说明信息【待完成】                  |

- 响应数据

```json
{
    "data": {
        
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
| day_sum          | 做题天数   |                        |
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

## 三、评论

### 1. 获取评论

* 请求路径：question_comment/comment?:course_id&:question_id
* 请求方法：get
* 请求参数

| 参数名      | 参数说明 | 备注     |
| ----------- | -------- | -------- |
| course_id   | 课程号   | 不能为空 |
| question_id | 问题编号 | 不能为空 |

* 响应参数

| 参数名          | 参数说明     | 备注                     |
| --------------- | ------------ | ------------------------ |
| comment_list    | 评论列表     |                          |
| comment_id      | 评论id       |                          |
| user_id         | 评论者id     |                          |
| user_name       | 评论者用户名 |                          |
| img_url         | 头像链接     |                          |
| content         | 评论内容     |                          |
| create_time     | 评论创建时间 |                          |
| like_count      | 点赞数       |                          |
| all_reply_count | 总回复数     |                          |
| is_like         | 是否点赞过   | 1：已点赞；0：未点赞     |
| can_delete      | 能否删除     | 1：能够删除；0：不能删除 |
| reply_list      | 回复列表     |                          |
| reply_id        | 回复id       | reply_list 中数据        |
| user_name       | 回复者用户名 | reply_list 中数据        |
| content         | 回复内容     | reply_list 中数据        |
| code            | 状态码       |                          |
| msg             | 说明信息     |                          |

* 响应数据

``` json
{
	"data": {
        "comment_list": [
            {
                "comment_id": 1,
                "user_id": 1,
                "user_name": "User1",
                "img_url": "https://",
                "content": "Content1",
                "create_time": "2021年4月29日",
                "like_count": 2021,
                "all_reply_count": 11,
                "is_like": 0,
                "can_delete": 0,
                "reply_list": [
                    {
                        "user_name": "child1",
                        "content": "child_content1"
                    },
                    {
                        "user_name": "child2",
                        "content": "child_content2"
                    }
                ]
            },
            {
                "comment_id": 2,
                "user_id": 1,
                "user_name": "User1",
                "img_url": "https://",
                "content": "Content2",
                "create_time": "2021年4月29日",
                "like_count": 2021,
                "all_reply_count": 0,
                "is_like": 0,
                "can_delete": 0,
                "reply_list": [
                ]
            }
        ]
    },
    "code": 1,
    "msg": "success"
}
```

### 2. 获取评论回复

* 请求路径：question_comment/reply?:comment_id
* 请求方法：get
* 请求参数

| 参数名     | 参数说明 | 备注     |
| ---------- | -------- | -------- |
| comment_id | 评论 id  | 不能为空 |

* 响应参数

| 参数名             | 参数说明     | 备注                       |
| ------------------ | ------------ | -------------------------- |
| comment            | 评论         |                            |
| comment_id         | 评论 id      |                            |
| user_id            | 用户 id      |                            |
| user_name          | 用户名       |                            |
| img_url            | 头像链接     |                            |
| content            | 评论内容     |                            |
| create_time        | 评论创建时间 |                            |
| like_count         | 点赞数       |                            |
| all_reply_count    | 回复总数     |                            |
| is_like            | 是否已经点赞 | 0：未点赞；1：已点赞       |
| can_delete         | 能否删除     | 0：无权限删除；1：可以删除 |
| reply_list         | 回复列表     |                            |
| reply_id           | 回复 id      |                            |
| user_id            | 用户 id      |                            |
| user_name          | 用户名       |                            |
| img_url            | 头像链接     |                            |
| content            | 回复内容     |                            |
| create_time        | 回复创建时间 |                            |
| like_count         | 点赞数       |                            |
| is_like            | 是否已经点赞 | 0：未点赞；1：已点赞       |
| can_delete         | 能否删除     | 0：无权限删除；1：可以删除 |
| reply_to_user_name | 回复对象名   |                            |

* 响应数据

```json
{
	"data": {
        "comment": {
            "comment_id": 1,
            "user_id": 1,
            "user_name": "User1",
            "img_url": "https://",
            "content": "Content1",
            "create_time": "2021年4月29日",
            "like_count": 2021,
            "all_reply_count": 11,
            "is_like": 0,
            "can_delete": 0
        },
        "reply_list": [
            {
                "reply_id": 1,
                "user_id": 1,
                "user_name": "User1",
                "img_url": "https://",
                "content": "Content1",
                "create_time": "2021年4月29日",
                "like_count": 2021,
                "is_like": 0,
                "can_delete": 0,
                "reply_to_user_name": "User2"
            },
            {
                "comment_id": 2,
                "user_id": 1,
                "user_name": "User1",
                "img_url": "https://",
                "content": "Content2",
                "create_time": "2021年4月29日",
                "all_reply_count": 0,
                "is_like": 0,
                "can_delete": 0
            }
        ]
    },
    "code": 1,
    "msg": "success"
}
```

### 3. 添加题目评论

* 请求路径：question_comment/comment_add
* 请求方法：post
* 请求参数

| 参数名      | 参数说明 | 备注     |
| ----------- | -------- | -------- |
| course_id   | 课程号   | 不能为空 |
| question_id | 问题编号 | 不能为空 |
| content     | 评论内容 | 不能为空 |

* 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   | 待定 |
| msg    | 说明信息 | 待定 |

* 响应数据

```json
{
    "code": 1,
    "msg": "success"
}
```

### 4. 添加回复

* 请求路径：question_comment/reply_add
* 请求方法：post
* 请求参数

| 参数名           | 参数说明   | 备注                         |
| ---------------- | ---------- | ---------------------------- |
| comment_id       | 评论 id    | 不能为空                     |
| reply_to_user_id | 回复对象id | 空：回复评论；非空：回复回复 |
| content          | 回复内容   | 不能为空                     |

* 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   | 待定 |
| msg    | 说明信息 | 待定 |

* 响应数据

```json
{
    "code": 1,
    "msg": "success"
}
```

### 5. 修改评论点赞

* 请求路径：question_comment/comment_like
* 请求方法：post
* 请求参数

| 参数名     | 参数说明 | 备注                 |
| ---------- | -------- | -------------------- |
| comment_id | 评论 id  | 不能为空             |
| is_like    | 点赞状态 | 0：取消点赞；1：点赞 |

* 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   | 待定 |
| msg    | 说明信息 | 待定 |

* 响应数据

```json
{
    "code": 1,
    "msg": "success"
}
```

### 6. 修改回复点赞

* 请求路径：question_comment/reply_like
* 请求方法：post
* 请求参数

| 参数名   | 参数说明 | 备注                 |
| -------- | -------- | -------------------- |
| reply_id | 回复 id  | 不能为空             |
| is_like  | 点赞状态 | 0：取消点赞；1：点赞 |

* 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   | 待定 |
| msg    | 说明信息 | 待定 |

* 响应数据

```json
{
    "code": 1,
    "msg": "success"
}
```

### 7. 删除评论

* 请求路径：question_comment/comment_delete
* 请求方法：delete
* 请求参数

| 参数名     | 参数说明 | 备注     |
| ---------- | -------- | -------- |
| comment_id | 评论 id  | 不能为空 |

* 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   | 待定 |
| msg    | 说明信息 | 待定 |

* 响应数据

```json
{
    "code": 1,
    "msg": "success"
}
```

### 8. 删除回复

* 请求路径：question_comment/reply_delete
* 请求方法：delete
* 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| reply_id | 回复 id  | 不能为空 |

* 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   | 待定 |
| msg    | 说明信息 | 待定 |

* 响应数据

```json
{
    "code": 1,
    "msg": "success"
}
```

## 四、后台管理系统

### 1. 查询题目

- 请求路径：manage/query/:course_id
- 请求方法：get
- 请求参数

| 参数名    | 参数说明 | 备注     |
| --------- | -------- | -------- |
| course_id | 科目id   | 不能为空 |

- 响应参数

| 参数名          | 参数说明                       | 备注              |
| --------------- | ------------------------------ | ----------------- |
| questions       | 题目列表                       |                   |
| chapter_id      | 章节号                         |                   |
| id              | 题目id                         |                   |
| q_description   | 问题的题面                     |                   |
| option_a        | 选项内容                       |                   |
| option_b        | 同上                           |                   |
| option_c        | 同上                           |                   |
| option_d        | 同上                           |                   |
| answer          | 题目的答案                     |                   |
| image_url       | 如果有图的话标记序号，否则为空 |                   |
| is_multi        | 是否为多选题                   | 1为true，0为false |
| error_rate      | 错误率                         |                   |
| complete_number | 做题人数                       |                   |
| code            | 状态码                         |                   |
| msg             | 说明信息                       |                   |

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

| 参数名        | 参数说明                               | 备注              |
| ------------- | -------------------------------------- | ----------------- |
| questions     | 待添加的题目列表                       |                   |
| course_id     | 科目id                                 |                   |
| chapter_id    | 章节号                                 |                   |
| id            | 添加列表中的题目id（区别于后台题目id） |                   |
| q_description | 问题的题面                             |                   |
| option_a      | 选项内容                               |                   |
| option_b      | 同上                                   |                   |
| option_c      | 同上                                   |                   |
| option_d      | 同上                                   |                   |
| answer        | 题目的答案                             |                   |
| image_url     | 如果有图的话标记序号，否则为空         |                   |
| is_multi      | 是否为多选题                           | 1为true，0为false |

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

### 5. 注册用户详情

- 请求路径：manage/registration
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
|        |          |      |

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

| 参数名    | 参数说明 | 备注           |
| --------- | -------- | -------------- |
| startTime | 起始时间 | e.g.  2021-5-6 |
| endTime   | 结束时间 | e.g.  2021-5-9 |

- 响应参数

| 参数名 | 参数说明     | 备注 |
| ------ | ------------ | ---- |
| result | 查询结果列表 |      |
| code   | 状态码       |      |
| msg    | 说明信息     |      |

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

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |
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

| 参数名  | 参数说明 | 备注     |
| ------- | -------- | -------- |
| post_id | 帖子id   | 不能为空 |

- 响应参数

| 参数名          | 参数说明                 | 备注                                   |
| --------------- | ------------------------ | -------------------------------------- |
| comments        | 帖子评论列表             |                                        |
| post_comment_id | 帖子评论id               |                                        |
| user_id         | 评论用户id               |                                        |
| user_name       | 评论用户名               |                                        |
| create_time     | 帖子评论创建时间         |                                        |
| content         | 帖子评论内容             |                                        |
| like_count      | 被点赞次数               |                                        |
| is_right_answer | 帖子评论是否被标记为答案 | 为0时没有被标记答案，为1时被标记为答案 |

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

| 参数名          | 参数说明   | 备注     |
| --------------- | ---------- | -------- |
| post_comment_id | 帖子评论id | 不能为空 |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |
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

| 参数名      | 参数说明 | 备注     |
| ----------- | -------- | -------- |
| course_id   | 科目id   | 不能为空 |
| question_id | 题目id   | 不能为空 |

- 响应参数

| 参数名      | 参数说明         | 备注 |
| ----------- | ---------------- | ---- |
| comments    | 题目评论列表     |      |
| comment_id  | 题目评论id       |      |
| user_id     | 用户id           |      |
| user_name   | 用户名           |      |
| create_time | 题目评论创建时间 |      |
| content     | 题目评论内容     |      |


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

| 参数名     | 参数说明   | 备注     |
| ---------- | ---------- | -------- |
| comment_id | 题目评论id | 不能为空 |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

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

| 参数名     | 参数说明   | 备注     |
| ---------- | ---------- | -------- |
| comment_id | 题目评论id | 不能为空 |

- 响应参数

| 参数名      | 参数说明         | 备注 |
| ----------- | ---------------- | ---- |
| replys      | 题目评论列表     |      |
| reply_id    | 题目评论id       |      |
| user_id     | 回复者id         |      |
| user_name   | 回复者用户名     |      |
| create_time | 题目评论创建时间 |      |
| content     | 题目评论内容     |      |


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

| 参数名   | 参数说明   | 备注 |
| -------- | ---------- | ---- |
| reply_id | 题目评论id |      |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

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

| 参数名  | 参数说明 | 备注               |
| ------- | -------- | ------------------ |
| content | 广播内容 | 向所有人广播的内容 |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

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

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
|        |          |      |

- 响应参数

| 参数名     | 参数说明 | 备注 |
| ---------- | -------- | ---- |
| reports    | 举报列表 |      |
| id         | 举报id   |      |
| user_id    | 举报者id |      |
| reason     | 举报理由 |      |
| item       | 表项id   |      |
| table_name | 表名     |      |
| time       | 举报时间 |      |



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

| 参数名  | 参数说明     | 备注                                                         |
| ------- | ------------ | ------------------------------------------------------------ |
| id      | 举报id       |                                                              |
| user_id | 举报者id     |                                                              |
| pass    | 举报是否成立 | 为0表示不成立，同时告知举报者“举报失败”，为1表示成立，同时告知举报者“举报成功，相关内容已被处理” |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

- 响应数据

```json
{
    "data": {
        
    },
    "code": 1,
    "msg": "success",
}
```

## 五、图片上传

### 1. 上传头像

* 请求路径：upload/avatar
* 请求方法：post
* 请求参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| file   | 头像图片 |      |

前端需要对文件格式和文件大小进行检查

* 响应参数

| 参数名 | 参数说明 | 备注             |
| ------ | -------- | ---------------- |
| code   | 状态码   | 0：失败；1：成功 |
| msg    | 说明信息 | fail or success  |

- 响应数据

```json
{
    "data": {
        
    },
    "code": 1,
    "msg": "success",
}
```

## 六、消息通知

### 1.获取未读消息总数（提示红点用）

- 请求路径：message/getNum
- 请求方法：get
- 请求参数

| 参数名    | 参数说明             | 备注     |
| --------- | -------------------- | -------- |

- 响应参数

| 参数名 | 参数说明       | 备注 |
| ------ | -------------- | ---- |
| num    | 未读消息总数量 |      |

- 响应数据

```json
{
    "data": {
        "num": 3
    },
    "code": 1,
    "msg": "success"
}
```

### 2.获取所有个人相关消息

- 请求路径：message/getPersonal
- 请求方法：get
- 请求参数

| 参数名    | 参数说明             | 备注     |
| --------- | -------------------- | -------- |

- 响应参数

| 参数名      | 参数说明                     | 备注 |
| ----------- | ---------------------------- | ---- |
| message     | 消息列表                     |      |
| message_id  | 消息id                       |      |
| sender_name | 发送方用户名                 |      |
| description | 消息描述                     |      |
| status      | 消息是否已读（0已读，1未读） |      |
| position    | 消息针对的原位置             |      |
| url         | 跳转链接                     |      |
| code        | 状态码                       |      |
| msg         | 说明信息                     |      |

- 响应数据

```json
{
    "data": {
       	"message": [
            {
               "message_id": 1,
               "sender_name": "xxxx",
               "description": "xxxx",
               "status": 0/1,
               "time": xxxx-xx-xx,
               "position": "第xx题",
               "url": "xxxxxx"
            }, 
            {
               "message_id": 1,
               "sender_name": "xxxx",
               "description": "xxxx",
               "status": 0/1,
               "time": xxxx-xx-xx
            }
        ]
    },
    "code": 1,
    "msg": "success"
}
```

### 3.设置个人相关消息状态

- 请求路径：message/setPersonal
- 请求方法：post
- 请求参数

| 参数名     | 参数说明                           | 备注 |
| ---------- | ---------------------------------- | ---- |
| message_id | 消息id                             |      |
| status     | 消息需要设置的状态（0已读，1未读） |      |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

- 响应数据

```json
{
    "data": {
    },
    "code": 1,
    "msg": "success"
}
```

### 4.删除个人相关消息

- 请求路径：message/deletePersonal
- 请求方法：post
- 请求参数

| 参数名     | 参数说明 | 备注 |
| ---------- | -------- | ---- |
| message_id | 消息id   |      |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

- 响应数据

```json
{
    "data": {
    },
    "code": 1,
    "msg": "success"
}
```

### 5.获取官方消息

- 请求路径：message/getOfficial
- 请求方法：get
- 请求参数

| 参数名    | 参数说明             | 备注     |
| --------- | -------------------- | -------- |

- 响应参数

| 参数名      | 参数说明                     | 备注 |
| ----------- | ---------------------------- | ---- |
| message     | 消息列表                     |      |
| message_id  | 消息id                       |      |
| sender_name | 发送方用户名                 |      |
| description | 消息描述                     |      |
| status      | 消息是否已读（0已读，1未读） |      |
| code        | 状态码                       |      |
| msg         | 说明信息                     |      |

- 响应数据

```json
{
    "data": {
       	"message": [
            {
               "message_id": 1,
               "sender_name": "xxxx",
               "description": "xxxx",
               "status": 0/1,
               "time": xxxx-xx-xx
            }, 
            {
               "message_id": 1,
               "sender_name": "xxxx",
               "description": "xxxx",
               "status": 0/1,
               "time": xxxx-xx-xx
            }
        ]
    },
    "code": 1,
    "msg": "success"
}
```

### 6.设置官方消息读取状态

- 请求路径：message/setOfficial
- 请求方法：post
- 请求参数

| 参数名     | 参数说明                           | 备注 |
| ---------- | ---------------------------------- | ---- |
| message_id | 消息id                             |      |
| status     | 消息需要设置的状态（0已读，1未读） |      |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

- 响应数据

```json
{
    "data": {
    },
    "code": 1,
    "msg": "success"
}
```

### 7.删除官方消息

- 请求路径：message/deleteOfficial
- 请求方法：post
- 请求参数

| 参数名     | 参数说明 | 备注 |
| ---------- | -------- | ---- |
| message_id | 消息id   |      |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

- 响应数据

```json
{
    "data": {
    },
    "code": 1,
    "msg": "success"
}
```

### 8.设置考期消息提醒

- 请求路径：message/setCalendar
- 请求方法：post
- 请求参数

| 参数名 | 参数说明 | 备注                           |
| ------ | -------- | ------------------------------ |
| status | 状态设置 | 消息是否开启（0不开启，1开启） |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

- 响应数据

```json
{
    "data": {
    },
    "code": 1,
    "msg": "success"
}
```

### 9.设置其他消息提醒

- 请求路径：message/setOther
- 请求方法：post
- 请求参数

| 参数名 | 参数说明 | 备注                           |
| ------ | -------- | ------------------------------ |
| status | 状态设置 | 消息是否开启（0不开启，1开启） |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

- 响应数据

```json
{
    "data": {
    },
    "code": 1,
    "msg": "success"
}
```

### 10. 获取考期消息提醒状态

- 请求路径：message/getCalendar
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
|        |          |      |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

- 响应数据

```json
{
    "data": {
        "status": 0/1
    },
    "code": 1,
    "msg": "success"
}
```

### 11.获取其他消息提醒

- 请求路径：message/getOther
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
|        |          |      |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

- 响应数据

```json
{
    "data": {
        "status": 0/1
    },
    "code": 1,
    "msg": "success"
}
```

## 七、举报信息

### 1.查询是否已被举报

- 请求路径：report/get
- 请求方法：get
- 请求参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| item   | 表项id   |      |
| table  | 表名     |      |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

- 响应数据

```json
{
    "data": {
    },
    "code": 1,
    "msg": "success"
}
```

### 2.举报信息

- 请求路径：report/add
- 请求方法：post
- 请求参数

| 参数名 | 参数说明 | 备注                |
| ------ | -------- | ------------------- |
| item   | 表项id   |                     |
| table  | 表名     |                     |
| reason | 举报理由 | 70字以上，150字以内 |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

- 响应数据

```json
{
    "data": {
    },
    "code": 1,
    "msg": "success"
}
```

## 八、考期日历

### 1. 显示所有考期

- 请求路径：calendar/
- 请求方法：get
- 请求参数

- 响应参数

| 参数名  | 参数说明 | 备注                            |
| ------- | -------- | ------------------------------- |
| id      | id       |                                 |
| date    | 日期     |                                 |
| title   | 课程名   |                                 |
| content | 内容     |                                 |
| finish  | 是否过期 | 与当前日期比较(0:false, 1:true) |
| code    | 状态码   |                                 |
| msg     | 说明信息 |                                 |

- 响应数据

```json
{
    "data": {
        "riliList": [{
                     "id":"1",
                     "date": "2021-06-23",
                     "title": "日历使用说明",
                     "content": "日历用于帮助同学们记录考期时间,点击下方加号按钮可以实现添加,点击",
                     "finish": false
                    }, 
                   {
                     "id":"2",
                     "date": "2021-06-23",
                     "title": "日历使用说明",
                     "content": "日历用于帮助同学们记录考期时间,点击下方加号按钮可以实现添加,点击",
                     "finish": true
                    }
                  ]
    },
    "code": 1,
    "msg": "success"
}
```

### 2. 删除某个考期

- 请求路径：calendar/

- 请求方法：delete

- 请求参数

| 参数名 | 参数说明 | 备注       |
| ------ | -------- | ---------- |
| id     | id       | 要删除的id |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

- 响应数据

```json
{
    "code": 1,
    "msg": "success"
}
```

### 3. 增加一个考期

- 请求路径：calendar/

- 请求方法：post

- 请求参数

| 参数名  | 参数说明 | 备注 |
| ------- | -------- | ---- |
| date    | 考期日期 |      |
| title   | 科目名称 |      |
| content | 内容     |      |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

- 响应数据

```json
{
    "code": 1,
    "msg": "success"
}
```

### 4. 修改考期日历

- 请求路径：calendar/

- 请求方法：put

- 请求参数

| 参数名      | 参数说明         | 备注 |
| ----------- | ---------------- | ---- |
| calendar_id | 需要修改的日历id |      |
| date        | 考期日期         |      |
| title       | 科目名称         |      |
| content     | 内容             |      |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

- 响应数据

```json
{
    "code": 1,
    "msg": "success"
}
```

## 九、 知识卡片

### 1. 显示所有知识卡片

- 请求路径：card/

- 请求方法：get

- 请求参数

| 参数名    | 参数说明 | 备注 |
| --------- | -------- | ---- |
| course_id | 课程id   |      |

- 响应参数

| 参数名      | 参数说明 | 备注 |
| ----------- | -------- | ---- |
| id          | 卡片id   |      |
| title       | 卡片名   |      |
| content     | 卡片内容 |      |
| color_value | 颜色值   |      |
| code        | 状态码   |      |
| msg         | 说明信息 |      |

- 响应数据

```json
{
    "data": {
        "kapianList": [{
                     "id":"1",
                     "title": "",
                     "content": "",
            		 "colorId":1
                    }, 
                   {
                     "id":"2",
                     "title": "",
                     "content": "",
            		"colorId":2
                    }
                  ]
    },
    "code": 1,
    "msg": "success"
}
```

### 2. 创建知识卡片

- 请求路径：card/
- 请求方法：post
- 请求参数

| 参数名       | 参数说明 | 备注 |
| ------------ | -------- | ---- |
| course_id    | 课程id   |      |
| title        | 卡片名   |      |
| content      | 内容     |      |
| （颜色默认） |          |      |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

- 响应数据

```json
{
    "code": 1,
    "msg": "success"
}
```

### 3. 修改知识卡片

- 请求路径：card/
- 请求方法：put
- 请求参数

| 参数名  | 参数说明       | 备注 |
| ------- | -------------- | ---- |
| id      | 被修改卡片的id |      |
| title   | 卡片名         |      |
| content | 内容           |      |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

- 响应数据

```json
{
    "code": 1,
    "msg": "success"
}
```

### 4. 删除某个卡片

- 请求路径：card/
- 请求方法：delete
- 请求参数

| 参数名 | 参数说明       | 备注 |
| ------ | -------------- | ---- |
| id     | 被修改卡片的id |      |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

- 响应数据

```json
{
    "code": 1,
    "msg": "success"
}
```

### 5. 修改颜色

- 请求路径：card/change_color
- 请求方法：put
- 请求参数

| 参数名      | 参数说明           | 备注 |
| ----------- | ------------------ | ---- |
| id          | 被修改颜色卡片的id |      |
| color_value | 颜色值             |      |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

- 响应数据

```json
{
    "code": 1,
    "msg": "success"
}
```

## 十、资源社区

### 1. 获取资源

- 请求路径：resource/getResource
- 请求方法：get
- 请求参数

| 参数名    | 参数说明             | 备注     |
| --------- | -------------------- | -------- |
| course_id | 请求题目对应的课程号 | 不能为空 |

- 响应参数

| 参数名      | 参数说明                   | 备注 |
| ----------- | -------------------------- | ---- |
| id          | 资源id                     |      |
| user_name   | 用户名                     |      |
| topic       | 主题                       |      |
| description | 具体描述                   |      |
| link        | 链接                       |      |
| time        | 上传时间                   |      |
| password    | 资源提取密码               |      |
| can_delete  | 能否删除（0不可以，1可以） |      |

- 响应数据

```json
{
    "data": {
        "sourceList": [
            {
                "id": 1,
                "user_name": "xxxxx",
                "topic": "xxxx",
                "descripiton": "xxxx",
                "link": "xxxx",
                "time": "xxxx",
                "password": "xxxx",
                "can_delete": 0
            },
            {
                xxx
            }
         ]
    },
    "code": 1,
    "msg": "success"
}
```

### 2. 新增资源

- 请求路径:resource/postResource
- 请求方法：post
- 请求参数

| 参数名      | 参数说明             | 备注      |
| ----------- | -------------------- | --------- |
| course_id   | 请求题目对应的课程号 | 不能为空  |
| topic       | 主题                 | 15字之内  |
| description | 描述                 | 100字之内 |
| link        | 链接                 | 资源链接  |

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

- 响应数据

```json
{
    "data": {
    },
    "code": 1,
    "msg": "success"
}
```

### 3. 删除资源

- 请求路径:resource/deleteResource
- 请求方法：post
- 请求参数

| 参数名    | 参数说明             | 备注     |
| --------- | -------------------- | -------- |
| id        | 资源id               | 不能为空 |
| course_id | 请求题目对应的课程号 | 不能为空 |

- 响应参数

| 参数名 | 参数说明 | 备注              |
| ------ | -------- | ----------------- |
| code   | 状态码   | 0失败1成功2无权限 |
| msg    | 说明信息 |                   |

- 响应数据

```json
{
    "data": {
    },
    "code": 1,
    "msg": "success"
}
```

### 4. 资源关键词搜索

- 请求路径:resource/searchResource
- 请求方法：get
- 请求参数

| 参数名    | 参数说明             | 备注       |
| --------- | -------------------- | ---------- |
| course_id | 请求题目对应的课程号 | 不能为空   |
| word      | 关键词               | 空即为所有 |

- 响应参数

| 参数名      | 参数说明                   | 备注 |
| ----------- | -------------------------- | ---- |
| id          | 资源id                     |      |
| user_name   | 用户名                     |      |
| topic       | 主题                       |      |
| description | 具体描述                   |      |
| link        | 链接                       |      |
| time        | 上传时间                   |      |
| password    | 资源提取密码               |      |
| can_delete  | 能否删除（0不可以，1可以） |      |

- 响应数据

```json
{
    "data": {
        "sourceList": [
            {
                "id": 1,
                "user_name": "xxxxx",
                "topic": "xxxx",
                "descripiton": "xxxx",
                "link": "xxxx",
                "time": "xxxx",
                "password": "xxxx",
                "can_delete": 0
            },
            {
                xxx
            }
         ]
    },
    "code": 1,
    "msg": "success"
}
```

## 十一、问答社区

### 1. 获取所有帖子

* 请求路径：posts/get_all_post?course_id=x&post_status=y
* 请求方法：get
* 请求参数

| 参数名      | 参数说明 | 备注                                |
| ----------- | -------- | ----------------------------------- |
| course_id   | 课程id   | 不能为空                            |
| post_status | 帖子状态 | 0：Open；1：Closed；2：All；3：Mine |

* 响应参数

| 参数名               | 参数说明     | 备注                     |
| -------------------- | ------------ | ------------------------ |
| post_list            | 帖子列表     |                          |
| post_id              | 帖子id       |                          |
| create_time          | 创建时间     |                          |
| last_modified_time   | 最后修改时间 |                          |
| post_title           | 帖子标题     |                          |
| people_in_discussion | 讨论次数     |                          |
| is_top               | 是否置顶     | 0：不置顶；1：置顶       |
| post_type            | 帖子类型     | 0：讨论；1：提问；2：... |
| cur_status           | 当前帖子状态 | 0：Open；1：Closed       |
| code                 | 状态码       |                          |
| msg                  | 说明信息     |                          |

* 响应数据

```json
{
	"data": {
        "post_list": [
            {
                "post_id": 1,
                "create_time": "2021年5月22日",
                "last_modified_time":"2021年5月26日",
                "post_title": "帖子标题1",
                "people_in_discussion": 59,
                "is_top":0,
                "post_type":1,
                "cur_status": 1
            },
            {
                "post_id": 2,
                "create_time": "2021年5月22日",
                "last_modified_time":"2021年5月26日",
                "post_title": "帖子标题2",
                "people_in_discussion": 2,
                "is_top":1,
                "post_type":0,
                "cur_status": 1
            }
        ]
    },
    "code": 1,
    "msg": "success"
}
```

* 其他说明
  * 返回的post_list按照is_top和last_modified_time进行排序

### 2. 获取帖子信息

* 请求路径：posts/get_post_info?post_id=x
* 请求方法：get
* 请求参数

| 参数名  | 参数说明 | 备注     |
| ------- | -------- | -------- |
| post_id | 帖子id   | 不能为空 |

* 响应参数

| 参数名                      | 参数说明                                     | 备注                     |
| --------------------------- | -------------------------------------------- | ------------------------ |
| post_id                     | 帖子id                                       |                          |
| course_id                   | 科目id                                       |                          |
| course_name                 | 科目名                                       |                          |
| post_title                  | 帖子标题                                     |                          |
| cur_status                  | 帖子当前状态                                 |                          |
| user_id                     | 用户id                                       |                          |
| user_name                   | 用户名                                       |                          |
| img_url                     | 头像url                                      |                          |
| create_time                 | 创建时间                                     |                          |
| content                     | 帖子内容                                     |                          |
| post_type                   | 帖子类型                                     | 0：讨论；1：提问；2：... |
| have_permission_edit_post   | 是否有权限修改帖子（内容，状态，所属科目等） | 0：无权限；1：有权限     |
| post_comment_list           | 帖子评论列表                                 |                          |
| post_comment_id             | 帖子评论id                                   |                          |
| is_right_answer             | 是否被标记位正确答案                         |                          |
| like_count                  | 点赞数                                       |                          |
| is_like                     | 能否点赞                                     |                          |
| have_permission_for_comment | 是否有评论编辑（删除）权限                   | 0：无权限；1：有权限     |
| code                        | 状态码                                       |                          |
| msg                         | 说明信息                                     |                          |

* 响应数据

```json
{
	"data": {
        "post_id": 1,
        "course_id": 1,
        "course_name": "航概(理科)",
        "post_title": "帖子标题",
        "cur_status": 0,
        "user_id": "发帖人id",
        "user_name": "发帖人用户名",
        "img_url": "发帖人头像",
        "create_time": "2021年5月22日",
        "have_permission_edit_post": 1,
        "post_type": 1,
        "content": "发帖内容",
        "post_comment_list": [
            {
                "post_comment_id": 1,
                "user_id": 1,
                "user_name": "User1",
                "img_url": "https://",
                "content": "Content1",
                "create_time": "2021年4月29日",
                "like_count": 2021,
                "is_like": 0,
                "have_permission_for_comment": 0,
                "is_right_answer": 1
            },
            {
                "post_comment_id": 2,
                "user_id": 1,
                "user_name": "User1",
                "img_url": "https://",
                "content": "Content2",
                "create_time": "2021年4月29日",
                "like_count": 2021,
                "is_like": 0,
                "have_permission_for_comment": 0,
                "is_right_answer": 0
            }
        ]
    },
    "code": 1,
    "msg": "success"
}
```

### 3. 发帖

* 请求路径：posts/post_add
* 请求方法：post
* 请求参数

| 参数名     | 参数说明 | 备注                     |
| ---------- | -------- | ------------------------ |
| course_id  | 科目id   | 不能为空                 |
| post_title | 帖子标题 | 不能为空                 |
| post_type  | 帖子类型 | 0：讨论；1：提问；2：... |
| content    | 帖子内容 | 不能为空                 |

* 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

* 响应数据

```json
{
    "code": 1,
    "msg": "success"
}
```

### 4. 添加帖子评论

* 请求路径：posts/post_comment_add
* 请求方法：post
* 请求参数

| 参数名  | 参数说明 | 备注     |
| ------- | -------- | -------- |
| post_id | 帖子id   | 不能为空 |
| content | 评论内容 | 不能为空 |

* 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

* 响应数据

```json
{
    "code": 1,
    "msg": "success"
}
```

### 5. 编辑帖子内容

* 请求路径：posts/post_edit
* 请求方法：post
* 请求参数

| 参数名     | 参数说明 | 备注                     |
| ---------- | -------- | ------------------------ |
| post_id    | 帖子id   | 不能为空                 |
| post_type  | 帖子类型 | 0：讨论；1：提问；2：... |
| post_title | 帖子标题 | 不能为空                 |
| content    | 帖子内容 | 不能为空                 |

* 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

* 响应数据

```json
{
    "code": 1,
    "msg": "success"
}
```

### 6. 编辑帖子评论

* 请求路径：posts/post_comment_edit
* 请求方法：post
* 请求参数

| 参数名          | 参数说明   | 备注     |
| --------------- | ---------- | -------- |
| post_comment_id | 帖子评论id | 不能为空 |
| post_id         | 帖子id     | 不能为空 |
| content         | 评论内容   | 不能为空 |

* 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

* 响应数据

```json
{
    "code": 1,
    "msg": "success"
}
```

### 7. 评论点赞

* 请求路径：posts/post_comment_like
* 请求方法：post
* 请求参数

| 参数名          | 参数说明   | 备注                           |
| --------------- | ---------- | ------------------------------ |
| post_comment_id | 帖子评论id | 不能为空                       |
| is_like         | 点赞状态   | 0：取消点赞；1：点赞；不能为空 |

* 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

* 响应数据

```json
{
    "code": 1,
    "msg": "success"
}
```

### 8. 标记评论正确答案

* 请求路径：posts/post_comment_is_right
* 请求方法：post
* 请求参数

| 参数名          | 参数说明   | 备注                                   |
| --------------- | ---------- | -------------------------------------- |
| post_user_id    | 发帖人id   | 不能为空                               |
| post_comment_id | 帖子评论id | 不能为空                               |
| is_right_answer | 标记状态   | 0：未标记；1：标记为正确答案；不能为空 |

* 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

* 响应数据

```json
{
    "code": 1,
    "msg": "success"
}
```

### 9. 删除帖子

* 请求路径：posts/post_delete
* 请求方法：delete
* 请求参数

| 参数名  | 参数说明 | 备注     |
| ------- | -------- | -------- |
| post_id | 帖子id   | 不能为空 |

* 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

* 响应数据

```json
{
    "code": 1,
    "msg": "success"
}
```

### 10. 删除帖子评论

* 请求路径：posts/post_comment_delete
* 请求方法：delete
* 请求参数

| 参数名          | 参数说明   | 备注     |
| --------------- | ---------- | -------- |
| post_comment_id | 帖子评论id | 不能为空 |

* 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

* 响应数据

```json
{
    "code": 1,
    "msg": "success"
}
```

### 11. 帖子搜索

* 请求路径：posts/post_search?course_id=x&keyword=x
* 请求方法：get
* 请求参数

| 参数名      | 参数说明 | 备注                                          |
| ----------- | -------- | --------------------------------------------- |
| course_id   | 课程id   | 不能为空                                      |
| keyword     | 关键词   | 不能为空                                      |
| post_status | 帖子状态 | 0：Open；1：Closed；2：All；3：Mine；不能为空 |

* 说明
  * 根据关键词和帖子中标题的匹配查找题目
* 响应参数

| 参数名               | 参数说明 | 备注 |
| -------------------- | -------- | ---- |
| post_list            | 帖子列表 |      |
| post_id              | 帖子id   |      |
| create_time          | 创建时间 |      |
| post_title           | 帖子标题 |      |
| people_in_discussion | 讨论人数 |      |
| code                 | 状态码   |      |
| msg                  | 说明信息 |      |

* 响应数据

```json
{
	"data": {
        "post_list": [
            {
                "post_id": 1,
                "create_time": "2021年5月22日",
                "last_modified_time":"2021年5月26日",
                "post_title": "帖子标题1",
                "people_in_discussion": 59,
                "is_top":0,
                "post_type":1
            },
            {
                "post_id": 2,
                "create_time": "2021年5月22日",
                "last_modified_time":"2021年5月26日",
                "post_title": "帖子标题2",
                "people_in_discussion": 2,
                "is_top":1,
                "post_type":0
            }
        ]
    },
    "code": 1,
    "msg": "success"
}
```

### 12. 帖子状态修改

* 请求路径：posts/post_status
* 请求方式：post
* 请求参数

| 参数名       | 参数说明 | 备注                                     |
| ------------ | -------- | ---------------------------------------- |
| post_id      | 帖子id   | 不能为空                                 |
| post_user_id | 发帖者id | 不能为空                                 |
| post_status  | 帖子状态 | 0：Open；1：Closed；只能为0或1，不能为空 |

* 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
| code   | 状态码   |      |
| msg    | 说明信息 |      |

* 响应数据

```json
{
    "code": 1,
    "msg": "success"
}
```

