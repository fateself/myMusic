(function(angular) {
    angular.module('music.login', [])
        //配置路由规则
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider.state('login', {
                url: '/login',
                templateUrl: '../../views/login.html',
                controller: 'loginController'
            })
        }])
        //控制器
        .controller('loginController', ['$scope', '$http', 'host', '$state', 'userService', function($scope, $http, host, $state, userService) {
            //挂载登录函数
            $scope.doLogin = function(data) {
                //测试代码 console.log(userService.getToken());
                $http.post(host + '/doLogin', data)
                    .then(function(res) {
                        if (res.data.code === '002') { //失败
                            alert(res.data.msg);
                        } else {
                            alert(res.data.msg);
                            userService.setToken(res.data.token); //保存token
                            userService.setName(data.username); //设置名称

                            //跳转页面
                            $state.go('list');
                        }

                    })
            }
        }])

})(angular);
