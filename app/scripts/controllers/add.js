'use strict';

angular.module('stpsApp').
  controller('AddCtrl', function ($scope, $location, $timeout, Credential) {
    $scope.save = function() {
      var $cryptokey = $('input#cryptokey');
      var credential = angular.copy($scope.credential);
      credential.login = sjcl.encrypt($cryptokey.val(), credential.login);
      credential.passphrase = sjcl.encrypt($cryptokey.val(), credential.passphrase);
      Credential.save(credential, function() {
        $timeout(function() { $location.path('/'); });
      });
    };
    $scope.cancel = function() { $location.path('/'); };
    $scope.decrypted = true;
    $scope.checkKey = function() {
      if($scope.credential && $scope.credential.id) { return false; }
      return !$scope.keyfile && ($scope.cryptokey !== $scope.cryptokeyRepeat);
    };
  });
