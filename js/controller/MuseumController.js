myApp.controller('MuseumController', ['$scope', '$rootScope', '$http',
      function($scope, $rootScope, $http) {
      	//	$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

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
		              //  $rootScope.museum = museumObject;
		            }
		            else {
		                // server did not return error, but something
		                // went wrong in the php code
		                errorCallback(response);
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
		                errorCallback(response);
		            }
		        }
		        
		       var data = new Object();
              data.museumName      = $scope.Museum.myMuseums.museumName;
			  data.accountId = 1;
			  data.address   = $scope.Museum.myMuseums.address;

			  var profileJsonObject = Object();
			  profileJsonObject.zipcode = $scope.Museum.myMuseums.museumZipcode;
			  profileJsonObject.state = $scope.Museum.myMuseums.museumState;
			  profileJsonObject.city = $scope.Museum.myMuseums.museumCity;

			  data.museumProfileJSON = angular.toJson(profileJsonObject);
			//  console.log(data);
			  $scope.ajaxPost(data, "museum/createMuseum", successCallback, errorCallback);
          };
		  
		  $scope.update = function() {
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
		                var updateMuseum = response.data.record;
		                var arr = $scope.Museums;
		                for(i = 0; i < arr.length; i++) {
		                	var obj = arr[i];
		                	if(obj.id == updateMuseum.id) {
		                		arr[i] = updateMuseum;
		                		break;
		                	}
		                }
		                $scope.Museums = arr;		            }
		            else {
		                // server did not return error, but something
		                // went wrong in the php code
		                errorCallback(response);
		            }
		        }
		        
		       var data = new Object();
              data.museumName      = $scope.Museum.myMuseums.museumName;
		//	  data.accountId = 1;
			  data.address   = $scope.Museum.myMuseums.address;
			  data.id = $scope.Museum.myMuseums.id;
			  var profileJsonObject = Object();
			  profileJsonObject.zipcode = $scope.Museum.myMuseums.museumZipcode;
			  profileJsonObject.state = $scope.Museum.myMuseums.museumState;
			  profileJsonObject.city = $scope.Museum.myMuseums.museumCity;

			  data.museumProfileJSON = angular.toJson(profileJsonObject);
			//  console.log(data);
			  $scope.ajaxPost(data, "museum/updateMuseum", successCallback, errorCallback);
          };
		  
		  $scope.delete = function() {
              $scope.message = "Welcome " + $scope.Museum.museumName;
          };
		  
		  $scope.fetch = function() {
              $scope.message = "Welcome " + $scope.Museum.museumName;
          };
		  
		  $scope.addHours = function() {
			  
		  }; 
		  
		  $scope.onMuseumSelectChange = function() {
			  $rootScope.museum = $scope.Museum.myMuseums;	
			  console.log($rootScope.museum);
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
