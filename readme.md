# vue 项目模板

基于vue-cli脚手架之上进行定制。

+ .gitlab-ci.yml 已经全文件注释，根据需要修改项目名称
+ src/config/index.js 根据环境变更的host地址， 根据项目需要修改
+ mock/* 是mock数据， dev-server 已经集成该服务， ```npm start``` 默认使用mock服务。 可以修改```package.json```的文件start命令指定环境，如 ```npm start --env=dev```

# 配置

```bash
# 使用g公司私有镜像源
$ npm config set registry http://r.npm.apitops.com

# 设置 node-sass 二进制包代理地址
$ npm config set sass_binary_site http://npm.taobao.org/mirrors/node-sass
```
