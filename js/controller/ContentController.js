myApp.controller('ContentController', ['$scope', '$rootScope', '$http',
      function($scope, $rootScope, $http) {
          $scope.baseUrl = "http://52.24.10.104/Virgil_Backend_Stage/Virgil_Backend/index.php/";

          $scope.addContent = function() {
                      
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
                        if(response.success == true) {
                            // we send back the newly created account to the front end
                            console.log("success");
                            console.log(response);
                            var newContent = response.record;
                            $scope.ContentObjects.push(newContent);
                         }
                        else {
                            // server did not return error, but something
                            // went wrong in the php code
                            errorCallback(response);
                        }
                    }

                  if(typeof $scope.contentImage != 'undefined') {
                    var data = new FormData();
                    data.append("museumId", $rootScope.currMuseum.id);
                    data.append("galleryId", $rootScope.currGallery.id);
                    data.append("exhibitId", $rootScope.currExhibit.id);
                    data.append("description", $scope.selectedContent.description);
                    data.append("hasImage", true);
                    data.append("submit", "settt");
                    data.append("contentProfileJSON", "{}");
                    data.append('imageToUpload', $scope.contentImage);
                    var contentProfileJson = new Object();
                    data.append("contentProfileJSON", JSON.stringify(contentProfileJson));
                    console.log(data);
                  $http.post($scope.baseUrl + "content/createContent", data, {
                          transformRequest: angular.identity,
                          headers: {'Content-Type': undefined}
                      })
                      .success(function(response){
                        var responseInJSON = angular.fromJson(response);
                        successCallback(responseInJSON)
                      })
                      .error(function(response){
                        var responseInJSON = angular.fromJson(response);
                        errorCallback(responseInJSON);
                      });
                }
                else  { // this is the case where we are not uploading an image
                  var data = new FormData();
                  data.append("museumId", $rootScope.currMuseum.id);
                  data.append("galleryId", $rootScope.currGallery.id);
                  data.append("exhibitId", $rootScope.currExhibit.id);
                  data.append("description", $scope.selectedContent.description);
                  data.append("hasImage", false);
               //   data.append("submit", "settt");
                  data.append("contentProfileJSON", "{}");
               //   data.append('imageToUpload', $scope.contentImage);
                  console.log(data);
                  $http.post($scope.baseUrl + "content/createContent", data, {
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
          };
		  
		  $scope.update = function() {
              $scope.message = "Welcome " + $scope.Content.contentTitle;
          };
		  
		  $scope.deleteContent = function() {
			  
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
                    for(i = 0; i < $scope.ContentObjects.length; i++) {
                      var content = $scope.ContentObjects[i];
                      if(content.id == id) {
                        $scope.ContentObjects.splice(i,1);
                        $rootScope.currContent = null;
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
            data.id = $rootScope.currContent.id;
            $rootScope.ajaxPost(data, "content/deleteContent", successCallback, errorCallback);
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
                        console.log(response.data);
                        $scope.ContentObjects = response.data.content;
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
            $rootScope.currContent = null;
            console.log($rootScope.currGallery);
          }
       };
       $scope.onContentObjectSelectChange = function() {
        $rootScope.currContent = $scope.selectContent;
        console.log($rootScope.currContent);
       }
      }]);
