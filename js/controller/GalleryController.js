myApp.controller('GalleryController', ['$scope', '$rootScope', '$http',
      function($scope, $rootScope, $http) {
          $scope.baseUrl = "http://52.24.10.104/Virgil_Backend_Stage/Virgil_Backend/index.php/";
          $rootScope.currGallery;

          $scope.initializeGallery = function() {
			  $rootScope.currGallery = null;
		  }


		 /* $scope.Galleries = [
				  {
				   id:-1,
				   museumId: -1,
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
    		  */
		 $scope.tmpGalleries = [
				  {
				   id:-1,
				   museumId: -1,
				   galleryName:"",
				   galleryDescription: "",
				  
				  }
    		  ]; 

          $scope.addGallery = function() {
              
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
				                var gallery = response.data.record;
				                var profileJSON = angular.fromJson(gallery.galleryProfileJSON);
				                gallery.galleryDescription = profileJSON.description;
				                $scope.Galleries.push(gallery);
				            }
				            else {
				                // server did not return error, but something
				                // went wrong in the php code
				                errorCallback(response);
				            }
				        }
				       if($rootScope.currMuseum != null) { 
					       var data = new Object();
					       data.galleryName = $scope.Gallery.selectedGallery.galleryName;
					       data.museumId = $rootScope.currMuseum.id;
					       var profileJSONobject = Object();
					       profileJSONobject.description = $scope.Gallery.selectedGallery.galleryDescription;
					       data.galleryProfileJSON = angular.toJson(profileJSONobject);
					       console.log(data);
					      $rootScope.ajaxPost(data, "gallery/createGallery", successCallback, errorCallback);
		 			   }
		 			   else {
		 			   	console.log("museum is null");
		 			   }
          };
		  
		  $scope.deleteGallery = function() {
              
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
		                for(i = 0; i < $scope.Galleries.length; i++) {
		                	var gallery = $scope.Galleries[i];
		                	if(gallery.id == $rootScope.currGallery.id) {
		                		$scope.Galleries.splice(i,1);
		                		$rootScope.currGallery= null;
		                		break;
		                	}
		                }
		                $scope.Galleries = arrGalleries;
		            }
		            else {
		                // server did not return error, but something
		                // went wrong in the php code
		                errorCallback(response);
		            }
		        }
		        var data = Object();
		        data.id = $rootScope.currGallery.id;
		        $rootScope.ajaxPost(data, "gallery/deleteGallery", successCallback, errorCallback);
          };
		  
		  $scope.updateGallery = function() {
              
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
				                var gallery = response.data.record;
				                console.log("gallery:");
				                console.log(gallery);
				                var profileJSON = angular.fromJson(gallery.galleryProfileJSON);
				                gallery.galleryDescription = profileJSON.description;
				                for(i = 0; i < $scope.Galleries.length; i++) {
				                	var tmp = $scope.Galleries[i];
				                	if(tmp.id == gallery.id) {
				                		$scope.Galleries.splice(i,1);
				                		$scope.Galleries.splice(i,0,gallery);
		                				break;
				                	}
				                }
				                $rootScope.currGallery = gallery;
				                $scope.Gallery.selectedGallery = gallery;
				                // this should force the model in the drop down to update
				                $scope.Gallery.selectedGallery.galleryName.trim();
		               			$scope.Gallery.selectedGallery.galleryName = $scope.Gallery.selectedGallery.galleryName + " ";
				            }
				            else {
				                // server did not return error, but something
				                // went wrong in the php code
				                errorCallback(response);
				            }
				        }
				       if($rootScope.currMuseum != null) { 
					       var data = new Object();
					       data.galleryName = $scope.Gallery.selectedGallery.galleryName;
					       data.museumId = $rootScope.currMuseum.id;
					       data.id = $rootScope.currGallery.id;
					       var profileJSONobject = Object();
					       profileJSONobject.description = $scope.Gallery.selectedGallery.galleryDescription;
					       data.galleryProfileJSON = angular.toJson(profileJSONobject);
					       console.log(data);
					      $rootScope.ajaxPost(data, "gallery/updateGallery", successCallback, errorCallback);
		 			   }
		 			   else {
		 			   	console.log("museum is null");
		 			   }
          };
		  
		  $scope.fetchGallery = function() {
              $scope.message = "Welcome " + $scope.Gallery.galleryTitle;
          };
		  
		  $scope.onGallerySelectChange = function() {
			  $rootScope.currGallery = $scope.Gallery.selectedGallery;
			  console.log($rootScope.currGallery);
			  console.log($rootScope.currMuseum);
		  };
		  
		  $scope.syncGallery = function() {

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
				                var arrGalleryObjects = response.data.galleries;
				                for(i = 0; i < arrGalleryObjects.length; i++) {
				                	var gallery = arrGalleryObjects[i];
				                	var profileJSON = angular.fromJson(gallery.galleryProfileJSON);
				                	gallery.galleryDescription = profileJSON.description;
				                	//$scope.Galleries.push(gallery);
				                	arrGalleryObjects[i] = gallery;
				                }
				                $scope.Galleries = arrGalleryObjects;
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
		  };

		  $scope.addGalleryThumbnail = function() {

                  errorCallback = function(response) {
		           // var error = response.data.errors; // this is an array 
		          //  console.log(error); // see if we have any errors from php script
		            // also log status codes from server
		            console.log(response);
		            console.log(response.data);
		            // TODO: display error message to the user
		        }

		        successCallback = function(response) {
		            // success of call back could still mean that server side 
		            // error occurred
		            if(data.success == true) {
		                // we send back the newly created account to the front end
		                console.log("success");
		               	console.log(response);
		             }
		            else {
		                // server did not return error, but something
		                // went wrong in the php code
		                errorCallback(response);
		            }
		        }
			  	if(typeof $scope.galleryImage != 'undefined') {
			  		var data = new FormData();
					data.append("museumId", $rootScope.currMuseum.id);
					data.append("galleryId", "0");
					data.append("exhibitId", "0");
					data.append("description", "");
					data.append("hasImage", true);
					data.append("submit", "settt");
			  		var contentProfileJson = new Object();
				  	contentProfileJson.isMap = true;
				    data.append("contentProfileJSON", JSON.stringify(contentProfileJson));
					data.append('imageToUpload', $scope.galleryImage);
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
			  	console.log(data);
			  	console.log($scope.museumMap);
		  };
      }]);
