(function(angular) {
	var myController = function ($scope) {
		$scope.text = 'some text'; 
		setTimeout(function () {
			$scope.text = 'new value';
		},2000);
	};


    var application = angular.module("app", []);
    application.controller('myCtrl', myController);
    application.controller('dummyCtrl', function () {});
})(angular);
