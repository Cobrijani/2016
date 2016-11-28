(function (angular) {
	var blogEntriesCtrl = function ($scope, $http) {
		$scope.blogEntry = {};
		$scope.page = 1;
		var loadEntries = function () {
			var parameters = {title:$scope.title}
			//ako hocemo da preuzmemo sve podatke
			if (!$scope.all){
				parameters.page = $scope.page;
			}
			//ako hocemo da simuliramo gresku na serveru
			if ($scope.err){
				parameters.err = $scope.err;
			}
			$http.get('/api/blogEntries',{params:parameters}).
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
		$scope.changePage = function (i) {
			$scope.page += i;
			loadEntries();
		}
	};

	var prepareResponse = function (data) {
		if(data.docs){
			return data.docs;
		}
		else{
			return data;
		}
	}

	var app = angular.module('app',[]);
	app.config(function($httpProvider) {
		$httpProvider.defaults.transformResponse.push(prepareResponse);
		$httpProvider.interceptors.push(function ($q) {
	        return {
	            'response': function (response) {
	                return response;
	            },
	            'responseError': function (rejection) {
	                if(rejection.status === 500) {
	                    alert('server error!');
	                }
	                return $q.reject(rejection);
	            }
	        };
	    });
	});
	app.controller('blogEntriesCtrl', blogEntriesCtrl);
}(angular));