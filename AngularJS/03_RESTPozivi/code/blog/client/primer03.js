(function (angular) {
	var blogEntriesCtrl = function ($scope, Restangular) {
		var blogEntries = Restangular.all('blogEntries');
		var loadEntries = function () {
			blogEntries.getList().then(function (data) {
				$scope.blogEntries = data;
				$scope.blogEntry = {}
			});
		};
		loadEntries();
		$scope.save = function () {
			if($scope.blogEntry._id){
				$scope.blogEntry.put().then(function () {
					loadEntries();
				})
			}
			else{
				blogEntries.post($scope.blogEntry).then(function () {
					loadEntries();
				});
			}
		} 
		$scope.delete = function (blogEntry) {
			blogEntry.remove().then(function () {
				loadEntries();
			});
		}
		$scope.edit = function (blogEntry) {
			$scope.blogEntry = blogEntry;
		} 
	};
	var app = angular.module('app',['restangular']);
	//restangular defautlno posmatra polje id resursa kao id
	app.config(function(RestangularProvider) {
		RestangularProvider.setRestangularFields({
  			id: "_id"
		});
		RestangularProvider.setBaseUrl('/api');
	});
	app.controller('blogEntriesCtrl', blogEntriesCtrl);
}(angular));