myApp.controller('MuseumController', ['$scope', '$rootScope', '$http',
      function($scope, $rootScope, $http) {
		  
          $scope.add = function() {
              $rootScope.museumName      = $scope.Museum.museumName;
			  $rootScope.museumAccountId = 1;
			  $rootScope.museumAddress   = $scope.Museum.address;
			  
			  //$scope.hours = addHours();
			  
			  $rootScope.museumProfileJSON = $scope.hours;
				  
			  $scope.message        = $rootScope.museumName;   
          };
		  
		  $scope.update = function() {
              $scope.message = "Welcome " + $scope.Museum.museumName;
          };
		  
		  $scope.delete = function() {
              $scope.message = "Welcome " + $scope.Museum.museumName;
          };
		  
		  $scope.fetch = function() {
              $scope.message = "Welcome " + $scope.Museum.museumName;
          };
		  
		  $scope.addHours = function() {
			  
		  }; 
		 
      }]);
