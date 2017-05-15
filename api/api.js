'use strict';
const express = require('express');
const router = require('./router.js');
const bodyParser = require('body-parser');

//创建服务器对象
let app = express();


//前后端分离之后注释的部分 开始
//注册一个引擎
// app.engine('html', require('express-art-template'));
// //对art-template相关配置
// app.set('view options', {
//     debug: true,
//     extname: '.html'
//         //debug: process.env.NODE_ENV !== 'production'
// });
// //设置模板查找路径
// app.set('views', './views');
// //设置模板引擎
// app.set('view engine', 'html');

//处理静态资源文件
// app.use('/public', express.static('./public'));
//根据内部引用的模板向外暴露
// app.use('/views', express.static('./views'));

//前后端分离之后注释的部分 结束



//加入body-parser解析
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req,res,next) {
    //添加跨域资源共享
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','*');
    // res.setHeader('Access-Control-Request-Headers','*');
    res.setHeader('Access-Control-Allow-Headers','mytoken');
    next(); //完毕以后放行
});
//在路由操作之前获取token，通过token拿到对象，挂载到req上，方便后续路由中获取对象
app.use(function (req,res,next) {
    //获取头字段数据
    if(req.headers.mytoken){//mytoken_1494744112500
        req.user = global[req.headers.mytoken];
        //req.body = xxxx;
    }
    //都需要后续继续执行
    next();
});

//将其加入到中间件队列中
app.use(router); //使用req.body


app.listen(80, () => {
    console.log('Music start');
});
