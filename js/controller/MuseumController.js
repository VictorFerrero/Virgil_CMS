myApp.controller('MuseumController', ['$scope', '$rootScope', '$http',
      function($scope, $rootScope, $http) {
      		$rootScope.museum = null;

		  $scope.baseUrl = "http://52.24.10.104/Virgil_Backend_Stage/Virgil_Backend/index.php/museum/";
          $scope.add = function() {

		        successCallback = function(response) {
		            // success of call back could still mean that server side 
		            // error occurred
		            if(response.data.success == true) {
		                // we send back the newly created account to the front end
		                var museumObj = response.data.record;
		                // save the accontObj in $scope
		                $rootScope.museum = museumObj;
		                $scope.Museum = museumObj;
		            }
		            else {
		                // server did not return error, but something
		                // went wrong in the php code
		                errorCallback();
		            }
		        }
		      errorCallback = function(response) {
		            var error = response.data.errors; // this is an array 
		            console.log(error); // see if we have any errors from php script
		            // also log status codes from server
		            console.log(response.status);
		            console.log(response.statusText);

		            // TODO: display error message to the user
		        }
		        var data = new Object();
              data.museumName      = $scope.Museum.museumName;
			  data.museumAccountId = 1;
			  data.museumAddress   = $scope.Museum.address;
			  var museumProfileJSO = $scope.addHours();
			  data.museumProfileJSON = angular.toJson(museumProfileJSO);
			  $scope.ajax(data, "createMuseum", successCallback, errorCallback);
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
		 $scope.ajax = 
     function(var data, var route, var successCallback, var errorCallback) {
        var baseUrl = "";
        var fullRoute = $scope.baseUrl + route;
       $http.post(fullRoute, data).then(successCallback, errorCallback);
    }
      }]);
