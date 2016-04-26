var myApp = angular.module('virgil', [ngRoute]);


//setting up routes for virgil main page
myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/museum', {
        controller: 'MuseumController'
    }).
      when('/gallery', {
        controller: 'GalleryController'
    }).
      when('/exhibit', {
        controller: 'ExhibitController'
    }).
      when('/content', {
        controller: 'ContentController'
    }).
      when('/event', {
        controller: 'EventController'
    }).
      when('/beacon', {
        controller: 'BeaconController'
    }).
      otherwise({
        redirectTo: '/museum'
    });
}]);
