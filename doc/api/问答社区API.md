# 问答社区API

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