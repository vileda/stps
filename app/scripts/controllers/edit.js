'use strict';

function fetchAndDrecrypt($scope, $routeParams, Credential) {
  var credential = Credential.get({credentialId: $routeParams.credentialId}, function() {
    try {
      credential.login = sjcl.decrypt($scope.cryptokey, credential.login);
      credential.passphrase = sjcl.decrypt($scope.cryptokey, credential.passphrase);
      $scope.credential = credential;
      $scope.decrypted = true;
    }
    catch(e) {
      $scope.decrypted = false;
      credential.login = '';
      credential.passphrase = '';
      $scope.credential = credential;
    }
  });
}

angular.module('stpsApp').
  controller('EditCtrl', function ($scope, $location, $routeParams, $timeout, Credential) {
    fetchAndDrecrypt($scope, $routeParams, Credential);
    $scope.save = function() {
      Credential.save($scope.credential, function() {
        $timeout(function() { $location.path('/'); });
      });
    };

    $scope.cancel = function() { $location.path('/'); };
    $scope.$watch('cryptokey', function() { fetchAndDrecrypt($scope, $routeParams, Credential); });
  });
