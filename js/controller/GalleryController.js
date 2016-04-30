myApp.controller('GalleryController', ['$scope', '$rootScope', '$http',
      function($scope, $rootScope, $http) {
          
		  $scope.Galleries = [
				  {
				   id:-1,
				   galleryName:"",
				   galleryDescription: "",
				  
				  },
				  {
				   id:1,
				   galleryName:"Yonce",
				   galleryDescription: "Boss Bitch",
				  },
      		 	  {
				   id:2, 	  
				   galleryName:"Cretaceous Period",
				   galleryDescription: "I think the T-Rex is actually from this period",
				  },
      		 	  {
					id:3,  
				   galleryName:"Malcolm X",
				   galleryDescription: "By any means necessary.",
				  }
    		  ]; 
		 
    		  $scope.currGallery = null;

          $scope.addGallery = function() {
              $scope.message = "Welcome " + $scope.Gallery.galleryTitle;
          };
		  
		  $scope.deleteGallery = function() {
              $scope.message = "Welcome " + $scope.Gallery.galleryTitle;
          };
		  
		  $scope.updateGallery = function() {
              $scope.message = "Welcome " + $scope.Gallery.galleryTitle;
          };
		  
		  $scope.fetchGallery = function() {
              $scope.message = "Welcome " + $scope.Gallery.galleryTitle;
          };
		  
		  $scope.onGallerySelectChange = function() {
					  
			  $scope.currGallery = $scope.Gallery.selectedGallery;
			  console.log($scope.currGallery);
			  console.log($rootScope.museum);
		  };
		  
		  $scope.initializeGallery = function() {
			  
		  		if($rootScope.museum != null) {

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
				                var arrGalleryObjects = response.data.galleries;
				                for(i = 0; i < arrGalleryObjects.length; i++) {
				                	var gallery = arrGalleryObjects[i];
				                	var profileJSON = angular.fromJson(gallery.galleryProfileJSON);
				                	gallery.galleryDescription = profileJSON.description;
				                	$scope.Galleries.push(gallery);
				                }
				            }
				            else {
				                // server did not return error, but something
				                // went wrong in the php code
				                errorCallback(response);
				            }
				        }
				        
				       var data = new Object();
				      $scope.ajaxGet(data, "getEntireMuseum/" + $rootScope.museum.id, successCallback, errorCallback);
		 
		  		}
		  		else {
		  			// must select a museum in the Museum panel
		  			console.log("museum is null");
		  		}
		  }

		$scope.ajaxGet = function(data, route, successCallback, errorCallback) {
        var baseUrl = "";
        var fullRoute = $scope.baseUrl + route;
       	$http.get(fullRoute, data).then(successCallback, errorCallback);
    	};



    $scope.ajaxPost = function(data, route, successCallback, errorCallback) {
        var baseUrl = "";
        var fullRoute = $scope.baseUrl + route;
       	$http.post(fullRoute, data).then(successCallback, errorCallback);
    	};


      }]);
