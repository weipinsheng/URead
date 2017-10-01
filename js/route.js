angular.module('app',['ng','ngRoute','ngAnimate']).controller('ctrl',function($scope,$location){
	$scope.jump = function(path){
		$location.path(path);
	},
	$scope.toggle = function($event){
		$event.stopPropagation();
		console.log($(this));
		// this.toggleClass('rotate');
	}
}).config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/index',{
		templateUrl: 'view/index/index.html'
	})
	.when('/find',{
		templateUrl: 'view/find/find.html'
	})
	.when('/record',{
		templateUrl: 'view/record/record.html'
	})
	.otherwise({
		redirectTo: '/index'
	})
}])