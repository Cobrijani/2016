(function(angular) {
	var myController = function ($scope, $interval) {
		$scope.users = []; 
		$interval(function () {
			$scope.users.push({'ime':'Pera','prezime':'Peric'});
		},1000);
		$scope.stopCounting = $scope.$watchCollection('users',
		function (newValue, oldValue) {
			console.log('counter changed from', JSON.stringify(oldValue), 'to', JSON.stringify(newValue));
		});
	};

    var application = angular.module("app", []);
    application.controller('myCtrl', myController);
})(angular);
