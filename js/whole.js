angular.module('app', ['ng', 'ngRoute', 'ngAnimate'])
    .controller('myCtrl', ['$scope', '$location', function($scope, $location) {
        $scope.jump = function(path) {
                $location.path(path);
            },
            $scope.toggle = function($event) {
                $event.stopPropagation();
            }
        //首页的控制器
    }]).controller('indexCtrl', ['$scope', function($scope) {
        //发现的控制器
    }]).controller('findCtrl', ['$scope', function($scope) {
        //数据的控制器
    }]).controller('recordCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

        //控制显示隐藏
        $scope.display = {
            add_show: true, //控制上传图片框的显示与隐藏
            loading: true, //控制加载动画
            error: true //控制请求错误动画
        }

        //座右铭背景图
        $scope.motto = "images/add.png";

        //分享好书封面
        $scope.shareBook = {
            shareBook1: 'images/add.png',
            shareBook2: 'images/add.png',
            shareBook3: 'images/add.png',
            shareBook4: 'images/add.png',
            shareBook5: 'images/add.png',
            shareBook6: 'images/add.png'
        }
        //请求超时函数
        let timeout_error = function() {

            let timeout_error = $timeout(function() {
                $scope.display.loading = true;
                $scope.display.error = false;
            }, 6000);

            return timeout_error;
        }
        $scope.error = timeout_error();

        //页面渲染完成
        $scope.$watch('$viewContentLoaded', function() {
            $scope.display.loading = false;
            $scope.error; //执行请求超时定时器
            $http({
                method: 'POST',
                url: 'https://www.tengn.top/motto/r',
                data: {},
                headers: { 'Content-Type': undefined }, //请求头必须是这个
                transformRequest: angular.identity
            }).then(function(res) { //请求成功
                console.log(res.data);
                $scope.display.loading = true;
                $timeout.cancel($scope.error); //请求成功之后清除定时器
            }).catch(function(res) { //报错
                console.log(res.data)
                $scope.display.loading = true;
                $scope.display.error = false; //请求失败显示error动画
                $timeout.cancel($scope.error); //请求成功后清除定时器
            })
        });

        //卡片编辑按钮
        $scope.edit = function($event) {
            $event.stopPropagation();
            $scope.display.add_show = false;
        }

        
        $scope.reader = new FileReader(); //创建一个FileReader接口

        //选择图片后执行的函数
        $scope.imgPreview = function(files) {

            $scope.reader.readAsDataURL(files[0]); //转base64，以便进行预览

            $scope.reader.onload = function(e) {
                //ng-src数据改变不进行刷新，必须要用$apply
                $scope.$apply(function() {
                    $scope.motto = e.target.result;
                })
            }
            // 上传文件需要使用FormData
            $scope.img = new FormData();

            $scope.img.append("Motto", files[0])
            $scope.submit_img();//选中图片马上发送请求
        }

        $scope.submit_data = {}; //需要提交的数据
        //图片上传
        $scope.submit_img = function() {
            $scope.display.loading = false;
            $scope.error; //执行请求超时定时器
            $http({
                method: 'POST',
                url: 'https://www.tengn.top/upload',
                data: $scope.img,
                headers: { 'Content-Type': undefined }, //请求头必须是这个
                transformRequest: angular.identity
            }).then(function(res) { //请求成功
                console.log(res.data);
                $scope.display.loading = true;
                $timeout.cancel($scope.error); //请求成功后清除定时器
                $scope.submit_data.Img = 'https://www.tengn.top/' + res.data.path;
            }).catch(function(res) { //报错
                console.log(res.data)
                $scope.display.loading = true;
                $scope.display.error = false; //请求失败显示error动画
                $timeout.cancel($scope.error); //请求成功后清除定时器
            })
        }
        //文字框内容
        $scope.show = function() {
            $scope.submit_data.text = $scope.motto_txt
        }
        //点击提交
        //确认
        $scope.submit = function($event) {

            $event.stopPropagation();
            console.log(JSON.stringify($scope.submit_data));
            $scope.display.loading = false; //显示加载动画
            $scope.error; //点击提交开始进行计时，超时6s显示

            $http({
                method: 'POST',
                url: 'https://www.tengn.top/motto/c',
                data: JSON.stringify($scope.submit_data),
                dataType: 'JSON',
                headers: { 'Content-Type': 'application/json;charset=UTF-8' }
            }).then(function(res) {
                console.log(res.data);
                $scope.display.loading = true;
                $scope.display.add_show = true;

                $timeout.cancel($scope.error); //请求成功后清除定时器


            }).catch(function(res) {
                console.log(res.data)
                $scope.display.loading = true;
                $scope.display.error = false; //请求失败显示error动画
                $timeout.cancel($scope.error); //请求成功后清除定时器
            })

        }
        //取消
        $scope.cancel = function($event) {
            $event.stopPropagation();
            $scope.display.add_show = true;
        }
        //路由单页
    }]).config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/index', {
                templateUrl: 'view/index/index.html',
                controller: 'indexCtrl'
            })
            .when('/find', {
                templateUrl: 'view/find/find.html',
                controller: 'findCtrl'
            })
            .when('/record', {
                templateUrl: 'view/record/record.html',
                controller: 'recordCtrl'
            })
            .otherwise({
                redirectTo: '/index'
            })
    }])