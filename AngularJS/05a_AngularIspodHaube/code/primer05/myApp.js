(function(angular) {
	var myController = function ($scope) {
		$scope.text = 'some text'; 
		setTimeout(function () {
			$scope.$apply(function () {
				$scope.text = 'new value';
			});
			// $scope.text = 'new value';
			// $scope.$digest();
		},2000);
	};

    var application = angular.module("app", []);
    application.controller('myCtrl', myController);
})(angular);
