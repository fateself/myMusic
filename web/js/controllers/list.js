(function(angular) {
    angular.module('music.list', [])
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider.state('list', {
                url: '/list',
                templateUrl: '../../views/list.html',
                controller: 'listController'
            })
        }])
        //控制器
        .controller('listController', ['$scope', '$http', 'host', function($scope, $http, host) {
            $scope.lrcObj = {}; //装载歌词数据的对象
            //发起ajax请求获取音乐数据
            $http.get(host + '/musics')
                .then(function(res) {
                    $scope.musics = res.data; //数组
                });

            //声明播放的函数，在点击播放的时候
            $scope.play = function(music) {
                    //1:获取歌词路径
                    // console.log(music.lrcSrc);
                    //2:../files/hbx.lrc 发起请求
                    $http.get(music.lrcSrc)
                        .then(function(res) {

                            //获取歌词字符串
                            var lrcStr = res.data;
                            //以换行切合字符串  windows:\r\n || \n  mac:\r  linux : \n
                            var lines = lrcStr.split('\n');
                            var regex = /\[(\d{2})\:(\d{2})\.(\d{1,2})\](.+)/;
                            for (var i = lines.length - 1; i >= 0; i--) {
                                var result = regex.exec(lines[i]);
                                var f = result[1] - 0;
                                var m = result[2] - 0;
                                var hm = result[3] - 0;
                                var content = result[4];
                                var totoalSeconds = f * 60 + m; //忽略毫秒值
                                // console.log(totoalSeconds, '->', content);
                                $scope.lrcObj[totoalSeconds] = content;
                            }

                            //给子盒子创建p标签
                            $scope.createUI($scope.lrcObj);
                            //找到播放的元素
                            window.document.getElementById('audio').ontimeupdate = function(e) {
                                //console.log(e.target.currentTime); //0.32224233
                                var s = Math.round(e.target.currentTime);
                                $scope.scroll(s);

                            }

                        })




                    //音乐播放的src
                    $scope.audioSrc = music.musicSrc;
                }
                //滚动的操作
            $scope.scroll = function(jumpTime) {
                    if (!$scope.lrcObj[jumpTime]) return; //如果当前播放的秒数没有匹配的歌词
                    //获取jq对象
                    var $ = angular.element;
                    var lrcDiv = $(document.getElementById('lrc'));
                    var targetP = lrcDiv.find('p[time=' + jumpTime + ']'); //找到p标签
                    var height = targetP.offset().top - lrcDiv.offset().top;
                    // console.log('移动height', height);    height:32

                    //给元素添加样式
                    targetP.addClass('hl').siblings().removeClass('hl');
                    //移动当前子盒子
                    lrcDiv.animate({
                        top: -height
                    }, 'slow');

                }
                //创建UI
            $scope.createUI = function(obj) {
                var tmpStr = '';
                for (var key in obj) {
                    tmpStr += '<p time=' + key + '>' + obj[key] + '</p>'
                }
                document.getElementById('lrc').innerHTML = tmpStr;
            }

        }])
})(angular);
