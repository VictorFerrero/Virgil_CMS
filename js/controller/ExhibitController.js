myApp.controller('ExhibitController', ['$scope', '$rootScope', '$http',
      function($scope, $rootScope, $http) {
          $scope.baseUrl = "http://52.24.10.104/Virgil_Backend_Stage/Virgil_Backend/index.php/";
        $rootScope.currExhibit;  
        $scope.allExhibits = null;
/*
        $scope.Exhibits = [
          {
           id:-1,
           museumId: -1,
           exhibitTitle:"",
           exhibitDescription: "",
          
          },
          {
           id:1,
           exhibitTitle:"Yonce",
           exhibitDescription: "Boss Bitch",
          },
              {
           id:2,    
           exhibitTitle:"Cretaceous Period",
           exhibitDescription: "I think the T-Rex is actually from this period",
          },
              {
          id:3,  
           exhibitTitle:"Malcolm X",
           exhibitDescription: "By any means necessary.",
          }
          ]; 
*/
$scope.tmpExhibits = [
          {
           id:-1,
           museumId: -1,
           exhibitTitle:"",
           exhibitDescription: "",
          
          }
          ]; 

          $scope.add = function() {
              $scope.message = "Welcome " + $scope.Exhibit.exhibitTitle;
          };
		  
		  $scope.update = function() {
              $scope.message = "Welcome " + $scope.Exhibit.exhibitTitle;
          };
		  
		  $scope.delete = function() {
              $scope.message = "Welcome " + $scope.Exhibit.exhibitTitle;
          };
		  
		  $scope.fetch = function() {
              $scope.message = "Welcome " + $scope.Exhibit.exhibitTitle;
          };

          $scope.sync = function() {
            // grab exhibits based on museum and gallery
            
      if($rootScope.currMuseum != null && $scope.allExhibits == null) {
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
                        $scope.allExhibits = arrExhibitObjects;
                        $scope.Exhibits = exhibitsInThisGallery;
                    }
                    else {
                        // server did not return error, but something
                        // went wrong in the php code
                        errorCallback(response);
                    }
                }

                   var data = new Object();
                    $scope.ajaxGet(data, "getEntireMuseum/" + $rootScope.currMuseum.id, successCallback, errorCallback); 
                } 
                else if($scope.allExhibits != null) {
                  // just update without making server call
                   var arrExhibitObjects = $scope.allExhibits;
                        var exhibitsInThisGallery = [];
                        for(i = 0; i < arrExhibitObjects.length; i++) {
                          var exhibit = arrExhibitObjects[i];
                          var profileJSON = angular.fromJson(exhibit.exhibitProfileJSON);
                          exhibit.exhibitDescription = profileJSON.description;
                          //$scope.Galleries.push(gallery);
                          arrExhibitObjects[i] = exhibit;
                          // only add the exhibits that correspond to the selected gallery AND museum
                          if(exhibit.galleryId == $rootScope.currGallery.id && exhibit.museumId == $rootScope.currMuseum.id) {
                            exhibitsInThisGallery.push(exhibit);
                          }
                        }
                        $scope.Exhibits = exhibitsInThisGallery;
                }
        else {
            // must select a museum in the Museum panel
            console.log("museum is null");
            $scope.Exhibit = $scope.tmpExhibits[0];
            console.log($rootScope.currExhibit);
          }
          }
       $scope.onExhibitSelectChange = function() {
          $scope.currExhibit = $scope.Exhibit;
          console.log($scope.currExhibit);
       }   
      }]);
