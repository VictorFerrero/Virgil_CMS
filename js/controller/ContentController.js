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

       $scope.syncContent = function() {

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
              $rootScope.ajaxGet(data, "getEntireMuseum/" + $rootScope.currMuseum.id, successCallback, errorCallback);
        
            }
        else {
            // must select a museum in the Museum panel
            console.log("museum is null");
            $rootScope.currGallery = null;
            console.log($rootScope.currGallery);
          }
       }   
      }]);
