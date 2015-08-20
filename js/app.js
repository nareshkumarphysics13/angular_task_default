var techColorApp = angular.module('technicolor', [
  'ngRoute',
  'tColorControllers'
]);
techColorApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/loginPage', {
        templateUrl: 'template/loginPage.html'
      }).
      when('/error', {
        templateUrl: 'template/error.html'
      }).
    when('/success', {
        templateUrl: 'template/success.html'
      }).
    when('/state/:stateName', {
        templateUrl: 'template/state_info.html'
      }).
    when('/gustBook', {
        templateUrl: 'template/guest_book.html'
      }).
      otherwise({
        redirectTo: '/loginPage'
      });
  }]);