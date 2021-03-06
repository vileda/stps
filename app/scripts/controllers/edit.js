'use strict';

ZeroClipboard.setDefaults( {
  moviePath: '/bower_components/zeroclipboard/ZeroClipboard.swf',
  trustedOrigins: [window.location.protocol + "//" + window.location.host]
} );


function fetchAndDrecrypt($scope, $routeParams, Credential) {
  var $cryptokey = $('input#cryptokey');
  var credential = Credential.get({credentialId: $routeParams.credentialId}, function() {
    try {
      credential.login = sjcl.decrypt($cryptokey.val(), credential.login);
      credential.passphrase = sjcl.decrypt($cryptokey.val(), credential.passphrase);
      $scope.credential = credential;
      $scope.decrypted = true;
      $scope.basicAuthLocation = $scope.credential.location.replace(/(https?:\/\/)(.*)/,'$1'+$scope.credential.login + ':' + $scope.credential.passphrase + '@$2');
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
      var credential = angular.copy($scope.credential);
      var $cryptokey = $('input#cryptokey');
      credential.login = sjcl.encrypt($cryptokey.val(), credential.login);
      credential.passphrase = sjcl.encrypt($cryptokey.val(), credential.passphrase);
      Credential.save(credential, function() {
        $timeout(function() { $location.path('/'); });
      });
    };
    $scope.cancel = function() { $location.path('/'); };
    $scope.$watch('cryptokey', function() { fetchAndDrecrypt($scope, $routeParams, Credential); });
    $scope.clip_login = new ZeroClipboard($('#clip_copy_login'));
    $scope.clip_passphrase = new ZeroClipboard($('#clip_copy_passphrase'));
  });
