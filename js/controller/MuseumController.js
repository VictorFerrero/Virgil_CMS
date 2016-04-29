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
			  var strMon = $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumMondayHoursOpen)) + 
			  				"-" + $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumMondayHoursClose));
			  var strTue = $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumTuesdayHoursOpen)) + 
			  				"-" + $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumTuesdayHoursClose));
			  var strWed = $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumWednesdayHoursOpen)) + 
			  				"-" + $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumWednesdayHoursClose));
			  var strThur = $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumThursdayHoursOpen)) + 
			  				"-" + $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumThursdayHoursClose));
			  var strFri = $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumFridayHoursOpen)) + 
			  				"-" + $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumFridayHoursClose));
			  var strSat = $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumSaturdayHoursOpen)) + 
			  				"-" + $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumSaturdayHoursClose));
			  var strSun = $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumSundayHoursOpen)) + 
			  				"-" + $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumSundayHoursClose));
			
			  profileJsonObject.mon = strMon;
			  profileJsonObject.tue = strTue;
			  profileJsonObject.wed = strWed;
			  profileJsonObject.thur = strThur;
			  profileJsonObject.fri = strFri;
			  profileJsonObject.sat = strSat;
			  profileJsonObject.sun = strSun;

			  data.museumProfileJSON = angular.toJson(profileJsonObject);
			//  console.log(data);
			//  console.log($rootScope.museum);
			  $scope.ajaxPost(data, "museum/createMuseum", successCallback, errorCallback);
          };
		  
		  $scope.update = function() {
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
		                var arr = $scope.Museums;
		                for(i = 0; i < arr.length; i++) {
		                	var obj = arr[i];
		                	if(obj.id == updateMuseum.id) {
		                		arr[i] = updateMuseum;
		                		$scope.Museum.myMuseums = updateMuseum;
		                		break;
		                	}
		                }
		                $scope.Museums = arr;	
		               }
		            else {
		                // server did not return error, but something
		                // went wrong in the php code
		                errorCallback(response);
		            }
		        }
		        
			  // TODO: add logic to only send forms to the server that have been changed 
		       var data = new Object();
			   data.id = $rootScope.museum.id; // ALWAYS get the id for update
		  //     if($rootScope.museum.museumName != $scope.Museum.myMuseums.museumName){
              		data.museumName      = $scope.Museum.myMuseums.museumName;
         // 	   }
		//	  data.accountId = 1;
		//	   if($rootScope.museum.address != $scope.Museum.myMuseums.address)	{
			   		data.address   = $scope.Museum.myMuseums.address;
		//	  }
			  // must always grab everything that will go in profileJSON
			  var profileJsonObject = Object();
			  profileJsonObject.zipcode = $scope.Museum.myMuseums.museumZipcode;
			  profileJsonObject.state = $scope.Museum.myMuseums.museumState;
			  profileJsonObject.city = $scope.Museum.myMuseums.museumCity;

			  // get time 
			  var strMon = $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumMondayHoursOpen)) + 
			  				"-" + $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumMondayHoursClose));
			  var strTue = $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumTuesdayHoursOpen)) + 
			  				"-" + $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumTuesdayHoursClose));
			  var strWed = $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumWednesdayHoursOpen)) + 
			  				"-" + $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumWednesdayHoursClose));
			  var strThur = $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumThursdayHoursOpen)) + 
			  				"-" + $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumThursdayHoursClose));
			  var strFri = $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumFridayHoursOpen)) + 
			  				"-" + $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumFridayHoursClose));
			  var strSat = $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumSaturdayHoursOpen)) + 
			  				"-" + $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumSaturdayHoursClose));
			  var strSun = $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumSundayHoursOpen)) + 
			  				"-" + $scope.formatAMPM(new Date($scope.Museum.myMuseums.museumSundayHoursClose));
			
			  profileJsonObject.mon = strMon;
			  profileJsonObject.tue = strTue;
			  profileJsonObject.wed = strWed;
			  profileJsonObject.thur = strThur;
			  profileJsonObject.fri = strFri;
			  profileJsonObject.sat = strSat;
			  profileJsonObject.sun = strSun;

			  data.museumProfileJSON = angular.toJson(profileJsonObject);

			//  console.log(data);
			  $scope.ajaxPost(data, "museum/updateMuseum", successCallback, errorCallback);
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
		                var arrMuseums = $scope.Museums; // get the array of museums in the drop down
		                for(i = 0; i < arrMuseums.length; i++) {
		                	var museum = arrMuseums[i];
		                	if(museum.id == id) {
		                		arrMuseums.splice(i,1);
		                		$rootScope.museum = null;
		                	}
		                }
		                $scope.Museums = arrMuseums;
		            }
		            else {
		                // server did not return error, but something
		                // went wrong in the php code
		                errorCallback(response);
		            }
		        }
		        var data = Object();
		        data.id = $rootScope.museum.id;
		        $scope.ajaxPost(data, "museum/deleteMuseum", successCallback, errorCallback);
          };
		  
		  $scope.fetch = function() {
              $scope.message = "Welcome " + $scope.Museum.museumName;
          };
		  
		  $scope.addHours = function() {
			  
		  }; 
		  
		  // keep our $rootScope.museum variable up to date
		  $scope.onMuseumSelectChange = function() {
			  $rootScope.museum = $scope.Museum.myMuseums;	
			  $scope.Museum.myMuseums.museumSundayHoursOpen = new Time($rootScope.museum.museumMondayHoursOpen);
			  $scope.Museum.myMuseums.museumSundayHoursOpen = new Time($rootScope.museum.museumMondayHoursClose);
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
    $scope.formatAMPM = function(date) {
		  var hours = date.getHours();
		  var minutes = date.getMinutes();
		  var ampm = hours >= 12 ? 'PM' : 'AM';
		  hours = hours % 12;
		  hours = hours ? hours : 12; // the hour '0' should be '12'
		  minutes = minutes < 10 ? '0'+minutes : minutes;
		  var strTime = hours + ':' + minutes + ' ' + ampm;
		  return strTime;
		}
      }]);
