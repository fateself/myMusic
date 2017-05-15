(function(angular) {
    angular.module('music.header', [])
        .directive('myHeader', ['userService', function(userService) {
            //要使用服务对象
            return {
                link: function(scope, ele, attr) {
                    //挂载监视的操作
                    //一定要是scope的属性
                    scope.us = userService;
                    scope.$watch('us.getName()', function(newV, oldV) {
                        //登录以后newV 就是用户名
                        scope.name = newV;
                    })
                },
                templateUrl: '../../views/header.html'
            }
        }])
})(angular);
