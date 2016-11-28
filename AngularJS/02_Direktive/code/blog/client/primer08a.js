(function(angular) {

  var blogEntriesController = function($scope, $http) {
    $scope.sortOrder = 'title';
    var search = function() {
      var promise = $http.get("/api/blogEntries", {
        params: $scope.searchEntry
      });
      promise.then(function(response) {
        $scope.blogEntries = response.data;
      });
    };

    $scope.search = search;
    search();

    $scope.callHome = function (message) {
      alert(message);
    };
  };

  var entriesDirective = function() {
    return {
      scope: { //izolovanje opsega,
        entries: "=blogEntries", // blogEntries se mapira na blog-entries,
        order: "=sortOrder" // scopeOrder se mapira na scope-order,
      },
      restrict: "E",
      templateUrl: "primer08-entries.html"
    };
  };

  var app = angular.module("app", []);
  app.controller("blogEntriesCtrl", blogEntriesController);
  app.directive("xwsEntries", entriesDirective);
  app.directive("phone", function () {
    return {
      scope: {
        dial: "&"
      },
      template: '<input type="text" ng-model="value">' +
        '<button ng-click="dial({message:value})">' +
        'Call home!</button>',
    };
  });
})(angular);
