(function(angular) {
    angular.module('music.logout', [])
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider.state('logout', {
                url: '/logout',
                templateUrl: '../../views/logout.html',
                controller: 'logoutController'
            })
        }])
        .controller('logoutController', ['$state', 'userService', '$scope', '$timeout', function($state, userService, $scope, $timeout) {
            //已经点击了退出按钮
            //页面就需要显示
            $scope.msg = '即将退出，请稍后.....';
            //修改service对象中的name属性
            userService.setName('');
            $timeout(function() {
                //页面跳转
                $state.go('login');
            }, 2000)
        }])
})(angular);
