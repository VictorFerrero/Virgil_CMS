myApp.controller('EventController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
          $scope.baseUrl = "http://52.24.10.104/Virgil_Backend_Stage/Virgil_Backend/index.php/";

          $scope.addEvent = function() {
                    
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
                          console.log(newMuseum);
                          $scope.Museums.push(newMuseum);
                      }
                      else {
                          // server did not return error, but something
                          // went wrong in the php code
                          errorCallback(response);
                      }
                  }
                  
              var data = new Object();
              data.startTime = $scope.Museum.myMuseums.museumName;
              data.endTime = 1;
              data.description = $scope.Museum.myMuseums.address;
              data.museumId = $rootScope.currMuseum.id;
              data.galleryId = "0";
              data.exhibitId = "0";

              var profileJsonObject = Object();

              data.eventProfileJSON = angular.toJson(profileJsonObject);

             console.log(data);
            // console.log($scope.formdata);
              $rootScope.ajaxPost(data, "events/createEvent", successCallback, errorCallback);
             //console.log($scope.my_image_model);
          };
		  
          $scope.update = function() {
              $scope.message = "Welcome " + $scope.Event.eventTitle;
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
                    var id = response.data.id; // get the id of the musuem we deleted
                    for(i = 0; i < $scope.Events.length; i++) {
                      var event = $scope.Events[i];
                      if(event.id == $rootScope.currEvent.id) {
                        $scope.Events.splice(i,1);
                        $rootScope.currEvent = null;
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
            data.id = $rootScope.currEvent.id;
            $rootScope.ajaxPost(data, "events/deleteEvent", successCallback, errorCallback);
          };
		  
          $scope.fetch = function() {
              $scope.message = "Welcome " + $scope.Event.eventTitle;
          };

          $scope.syncEvents = function() {

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
                            $scope.Events = response.data.events;
                        }
                        else {
                            // server did not return error, but something
                            // went wrong in the php code
                            errorCallback(response);
                        }
                    }
                    
                   var data = new Object();
                   var route = $scope.baseUrl + "getEntireMuseum/" + $rootScope.currMuseum.id;
                  $rootScope.ajaxGet(data, route, successCallback, errorCallback);
            
                }
            else {
                // must select a museum in the Museum panel
                console.log("museum is null");
                $rootScope.currGallery = null;
                console.log($rootScope.currGallery);
              }
      };

          $scope.onEventSelectChange = function() {
            $rootScope.currEvent = $scope.Event;
            console.log($rootScope.currEvent);
          };
      }]);
