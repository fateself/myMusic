'use strict';
let userController = {};
let db = require('../models/db.js');
/**
 * 验证用户名是否存在
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
userController.checkUsername = function(req, res, next) {

        //1:获取请求参数
        var username = req.body.username;
        //2:查询数据库用户名是否存在
        db.find('users', { username: username }, function(err, users) {
            //3:返回json对象
            if (users.length === 0) {
                res.json({ code: '001', message: '可以注册！' });
            } else {
                res.json({ code: '002', message: '用户名已经存在！' });
            }
        });


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
/**
 * 验证登录
 * @param req
 * @param res
 * @param next
 */
userController.doLogin = function (req,res,next) {
    // console.log(global); //第二次重复登录的时候，显示看一看原来的TOKEN /测试
    // 测试通过中间件是否能成功的挂载req.user => console.log('测试挂载req.uer',req.user);

    // 接受数据
    let user = req.body;
    //查询数据库判断是否存在该用户名及密码
    db.find('users',user,function(err,users){
        //判断如果为0 没有该用户，用户名或密码不存在
        if(users.length === 0){
            res.json({code:'002',msg:'用户名或密码不存在！'});
        }else{
            let dbUser = users[0];
            //生成token
            let token = 'mytoken_'+ Date.now();
            //再以token做key保存用户数据
            global[token] = dbUser;
            res.json({code:'001',msg:'登录成功',token:token});
        }
    })

};
/**
 * 获取音乐数据，通过用户id
 * @param req
 * @param res
 * @param next
 */
userController.getMusics = function(req,res,next){
    //获取当前user的数据
    let user = req.user||{};

    // 将当前user对象的._id作为条件查询
    let id = user._id +'';
    // 获取到相关的音乐数据，并返回
    db.find('musics',{uid:id},function(err,musics){
        res.json(musics);
    });
}

module.exports = userController;
