var myApp = angular.module('virgil', []).constant('VIRGIL_BASE_URL', 'http://52.24.10.104/Virgil_Backend/index.php/');


app.directive('file', function() {
    return {
        require:"ngModel",
        restrict: 'A',
        link: function($scope, el, attrs, ngModel){
            el.bind('change', function(event){
                var files = event.target.files;
                var file = files[0];

                ngModel.$setViewValue(file);
                $scope.$apply();
            });
        }
    };
});

