(function(angular) {
    var app = angular.module('music', [
        'ui.router',
        'music.login',
        'music.register',
        'music.list',
        'music.user',
        'music.header',
        'music.logout',
    ]);

    app.constant('host', 'http://127.0.0.1')

    //配置路由规则
    app.config(['$urlRouterProvider', '$stateProvider', '$httpProvider', function($urlRouterProvider, $stateProvider, $httpProvider) {
        //配置默认http请求行为 头、转换数据
        $httpProvider.defaults.headers.post = {
            'content-type': 'application/x-www-form-urlencoded'
        }
        $httpProvider.defaults.transformRequest = function(data) {
                var str = '';
                for (var key in data) {
                    str += key + '=' + data[key] + '&'
                }
                return str.substr(0, str.length - 1); //name=jack&age=18
            }
            //配置拦截器
        $httpProvider.interceptors.push(['userService', function(userService) {
            return {
                //请求的时候做时候 
                request: function(config) {
                    //给请求头加上一个字段
                    if (userService.getToken()) {
                        //在请求的时候加入一个mytoken的头，值是服务器回写回来的token
                        config.headers.mytoken = userService.getToken();
                    }
                    return config;
                },
                response: function(response) {
                        // response.data.xxx += '%'; 响应数据的加工
                        return response;
                    }
                    //响应的时候做什么 xxx + %
            }
        }])

        $urlRouterProvider.otherwise('login'); //让锚点默认进入login



    }]);

})(angular);
