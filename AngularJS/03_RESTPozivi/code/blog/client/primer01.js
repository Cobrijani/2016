(function (angular) {
	var blogEntriesCtrl = function ($scope, $http) {
		$scope.blogEntry = {};
		var loadEntries = function () {
			$http.get('/api/blogEntries',{params:{title:$scope.title}}).
			success(function (data, status) {
				$scope.blogEntries = data; 		
				$scope.blogEntry = {};
			})
			.error(function (data, status) {
				console.log('error!',data,status);
			});
		}
		loadEntries();
		$scope.save = function () {
			if(!$scope.blogEntry._id){
				$http.post('/api/blogEntries', $scope.blogEntry)
				.success(function () {
					loadEntries();
					$scope.blogEntry = {};
				})
				.error(function (data, status) {
					console.log('error!',data,status);
				});				
			}
			else{
				$http.put('/api/blogEntries/'+$scope.blogEntry._id, $scope.blogEntry)
				.success(function () {
					loadEntries();
					$scope.blogEntry = {};
				})
				.error(function (data, status) {
					console.log('error!',data,status);
				});				
			}
		} 
		$scope.delete = function (blogEntry) {
				$http.delete('/api/blogEntries/'+blogEntry._id)
				.success(function () {
					loadEntries();
				})
				.error(function (data, status) {
					console.log('error!',data,status);
				});				
		}
		$scope.edit = function (blogEntry) {
			$scope.blogEntry = blogEntry;
		} 
		$scope.filter = function () {
			loadEntries();
		}
	};
	var app = angular.module('app',[]);
	app.controller('blogEntriesCtrl', blogEntriesCtrl);
}(angular));