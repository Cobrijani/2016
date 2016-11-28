(function(angular) {
	var userCtrl = function ($scope, $http) {
		$http.get('https://api.github.com/users/angular')
		.then(function (data) {
			$scope.user = data;
		});
	}

	var app = angular.module("app", []);
	app.controller("userCtrl", userCtrl);

})(angular);
