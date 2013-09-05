'use strict';

angular.module('stpsApp').
  controller('MainCtrl', function ($scope, Credential) {
    $scope.credentials = Credential.query();
    $scope.cryptokey = true;
    $scope.$watch('keyfile', function() {
      if($scope.keyfile) {
        var f = $scope.keyfile[0];
        var reader = new FileReader();
        reader.onload = (function(f, $scope) {
          return function(e) {
            $scope.keyfileData = e.target.result;
            $scope.cryptokey = btoa($scope.keyfileData).trim();
          };
        })(f, $scope);
        reader.readAsBinaryString(f);
      }
      else { $scope.cryptokey = false; }
    });
  });
