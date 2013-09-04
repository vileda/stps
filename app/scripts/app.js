'use strict';

angular.module('stpsApp', ['credentialServices'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/add', {
        templateUrl: 'views/detail.html',
        controller: 'AddCtrl'
      })
      .when('/show/:credentialId', {
        templateUrl: 'views/detail.html',
        controller: 'EditCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
