(function(angular){
	angular.module('music.register',[])
	.config(['$stateProvider',function('stateProvider'){
		$stateProvider.state('register',{
			url:'/register',
			templateUrl:'../../views/register.html',
			controller:'registerController'
		})
	}])
	.controller('registerController', ['$scope', '$http', '$state', 'host',function($scope, $http, $state,host) {
        //挂载注册函数
        $scope.doSubmit = function(fromData) {
            //发起post请求
            $http.post(host+'/doRegister', fromData)
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
     }])




})(angular)