myApp.controller('BeaconController', ['$scope',
      function($scope) {
          
          $scope.addBeaconContent = function() {
              
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
				                console.log(response.data);
				                var beaconContent = response.data.record;
				                $scope.Beacons.push(beaconContent);
				            }
				            else {
				                // server did not return error, but something
				                // went wrong in the php code
				                errorCallback(response);
				            }
				        }
				       if($rootScope.currMuseum != null) { 
					       var data = new FormObject();
					       data.append("major",$rootScope.currMuseum.id);
					       data.append("minor",$scope.Beacon.minor);
					       data.append("title", $scope.Beacon.beaconContentTitle);
					       data.append("description", $scope.Beacon.beaconContentDescription);
					       data.append("imageToUpload", $scope.Beacon.beaconImage);
					       console.log(data);
					      $http.post($scope.baseUrl + "beacons/addContentForBeacon", data, {
					            transformRequest: angular.identity,
					            headers: {'Content-Type': undefined}
					        })
					        .success(function(response){
					        	successCallback(response)
					        })
					        .error(function(response){
					        	errorCallback(response);
					        });
		 			   }
		 			   else {
		 			   	console.log("museum is null");
		 			   }
          };
		  
		  $scope.update = function() {
              $scope.message = "Welcome " + $scope.Beacon.beaconContentTitle;
          };
		  
		  $scope.delete = function() {
			  
               errorCallback = function(response) {
		           // var error = response.data.errors; // this is an array 
		          //  console.log(error); // see if we have any errors from php script
		            // also log status codes from server
		            console.log(response);
		            console.log(response.data);
		        }

		        successCallback = function(response) {
		            // success of call back could still mean that server side 
		            // error occurred
		            if(response.data.success == true) {
		                // we send back the newly created account to the front end
		                var id = response.data.id; // get the id of the beacon we deleted
		                for(i = 0; i < $scope.Beacons.length; i++) {
		                	var beaconContent = $scope.Beacons[i];
		                	if(museum.id == $rootScope.currMuseum.id) {
		                		$scope.Beacon.splice(i,1);
		                		$rootScope.currBeacon = null;
		                		break;
		                	}
		                }
		            }
		            else {
		                // server did not return error, but something
		                // went wrong in the php code
		                errorCallback(response);
		            }
		        }
		        var data = Object();
		        data.id = $rootScope.currBeacon.id;
		        $rootScope.ajaxPost(data, "beacons/deleteContentForBeacon", successCallback, errorCallback);
		  };
		  
		  $scope.fetch = function() {
              $scope.message = "Welcome " + $scope.Beacon.beaconContentTitle;
          }; 

          $scope.onBeaconSelectChange = function(){
          	$rootScope.currBeacon = $scope.Beacon.selectedBeacon;
          }

          $scope.syncBeacons = function() {

		if($rootScope.currMuseum != null) {
					// need to make network call 
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
				                console.log(response.data);
				                $scope.Beacons = response.data.beaconContent;
				            }
				            else {
				                // server did not return error, but something
				                // went wrong in the php code
				                errorCallback(response);
				            }
				        }
				        
				       var data = new Object();
				      $rootScope.ajaxGet(data, "beacons/getBeaconsForMuseum/" + $rootScope.currMuseum.id, successCallback, errorCallback);
		 		
		  			}
				else {
		  			// must select a museum in the Museum panel
		  			console.log("museum is null");
		  			$rootScope.currGallery = null;
		  			console.log($rootScope.currGallery);
		  		}
          }

      }]);
