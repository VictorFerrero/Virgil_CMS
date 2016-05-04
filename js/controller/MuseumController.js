

myApp.controller('MuseumController', ['$scope', '$rootScope', '$http',  '$timeout',
      function($scope, $rootScope, $http, $timeout) {
      	//	$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      	//$http.defaults.headers.post['Content-Type'] = 'undefined';
      	  $rootScope.currMuseum;

		  $scope.baseUrl = "http://52.24.10.104/Virgil_Backend_Stage/Virgil_Backend/index.php/";
/*
			$scope.uploadMap = function(element) {
			  $scope.currentFile = element.files[0];
			   var reader = new FileReader();

			  reader.onload = function(event) {
			    $scope.image_source = event.target.result
			    $scope.$apply()

			  }
			  // when the file is read it triggers the onload event above.
			  reader.readAsDataURL(element.files[0]);
			  console.log(reader);
			  console.log($scope.currentFile);
			  console.log($scope.image_source);
			};

*/

		 /* $scope.Museums = [
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
		              //  $rootScope.currMuseum = museumObject;
		            }
		            else {
		                // server did not return error, but something
		                // went wrong in the php code
		                errorCallback(response);
		            }
		        }
		        
		        var data = new Object();
		        $rootScope.currMuseum = null;
		      $rootScope.ajaxGet(data, "getAllMuseumsForCms", successCallback, errorCallback);
 
		  } 
		  
          $scope.addMuseum = function() {

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
              data.museumName      = $scope.Museum.myMuseums.museumName;
			  data.accountId = 1;
			  data.address   = $scope.Museum.myMuseums.address;

			  var profileJsonObject = Object();
			  profileJsonObject.zipcode = $scope.Museum.myMuseums.museumZipcode;
			  profileJsonObject.state = $scope.Museum.myMuseums.museumState;
			  profileJsonObject.city = $scope.Museum.myMuseums.museumCity;

			  // get time 
			 // get time 
			  var strMon = $scope.Museum.myMuseums.museumMondayHoursOpen + 
			  				"-" + $scope.Museum.myMuseums.museumMondayHoursClose;
			  var strTue = $scope.Museum.myMuseums.museumTuesdayHoursOpen + 
			  				"-" + $scope.Museum.myMuseums.museumTuesdayHoursClose;
			  var strWed = $scope.Museum.myMuseums.museumWednesdayHoursOpen + 
			  				"-" + $scope.Museum.myMuseums.museumWednesdayHoursClose;
			  var strThur = $scope.Museum.myMuseums.museumThursdayHoursOpen + 
			  				"-" + $scope.Museum.myMuseums.museumThursdayHoursClose;
			  var strFri = $scope.Museum.myMuseums.museumFridayHoursOpen + 
			  				"-" + $scope.Museum.myMuseums.museumFridayHoursClose;
			  var strSat = $scope.Museum.myMuseums.museumSaturdayHoursOpen + 
			  				"-" + $scope.Museum.myMuseums.museumSaturdayHoursClose;
			  var strSun = $scope.Museum.myMuseums.museumSundayHoursOpen + 
			  				"-" + $scope.Museum.myMuseums.museumSundayHoursClose;

			  profileJsonObject.mon = strMon;
			  profileJsonObject.tue = strTue;
			  profileJsonObject.wed = strWed;
			  profileJsonObject.thur = strThur;
			  profileJsonObject.fri = strFri;
			  profileJsonObject.sat = strSat;
			  profileJsonObject.sun = strSun;

			  data.museumProfileJSON = angular.toJson(profileJsonObject);

			 console.log(data);
			// console.log($scope.formdata);
			  console.log($rootScope.currMuseum);
			  console.log($scope.Museum.myMuseums.museumMap);
			  $rootScope.ajaxPost(data, "museum/createMuseum", successCallback, errorCallback);
			 //console.log($scope.my_image_model);
          };

          $scope.addContent = function() {

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
		            if(response.data.success == true) {
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

		        var data = Object();
		        data.museumId = $rootScope.currMuseum.id;
		        data.galleryId = "0";
		        data.exhibitId = "0";
		        data.description = "";
		        data.imageToUpload = $scope.museumMap;
		        data.hasImage = true;
			  	data.submit = "settt";

			  	var contentProfileJson = Object();
			  	contentProfileJson.isMap = true;

			  	data.contentProfileJSON = contentProfileJson;
			  	console.log(data);
			  	$rootScope.ajaxPost(data, "content/createContent", successCallback, errorCallback);
          };
		  
		  $scope.updateMuseum = function() {
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
		            if(response.data.success == true) {
		                // we send back the newly created account to the front end
		                var updateMuseum = response.data.record;
		                console.log(updateMuseum);
		                for(i = 0; i < $scope.Museums.length; i++) {
		                	var obj = $scope.Museums[i];
		                	if(obj.id == updateMuseum.id) {
		                		console.log("Museums before");
		                		console.log($scope.Museums);
			                		$scope.Museums.splice(i,1);
			                		$scope.Museums.splice(i,0,updateMuseum);
		                		console.log($scope.Museums);
		                		break;
		                	}
		                }
		                $scope.Museums.myMuseums = updateMuseum;
		                console.log($scope.Museums.myMuseums);
		                $rootScope.currMuseum = updateMuseum;
		                // this will force the model to update
		                $scope.Museums.myMuseums.museumName.trim();
		                $scope.Museums.myMuseums.museumName = $scope.Museums.myMuseums.museumName + " ";
		               }
		            else {
		                // server did not return error, but something
		                // went wrong in the php code
		                errorCallback(response);
		            }
		        }
		        
			  // TODO: add logic to only send forms to the server that have been changed 
		       var data = new Object();
			   data.id = $rootScope.currMuseum.id; // ALWAYS get the id for update
		  //     if($rootScope.currMuseum.museumName != $scope.Museum.myMuseums.museumName){
              		data.museumName      = $scope.Museum.myMuseums.museumName;
         // 	   }
		//	  data.accountId = 1;
		//	   if($rootScope.currMuseum.address != $scope.Museum.myMuseums.address)	{
			   		data.address   = $scope.Museum.myMuseums.address;
		//	  }
			  // must always grab everything that will go in profileJSON
			  var profileJsonObject = Object();
			  profileJsonObject.zipcode = $scope.Museum.myMuseums.museumZipcode;
			  profileJsonObject.state = $scope.Museum.myMuseums.museumState;
			  profileJsonObject.city = $scope.Museum.myMuseums.museumCity;

			  // get time 
			  var strMon = $scope.Museum.myMuseums.museumMondayHoursOpen + 
			  				"-" + $scope.Museum.myMuseums.museumMondayHoursClose;
			  var strTue = $scope.Museum.myMuseums.museumTuesdayHoursOpen + 
			  				"-" + $scope.Museum.myMuseums.museumTuesdayHoursClose;
			  var strWed = $scope.Museum.myMuseums.museumWednesdayHoursOpen + 
			  				"-" + $scope.Museum.myMuseums.museumWednesdayHoursClose;
			  var strThur = $scope.Museum.myMuseums.museumThursdayHoursOpen + 
			  				"-" + $scope.Museum.myMuseums.museumThursdayHoursClose;
			  var strFri = $scope.Museum.myMuseums.museumFridayHoursOpen + 
			  				"-" + $scope.Museum.myMuseums.museumFridayHoursClose;
			  var strSat = $scope.Museum.myMuseums.museumSaturdayHoursOpen + 
			  				"-" + $scope.Museum.myMuseums.museumSaturdayHoursClose;
			  var strSun = $scope.Museum.myMuseums.museumSundayHoursOpen + 
			  				"-" + $scope.Museum.myMuseums.museumSundayHoursClose;
			
			  profileJsonObject.mon = strMon;
			  profileJsonObject.tue = strTue;
			  profileJsonObject.wed = strWed;
			  profileJsonObject.thur = strThur;
			  profileJsonObject.fri = strFri;
			  profileJsonObject.sat = strSat;
			  profileJsonObject.sun = strSun;

			  data.museumProfileJSON = angular.toJson(profileJsonObject);

			//  console.log(data);
			  $rootScope.ajaxPost(data, "museum/updateMuseum", successCallback, errorCallback);
          };
		  
		  $scope.deleteMuseum = function() {
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
		                for(i = 0; i < $scope.Museums.length; i++) {
		                	var museum = $scope.Museums[i];
		                	if(museum.id == $rootScope.currMuseum.id) {
		                		$scope.Museums.splice(i,1);
		                		$rootScope.currMuseum = null;
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
		        data.id = $rootScope.currMuseum.id;
		        $rootScope.ajaxPost(data, "museum/deleteMuseum", successCallback, errorCallback);
          };
		  
		  $scope.fetch = function() {
              $scope.message = "Welcome " + $scope.Museum.museumName;
          };
		  
		  // keep our $rootScope.currMuseum variable up to date
		  $scope.onMuseumSelectChange = function() {
			
			  $rootScope.currMuseum = $scope.Museum.myMuseums;	
			  console.log($rootScope.currMuseum);
			};
		  
		 $rootScope.ajaxGet = function(data, route, successCallback, errorCallback) {
        var baseUrl = "";
        var fullRoute = $scope.baseUrl + route;
       	$http.get(fullRoute, data).then(successCallback, errorCallback);
    	};



    $rootScope.ajaxPost = function(data, route, successCallback, errorCallback) {
        var baseUrl = "";
        var fullRoute = $scope.baseUrl + route;
       	$http.post(fullRoute, data, { transformRequest: angular.identity, headers: {'Content-Type':undefined} }).then(successCallback, errorCallback);
    	};

    	$scope.formatAMPM = function(date) {
		  var hours = date.getHours();
		  var minutes = date.getMinutes();
		  var ampm = hours >= 12 ? 'PM' : 'AM';
		  hours = hours % 12;
		  hours = hours ? hours : 12; // the hour '0' should be '12'
		  minutes = minutes < 10 ? '0'+minutes : minutes;
		  var strTime = hours + ':' + minutes + ' ' + ampm;
		  return strTime;
		};
	}]);
