# 评论相关API
### 1. 获取评论

* 请求路径：question_comment/comment?:course_id&:question_id
* 请求方法：get
* 请求参数

| 参数名      | 参数说明   | 备注     |
| ----------- | ---------- | -------- |
| course_id   | 课程号     | 不能为空 |
| question_id | 问题编号   | 不能为空 |

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

| 参数名 | 参数说明     | 备注     |
| -------- | ---------- | -------- |
| comment_id   | 评论 id | 不能为空 |

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

| 参数名   | 参数说明      | 备注     |
| ---------- | ----------- | -------- |
| course_id     | 课程号   | 不能为空 |
| question_id   | 问题编号 | 不能为空 |
| content   | 评论内容     | 不能为空 |

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
| comment_id | 评论 id | 不能为空             |
| is_like | 点赞状态 | 0：取消点赞；1：点赞 |

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

