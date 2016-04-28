myApp.controller('EventController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
          
          $scope.add = function() {
              $scope.message = "Welcome " + $scope.Event.eventTitle;
          };
		  
          $scope.update = function() {
              $scope.message = "Welcome " + $scope.Event.eventTitle;
          };
		  
          $scope.delete = function() {
              $scope.message = "Welcome " + $scope.Event.eventTitle;
          };
		  
          $scope.fetch = function() {
              $scope.message = "Welcome " + $scope.Event.eventTitle;
          };
      }]);
