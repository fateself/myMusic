(function(angular) {
    angular.module('music.user', [])
        .service('userService', function() {
            //构造函数
            this.token = '';
            this.name = '';
            //获取token
            this.getToken = function() {
                return this.token;
            };
            //设置token
            this.setToken = function(t) {
                this.token = t;
            };
            //会在登录之后或者退出的时候调用
            this.setName = function(n) {
                this.name = n;
            };
            this.getName = function() {
                return this.name;
            }


        })
})(angular);
