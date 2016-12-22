(function(angular) {
	var myController = function ($scope, $interval) {
		$scope.counter = 1; 
		$interval(function () {
			$scope.counter += 1;
		},1000);
		$scope.stopCounting = $scope.$watch(function (scope) {
			return scope.counter;
		},
		function (newValue, oldValue) {
			console.log('counter changed from', oldValue, 'to', newValue);
		});
	};

    var application = angular.module("app", []);
    application.controller('myCtrl', myController);
})(angular);
