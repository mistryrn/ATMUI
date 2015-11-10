'use strict';

angular.module('myApp', ['ngRoute'])
.
config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl:'../views/view1.html',
      controller: 'View1Ctrl'
    })
    .when('/view2', {
      templateUrl: '../views/view2.html',
      controller: 'View2Ctrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
