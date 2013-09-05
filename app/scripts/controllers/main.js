'use strict';

var invokeUploadFile = function(that) {
  angular.element(that).scope()['MainCtrl'].readFile(that.files[0]);
  angular.element(that).scope().$digest();
};

function readFile(file, cb) {
  var reader = new FileReader();
  reader.onload = function(e) {
    cb(e.target.result);
  };
  reader.readAsBinaryString(file);
}

angular.module('stpsApp').
  controller('MainCtrl', function ($scope, Credential) {
    $scope.credentials = Credential.query();
    $scope.cryptokey = true;
    $scope.$watch('keyfile', function() {
      if($scope.keyfile) {
        var f = $scope.keyfile[0];
        readFile(f, function(data) {
          $('input#cryptokey').val(btoa(data).trim());
          $scope.cryptokey = btoa(data).trim();
          angular.element($('input#cryptokey')[0]).triggerHandler('change');
        });
      }
      else { $scope.cryptokey = ''; }
    });
    $scope.readFile = function(file) {
      console.log(file);
    };
  });
