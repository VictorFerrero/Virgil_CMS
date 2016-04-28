myApp.controller('ContentController', ['$scope',
      function($scope) {
          
          $scope.add = function() {
              $scope.message = "Welcome " + $scope.Content.contentDescription;
          };
		  
		  $scope.update = function() {
              $scope.message = "Welcome " + $scope.Content.contentTitle;
          };
		  
		  $scope.delete = function() {
			  $scope.message = "Welcome " + $scope.Content.contentTitle;
		  };
		  
		  $scope.fetch = function() {
              $scope.message = "Welcome " + $scope.Content.contentTitle;
          }; 
      }]);
