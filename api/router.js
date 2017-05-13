"use strict";
const express = require("express");
//用户控制器
const userController = require("controllers/userController.js");
//路由中间件
let router = express.Router();

//配置路由规则 开始
router.get('/',(req,res,next) =>{//相应页面
	res.render("index");
})
.post("/checkUsername",(req,res,next)=>{
	userController.checkUsername(req,res,next);
})
.post("/doRegister",(req,res,next)=>{
	userController.doRegister(res,res,next)
})

module.exports = router;