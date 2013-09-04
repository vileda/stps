'use strict';

angular.module('stpsApp').
  controller('EditCtrl', function ($scope, $location, $routeParams, $timeout, Credential) {
    var credential = Credential.get({credentialId: $routeParams.credentialId}, function() {
      try {
        credential.login = sjcl.decrypt($scope.cryptokey, credential.login);
        credential.passphrase = sjcl.decrypt($scope.cryptokey, credential.passphrase);
        $scope.credential = credential;
        $scope.decrypted = false;
      }
      catch(e) {
        $scope.decrypted = false;
      }
    });
    $scope.save = function() {
      Credential.save($scope.credential, function() {
        $timeout(function() { $location.path('/'); });
      });
    };
    $scope.cancle = function() { $location.path('/'); };
  });
