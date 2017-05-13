"use strict";
let userController = {};
let db = require("../models/db.js");

userController.checkUsername = function(req,res,next){
	//获取请求参数
	var username = req.body.username;
	db.find("users",{username:username},function(err,users){
		//查询数据库用户名是否存在
		if (users.length === 0) {
			res.json({code:"001",message:"可以注册！"});
		}else{
			res.json({code:"002",message:"用户名已经存在"});
		}
	})
}


    /**
     * 注册功能
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
userController.doRegister = function(req, res, next) {
    //获取数据
    let formData = req.body;
    let username = formData.username;
    //判断用户名是否存在
    db.find('users', { username: username }, (err, users) => {
        if (users.length === 0) {
            //添加进数据库，方便未来登录用
            db.insert('users', formData, (err, result) => {
                // if(err) next(err);
                //响应用户处理成功
                res.json({ code: '001', message: '恭喜注册成功' });
            });
        } else {
            res.json({ code: '002', message: '用户名已经存在！' });
        }
    });
}

module.exports = userController;
