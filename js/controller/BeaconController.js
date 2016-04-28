myApp.controller('BeaconController', ['$scope',
      function($scope) {
          
          $scope.add = function() {
			  
              $scope.message = "Welcome " + $scope.Beacon.beaconContentTitle;
          };
		  
		  $scope.update = function() {
              $scope.message = "Welcome " + $scope.Beacon.beaconContentTitle;
          };
		  
		  $scope.delete = function() {
			  $scope.message = "Welcome " + $scope.Beacon.beaconContentTitle;
		  };
		  
		  $scope.fetch = function() {
              $scope.message = "Welcome " + $scope.Beacon.beaconContentTitle;
          }; 

      }]);
