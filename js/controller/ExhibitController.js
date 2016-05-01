myApp.controller('ExhibitController', ['$scope', '$rootScope', '$http',
      function($scope, $rootScope, $http) {
        $scope.baseUrl = "http://52.24.10.104/Virgil_Backend_Stage/Virgil_Backend/index.php/";
        $rootScope.currExhibit;  

        $scope.initialize = function(){
          $scope.Exhibits = [];
          $rootScope.currExhibit = null;
        }
/*
        $scope.Exhibits = [
          {
           id:-1,
           museumId: -1,
           exhibitName:"",
           exhibitDescription: "",
          
          },
          {
           id:1,
           exhibitName:"Yonce",
           exhibitDescription: "Boss Bitch",
          },
              {
           id:2,    
           exhibitName:"Cretaceous Period",
           exhibitDescription: "I think the T-Rex is actually from this period",
          },
              {
          id:3,  
           exhibitName:"Malcolm X",
           exhibitDescription: "By any means necessary.",
          }
          ]; 
*/
$scope.tmpExhibits = [
          {
           id:-1,
           museumId: -1,
           exhibitName:"",
           exhibitDescription: "",
          
          }
          ]; 

          $scope.addExhibit = function() {
              
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
                        var exhibit = response.data.record;
                        var profileJSON = angular.fromJson(exhibit.exhibitProfileJSON);
                        exhibit.exhibitDescription = profileJSON.description;
                        $scope.Exhibits.push(exhibit);
                    }
                    else {
                        // server did not return error, but something
                        // went wrong in the php code
                        errorCallback(response);
                    }
                }
               if($rootScope.currMuseum != null && $rootScope.currGallery != null) { 
                    if($rootScope.currMuseum.id > 0 && $rootScope.currGallery.id > 0) {
                     var data = new Object();
                     data.museumId = $rootScope.currMuseum.id;
                     data.galleryId = $rootScope.currGallery.id;
                     data.exhibitName = $scope.Exhibit.exhibitName;
                     var profileJSONobject = Object();
                     profileJSONobject.description = $scope.Exhibit.exhibitDescription;
                     data.exhibitProfileJSON = angular.toJson(profileJSONobject);
                     console.log(data);
                    $rootScope.ajaxPost(data, "exhibit/createExhibit", successCallback, errorCallback);
                  }
             }
             else {
              console.log("museum is null");
             }
          };
		  
		  $scope.updateExhibit = function() {
              
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
                        var exhibit = response.data.record;
                        console.log(exhibit);
                        var profileJSON = angular.fromJson(exhibit.exhibitProfileJSON);
                        exhibit.exhibitDescription = profileJSON.description;
                        for(i = 0; i < $scope.Exhibits.length; i++) {
                          var tmp = $scope.Exhibits[i];
                          if(tmp.id == exhibit.id) {
                            $scope.Exhibits.splice(i,1);
                            $scope.Exhibits.splice(i,0,exhibit);
                            break;
                          }
                        }
                        $rootScope.currExhibit = exhibit;
                        $scope.Exhibit.exhibitName.trim();
                        $scope.Exhibit.exhibitName = $scope.Exhibit.exhibitName + " ";
                    }
                    else {
                        // server did not return error, but something
                        // went wrong in the php code
                        errorCallback(response);
                    }
                }
               if($rootScope.currMuseum != null && $rootScope.currGallery != null) { 
                    if($rootScope.currMuseum.id > 0 && $rootScope.currGallery.id > 0) {
                     var data = new Object();
                     data.id = $rootScope.currExhibit.id; // id of this record for updating
                     data.museumId = $rootScope.currMuseum.id;
                     data.galleryId = $rootScope.currGallery.id;
                     data.exhibitName = $scope.Exhibit.exhibitName;
                     var profileJSONobject = Object();
                     profileJSONobject.description = $scope.Exhibit.exhibitDescription;
                     data.exhibitProfileJSON = angular.toJson(profileJSONobject);
                     console.log(data);
                    $rootScope.ajaxPost(data, "exhibit/updateExhibit", successCallback, errorCallback);
                  }
             }
             else {
              console.log("museum is null");
             }
          };
		  
		  $scope.deleteExhibit = function() {
             
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
                    for(i = 0; i < $scope.Exhibits.length; i++) {
                      var exhibit = $scope.Exhibits[i];
                      if(exhibit.id == $rootScope.currExhibit.id) {
                        $scope.Exhibits.splice(i,1);
                        $rootScope.currExhibit= null;
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
            data.id = $rootScope.currExhibit.id;
            $rootScope.ajaxPost(data, "exhibit/deleteExhibit", successCallback, errorCallback);
          };
		  
		  $scope.fetch = function() {
              $scope.message = "Welcome " + $scope.Exhibit.exhibitTitle;
          };

          $scope.syncExhibit = function() {
            // grab exhibits based on museum and gallery 
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
                        var arrExhibitObjects = response.data.exhibits;
                        var exhibitsInThisGallery = [];
                        for(i = 0; i < arrExhibitObjects.length; i++) {
                          var exhibit = arrExhibitObjects[i];
                          var profileJSON = angular.fromJson(exhibit.exhibitProfileJSON);
                          exhibit.exhibitDescription = profileJSON.description;
                          arrExhibitObjects[i] = exhibit;
                          // only add the exhibits that correspond to the selected gallery AND museum
                          if($rootScope.currGallery != null) {
                            if(exhibit.galleryId == $rootScope.currGallery.id && exhibit.museumId == $rootScope.currMuseum.id) {
                              exhibitsInThisGallery.push(exhibit);
                            }
                          }
                        }
                        $scope.Exhibits = exhibitsInThisGallery;
                    }
                    else {
                        // server did not return error, but something
                        // went wrong in the php code
                        errorCallback(response);
                    }
                }
      if($rootScope.currMuseum != null && $rootScope.currGallery != null) {
          // need to make network call
                   var data = new Object();
                    $rootScope.ajaxGet(data, "getEntireMuseum/" + $rootScope.currMuseum.id, successCallback, errorCallback); 
                } 
        else {
            // must select a museum in the Museum panel
            console.log("museum is null");
          //  $scope.Exhibit = $scope.tmpExhibits[0];
            $rootScope.currExhibit = null;
            console.log($rootScope.currExhibit);
          }
        };
       $scope.onExhibitSelectChange = function() {
          $rootScope.currExhibit = $scope.Exhibit;
          console.log($rootScope.currExhibit);
       };

      }]);
