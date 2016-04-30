myApp.controller('GalleryController', ['$scope',
      function($scope) {
          
		  $scope.Galleries = [
				  {
				   id:-1,
				   galleryTitle:"",
				   galleryDescription: "",
				  
				  },
				  {
				   id:1,
				   galleryTitle:"Yonce",
				   galleryDescription: "Boss Bitch",
				  },
      		 	  {
				   id:2, 	  
				   galleryTitle:"Cretaceous Period",
				   galleryDescription: "I think the T-Rex is actually from this period",
				  },
      		 	  {
					id:3,  
				   galleryTitle:"Malcolm X",
				   galleryDescription: "By any means necessary.",
				  }
    		  ]; 
		 
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
		  
		  $scope.onSelectChange = function() {
					  
			  if ($scope.Gallery.selectedGallery.id >= 0) {
			  	$scope.add_update = "Update Gallery"
			  	$scope.addButton = false;
			  	
			  
			  } else {
				  
				$scope.add_update = "Add Gallery"
			  	$scope.addButton = true;
			  	  
			  }
			  
		  };
		  
		  $scope.initializeGallery = function() {
			  
			  //sets the submit button as add museum
			  $scope.add_update = "Add Gallery";			  
			  $scope.addButton = true; 
			  
		  }
		  
		  $scope.resetGallery = function() {
			  
			$scope.add_update = "Add Gallery"
			$scope.addButton = true;
			  //resets all of the values in the form
			  $scope.Gallery.selectedGallery.galleryTitle = "";
			  $scope.Gallery.selectedGallery.galleryDescription = "";
		  }

      }]);
