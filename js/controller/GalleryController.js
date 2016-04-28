myApp.controller('GalleryController', ['$scope',
      function($scope) {
          
          $scope.add = function() {
              $scope.message = "Welcome " + $scope.Gallery.galleryTitle;
          };
		  
		  $scope.delete = function() {
              $scope.message = "Welcome " + $scope.Gallery.galleryTitle;
          };
		  
		  $scope.update = function() {
              $scope.message = "Welcome " + $scope.Gallery.galleryTitle;
          };
		  
		  $scope.fetch = function() {
              $scope.message = "Welcome " + $scope.Gallery.galleryTitle;
          };

      }]);
