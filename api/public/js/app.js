(function(angular) {
    var app = angular.module('music', ['ui.router']);
    //配置路由规则
    app.config(['$urlRouterProvider', '$stateProvider', '$httpProvider', function($urlRouterProvider, $stateProvider, $httpProvider) {
        //配置默认http请求行为 头、转换数据
        $httpProvider.defaults.headers.post = {
            'content-type': 'application/x-www-form-urlencoded'
        }
        $httpProvider.defaults.transformRequest = function(data) {
            var str = '';
            for (var key in data) {
                str += key + '=' + data[key] + '&';
            }
            return str.substr(0, str.length - 1);
        }


        $urlRouterProvider.otherwise('login'); //让锚点默认进入login
        $stateProvider.state('login', {
                url: '/login',
                templateUrl: '../../views/login.html'
            })
            .state('register', {
                url: '/register',
                templateUrl: '../../views/register.html',
                controller: 'registerController'
            })
    }]);
    app.directive('checkPwd', function() {
        return {
            templateUrl: '../../views/checkPwd.html',
            link: function(scope, ele, attrs) {
                //先挂载一个函数
                scope.changeColor = function(level) { //1 赋值1次颜色， 2赋值2次颜色
                    //ele[0] 原生dom元素
                    var $ = angular.element; //获取jquery对象
                    var divChlids = $(ele[0]).children().children(); //转换成jq对象

                    // 创建颜色
                    var colors = ['yellowgreen', 'skyblue', 'hotpink'];
                    //默认先清空
                    for (var i = 0; i < divChlids.length; i++) {
                        divChlids[i].style.backgroundColor = '';
                    }
                    for (var i = 0; i < level; i++) { //level:1/2/3
                        //当前是0
                        divChlids[i].style.backgroundColor = colors[i];
                    }

                }
            }
        }
    });
    //注册
    app.controller('registerController', ['$scope', '$http', '$state', function($scope, $http, $state) {
        //挂载注册函数
        $scope.doSubmit = function(fromData) {
            //发起post请求
            $http.post('/doRegister', fromData)
                .then(function(res) {
                    //根据结果处理
                    if (res.data.code === '002') {
                        alert(res.data.message);
                        $scope.data = {}; //清空
                    } else {
                        $state.go('login'); //参数是一个状态名
                    }
                })
        }




        //检查用户名是否存在
        $scope.checkUserName = function(username) {
                $http.post('/checkUsername', {
                        username: username
                    })
                    .then(function(res) {
                        $scope.message = res.data.message;
                    })
            }
            //改变颜色
        $scope.doChange = function(str) {
            //如果当前的数字长度小于6位就不判断
            if (str.length < 6) return;
            var level = 0;
            //规则1: 包含数组
            var regex1 = /[\d]/;
            var regex2 = /[a-zA-Z]/;
            var regex3 = /[!@#$%^&*]/;


            //判断是否匹配，匹配一个，密码安全级别自增
            if (regex1.test(str)) level++;
            if (regex2.test(str)) level++;
            if (regex3.test(str)) level++;

            //将安全级别参数传递
            $scope.changeColor(level);
        }
    }]);
})(angular);
