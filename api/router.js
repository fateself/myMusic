'use strict';
const express = require('express');
//测试的控制器
const testController = require('./controllers/testController.js');
//用户控制器
const userController = require('./controllers/userController.js');
//路由中间件
let router = express.Router();

//配置路由规则 开始
router.get('/test', (req, res, next) => {
        //函数的指向 -> 处理测试的控制器
        //testController.test(req, res, next);
    })
    .get('/', (req, res, next) => { //响应首页
        //res.render('index'); 后端渲染
    })
    .post('/checkUsername', (req, res, next) => { //验证用户名是否存在
        userController.checkUsername(req, res, next);
    })
    .post('/doRegister', (req, res, next) => { // 处理注册
        userController.doRegister(req, res, next)
    })
   .post('/doLogin',(req,res,next)=>{ //验证登录
       userController.doLogin(req,res,next);
   })
   .get('/musics',(req,res,next)=>{ //获取音乐数据
      userController.getMusics(req,res,next);
})

//配置路由规则 结束

module.exports = router;
