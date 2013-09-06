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

function filesModelDirective(){
  return {
    controller: function($parse, $element, $attrs, $scope){
      var exp = $parse($attrs.filesModel);

      $element.on('change', function(){
        exp.assign($scope, this.files);
        $scope.$apply();
      });
    }
  };
}

angular.module('stpsApp').directive('filesModel', filesModelDirective);
