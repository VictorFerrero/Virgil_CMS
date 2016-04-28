myApp.controller('ExhibitController', ['$scope',
      function($scope) {
          
          $scope.add = function() {
              $scope.message = "Welcome " + $scope.Exhibit.exhibitTitle;
          };
		  
		  $scope.update = function() {
              $scope.message = "Welcome " + $scope.Exhibit.exhibitTitle;
          };
		  
		  $scope.delete = function() {
              $scope.message = "Welcome " + $scope.Exhibit.exhibitTitle;
          };
		  
		  $scope.fetch = function() {
              $scope.message = "Welcome " + $scope.Exhibit.exhibitTitle;
          };
      }]);
