#简介
登录注册DEMO运用到了Node.js,Mysql,Ajax等基础知识，实现登录注册，会话管理等功能；

#特点
- 注册时通过Ajax检测用户名是否可用；
- 通过正则表达式检测用户名、密码是否满足格式要求；

#路由
- `/index` 登录和注册都在这个页面
- `/auth`  登录授权
- `/auth/restricted`  需要权限才能进入的页面
- `/auth/logout` 登出
- `/register` 处理注册post数据
- `/register/search?username=foobar` 检查用户名是否可用 