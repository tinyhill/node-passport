## passport

### 部署数据库

切换到数据库：

```
use passport-development
```

创建数据库用户：

```
db.createUser(
   {
     user: "root",
     pwd: "HyNmt8JFAf8fXCTg",
     roles: [ "readWrite", "dbAdmin" ]
   }
)
```

### 用户字段说明

* username - 用户名称
* password - 用户密码
* display_name - 显示名称
* avatar - 头像地址
* email - 邮件地址
* mobile - 手机号码
* registered - 注册时间
* level - 角色等级
* activation_key - 用户激活码
* status - 用户状态
* gender - 性别
* province - 省份
* city - 城市
* qq_openid
* wechat_openid
* wechat_unionid
* weibo_openid

### 客户端读取用户信息

```
http://passport.yougedi.com/profile/qq?access_token=***
http://passport.yougedi.com/profile/wechat?access_token=***&openid=***
http://passport.yougedi.com/profile/weibo?access_token=***
```