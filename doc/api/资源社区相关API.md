## 五、资源社区

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

| 参数名        | 参数说明                       | 备注 |
| ------------- | ------------------------------ | ---- |
| code          | 状态码                         |      |
| msg           | 说明信息                       |      |

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

| 参数名      | 参数说明             | 备注      |
| ----------- | -------------------- | --------- |
| id          | 资源id               | 不能为空  |
| course_id   | 请求题目对应的课程号 | 不能为空  |

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