myApp.controller('MuseumController', ['$scope', '$rootScope', '$http',
      function($scope, $rootScope, $http) {
      		$rootScope.museum = null;

		  $scope.baseUrl = "http://52.24.10.104/Virgil_Backend_Stage/Virgil_Backend/index.php/";
		   /*
		  $scope.Museums = [
				  {
				   id:-1,
				   museumName:"",
				   address: "",
				   museumCity:   "",	  
				   museumState:  "",
				   museumZipcode: ""
				  },
				  {
				   id:1,
				   museumName:"Agricultural Museum",
				   address: "205 Derry Hill",
				   museumCity:   "Uncasville",	  
				   museumState:  "CT",
				   museumZipcode: "06382"
				  },
      		 	  {
				   id:2, 	  
				   museumName:"Space Museum",
				   address: "112 Main St",	  
				   museumCity:"Fitchburg",
				   museumState: "Wi",
				   museumZipcode: "53703"
				  },
      		 	  {
					id:3,  
				    museumName:"Geology",
		            address: "303 Some Street",  
					museumCity:"Stoughton",
					museumState:"Wi",
				    museumZipcode: "53706"	  
				  }
    		  ]; 
		  */
		  $scope.initializeForm = function() {
			  
			  errorCallback = function(response) {
		           // var error = response.data.errors; // this is an array 
		          //  console.log(error); // see if we have any errors from php script
		            // also log status codes from server
		            console.log(response.status);
		            console.log(response.statusText);

		            // TODO: display error message to the user
		        }

		        successCallback = function(response) {
		            // success of call back could still mean that server side 
		            // error occurred
		            if(response.data.success == true) {
		                // we send back the newly created account to the front end
		                var arrMuseumObjects = response.data.museums;
		                var museumObject = arrMuseumObjects[0]; // just choose the first one for now
		                $scope.Museums = arrMuseumObjects;
		                $scope.myMuseums = museumObject;
		                $rootScope.museum = museumObject;
		            }
		            else {
		                // server did not return error, but something
		                // went wrong in the php code
		                errorCallback();
		            }
		        }
		        
		        var data = new Object();
		      $scope.ajaxGet(data, "getAllMuseums", successCallback, errorCallback);
 
		  } 
		  
          $scope.add = function() {

		      errorCallback = function(response) {
		           // var error = response.data.errors; // this is an array 
		          //  console.log(error); // see if we have any errors from php script
		            // also log status codes from server
		            console.log(response);

		            // TODO: display error message to the user
		        }

		        successCallback = function(response) {
		            // success of call back could still mean that server side 
		            // error occurred
		            if(response.data.success == true) {
		                // we send back the newly created account to the front end
		                var newMuseum = response.data.record;
		                $scope.Museums.push(newMuseum);
		            }
		            else {
		                // server did not return error, but something
		                // went wrong in the php code
		                errorCallback();
		            }
		        }
		        
		       var data = new Object();
              data.museumName      = $scope.myMuseums.museumName;
			  data.accountId = 1;
			  data.address   = $scope.Museum.address;

			  var profileJsonObject = Object();
			  profileJsonObject.zipcode = $scope.myMuseums.museumZipcode;
			  profileJsonObject.state = $scope.myMuseums.museumState;
			  profileJsonObject.city = $scope.myMuseums.museumCity;

			  data.museumProfileJSON = profileJsonObject;
			  $scope.ajaxPost(data, "museum/createMuseum", successCallback, errorCallback);
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
		  
		  $scope.change = function() {
			  $rootScope.museum = $scope.myMuseums;	
			};
		  
		 $scope.ajaxGet = 
     	function(data, route, successCallback, errorCallback) {
        var baseUrl = "";
        var fullRoute = $scope.baseUrl + route;
       	$http.get(fullRoute, data).then(successCallback, errorCallback);
    }

    $scope.ajaxPost = 
     	function(data, route, successCallback, errorCallback) {
        var baseUrl = "";
        var fullRoute = $scope.baseUrl + route;
       	$http.post(fullRoute, data).then(successCallback, errorCallback);
    }
      }]);
