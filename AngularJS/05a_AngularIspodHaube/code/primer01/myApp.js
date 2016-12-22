(function(angular) {
	var myController = function ($scope, $interval) {
		$scope.counter = 1; 
		$interval(function () {
			$scope.counter += 1;
			// console.log($scope.counter);
		},1000);
		$scope.stopCounting = $scope.$watch(function (scope) {
			return scope.counter;
		},
		//'counter',
		function (newValue, oldValue, scope) {
			console.log('counter changed from', oldValue, 'to', newValue);
			// console.log('scope', scope);
		});
	};	

    var application = angular.module("app", []);
    application.controller('myCtrl', myController);
})(angular);
