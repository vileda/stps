'use strict';

angular.module('stpsApp').
  controller('AddCtrl', function ($scope, $location, $timeout, Credential) {
    $scope.save = function() {
      var credential = angular.copy($scope.credential);
      credential.login = sjcl.encrypt($scope.cryptokey, credential.login);
      credential.passphrase = sjcl.encrypt($scope.cryptokey, credential.passphrase);
      Credential.save(credential, function() {
        $timeout(function() { $location.path('/'); });
      });
    };
    $scope.cancel = function() { $location.path('/'); };
    $scope.decrypted = true;
    $scope.checkKey = function() {
      if($scope.credential.id) { return false; }
      return $scope.cryptokey !== $scope.cryptokeyRepeat;
    };
  });
