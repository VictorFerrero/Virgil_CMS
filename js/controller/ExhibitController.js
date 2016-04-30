myApp.controller('ExhibitController', ['$scope',
      function($scope) {
          
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
      }]);
