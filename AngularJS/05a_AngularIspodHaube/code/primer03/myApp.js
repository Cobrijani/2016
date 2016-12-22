(function(angular) {
	var myController = function ($scope,$timeout) {
		$scope.counter = 0; 
		$scope.newValue = 'some text'; 
		$timeout(function () {
			$scope.stopCounting = $scope.$watchCollection('counter',
			function (newValue, oldValue, scope) {
				console.log('First watch executed \nAdding $evalAsync');
				scope.$evalAsync(function (scope) {		    
			        console.log('$evalAsync executed');
			        scope.newValue = "new value!";
				});			
			});
			$scope.$$postDigest(function () {
				console.log('$$postDigest executed. Digest completed');
				console.log($scope.newValue);
			});
		},5000);
	};

    var application = angular.module("app", []);
    application.controller('myCtrl', myController);
})(angular);
