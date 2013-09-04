'use strict';

angular.module('stpsApp').
  controller('MainCtrl', function ($scope, Credential) {
    $scope.credentials = Credential.query();
  });
